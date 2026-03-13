"use server";

import { LINK_EMAIL } from "@/constants/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
}

export async function sendEmailAction(data: ContactFormData): Promise<SendEmailResponse> {
  const { firstName, lastName, email, phoneCountryCode, phone, message } = data;

  if (!firstName || typeof firstName !== "string") return { error: "Nome inválido." };
  if (!email || typeof email !== "string") return { error: "E-mail inválido." };
  if (!message || typeof message !== "string") return { error: "Mensagem inválida." };

  const fullName = lastName ? `${firstName} ${lastName}`.trim() : firstName.trim();
  const fullPhone = phone ? `${phoneCountryCode} ${phone}`.trim() : "Não informado";

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: LINK_EMAIL,
      subject: `Nova mensagem pelo portfólio. De ${fullName}`,
      replyTo: email,
      text: `Nome: ${fullName}\nE-mail: ${email}\nTelefone: ${fullPhone}\n\nMensagem:\n${message}`,
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