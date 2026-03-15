"use server";

import { headers } from "next/headers";
import { LINK_EMAIL } from "@/constants/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Rate limiter (in-memory, suitable for single-instance portfolio deployment)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max submissions per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

// ---------------------------------------------------------------------------
// Sanitization helpers
// ---------------------------------------------------------------------------

/** Strip control characters that could cause email header injection. */
function sanitizeField(value: string): string {
  return value.replace(/[\x00-\x1F\x7F]/g, " ").trim();
}

/** Like sanitizeField but preserves newlines for message bodies. */
function sanitizeMessage(value: string): string {
  return value.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, " ").trim();
}

// ---------------------------------------------------------------------------
// Field length constants
// ---------------------------------------------------------------------------
const NAME_MAX     = 50;
const EMAIL_MAX    = 254; // RFC 5321
const PHONE_MAX    = 20;
const MESSAGE_MIN  = 10;
const MESSAGE_MAX  = 500;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SendEmailResponse = {
  success?: boolean;
  error?: string;
};

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  message: string;
  /** Honeypot — must be empty; bots fill it, real users don't. */
  _honeypot?: string;
}

// ---------------------------------------------------------------------------
// Action
// ---------------------------------------------------------------------------
export async function sendEmailAction(data: ContactFormData): Promise<SendEmailResponse> {
  // 1. Honeypot — silent rejection so bots don't know they were caught
  if (data._honeypot) return { success: true };

  // 2. Rate limiting
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return { error: "Muitas tentativas. Tente novamente em breve." };
  }

  // 3. Type guards
  if (!data || typeof data !== "object") return { error: "Dados inválidos." };

  const { firstName, lastName, email, phoneCountryCode, phone, message } = data;

  if (!firstName || typeof firstName !== "string") return { error: "Nome inválido." };
  if (typeof lastName !== "string")               return { error: "Dados inválidos." };
  if (!email    || typeof email    !== "string") return { error: "E-mail inválido." };
  if (!message  || typeof message  !== "string") return { error: "Mensagem inválida." };

  // 4. Length limits
  if (firstName.length > NAME_MAX)    return { error: "Nome muito longo." };
  if (lastName.length  > NAME_MAX)    return { error: "Sobrenome muito longo." };
  if (email.length     > EMAIL_MAX)   return { error: "E-mail inválido." };
  if (phone && phone.length > PHONE_MAX) return { error: "Telefone inválido." };
  if (message.length < MESSAGE_MIN)   return { error: "Mensagem muito curta." };
  if (message.length > MESSAGE_MAX)   return { error: "Mensagem muito longa." };

  // 5. Pattern validation
  if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(firstName.trim()))
    return { error: "Nome contém caracteres inválidos." };
  if (lastName.trim() && !/^[a-zA-ZÀ-ÿ\s\-']+$/.test(lastName.trim()))
    return { error: "Sobrenome contém caracteres inválidos." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    return { error: "E-mail inválido." };

  // 6. Sanitize before use
  const safeFirstName   = sanitizeField(firstName);
  const safeLastName    = sanitizeField(lastName);
  const safeEmail       = sanitizeField(email);
  const safePhone       = phone ? sanitizeField(phone) : "";
  const safeCountryCode = phoneCountryCode ? sanitizeField(phoneCountryCode) : "";
  const safeMessage     = sanitizeMessage(message);

  const fullName  = safeLastName ? `${safeFirstName} ${safeLastName}`.trim() : safeFirstName;
  const fullPhone = safePhone ? `${safeCountryCode} ${safePhone}`.trim() : "Não informado";

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: LINK_EMAIL,
      subject: `Nova mensagem pelo portfólio. De ${fullName}`,
      replyTo: safeEmail,
      text: `Nome: ${fullName}\nE-mail: ${safeEmail}\nTelefone: ${fullPhone}\n\nMensagem:\n${safeMessage}`,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return { error: "Falha ao enviar o e-mail pelo provedor." };
    }

    return { success: true };
  } catch (err) {
    console.error("[Server Action Error]:", err);
    return { error: "Ocorreu um erro inesperado no servidor." };
  }
}