import type { Metadata } from "next";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEn
        ? "Leonardo Silvatti Silva | Frontend Engineer"
        : "Leonardo Silvatti Silva | Engenheiro Frontend",
      template: "%s | Leonardo Silvatti Silva",
    },
    description: isEn
      ? "Frontend Engineer specializing in React, Next.js, and TypeScript. Passionate about crafting performant and accessible web applications with a focus on clean code and best practices."
      : "Engenheiro Frontend especializado em React, Next.js e TypeScript. Apaixonado por criar aplicações web performáticas e acessíveis com foco em código limpo e boas práticas.",
    keywords: isEn
      ? [
          "Frontend Engineer",
          "React",
          "Next.js",
          "TypeScript",
          "Portfolio",
          "Web Development",
          "JavaScript",
          "UI/UX",
        ]
      : [
          "Engenheiro Frontend",
          "React",
          "Next.js",
          "TypeScript",
          "Portfólio",
          "Desenvolvimento Web",
          "JavaScript",
        ],
    authors: [{ name: "Leonardo Silvatti Silva" }],
    creator: "Leonardo Silvatti Silva",
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "pt_BR",
      alternateLocale: isEn ? "pt_BR" : "en_US",
      url: siteUrl,
      siteName: "Leonardo Silvatti Silva",
      title: isEn
        ? "Leonardo Silvatti Silva | Frontend Engineer"
        : "Leonardo Silvatti Silva | Engenheiro Frontend",
      description: isEn
        ? "Frontend Engineer specializing in React, Next.js, and TypeScript. Passionate about crafting performant and accessible web applications."
        : "Engenheiro Frontend especializado em React, Next.js e TypeScript. Apaixonado por criar aplicações web performáticas e acessíveis.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isEn
            ? "Leonardo Silvatti Silva – Frontend Engineer"
            : "Leonardo Silvatti Silva – Engenheiro Frontend",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Leonardo Silvatti Silva | Frontend Engineer"
        : "Leonardo Silvatti Silva | Engenheiro Frontend",
      description: isEn
        ? "Frontend Engineer specializing in React, Next.js, and TypeScript. Passionate about crafting performant and accessible web applications."
        : "Engenheiro Frontend especializado em React, Next.js e TypeScript. Apaixonado por criar aplicações web performáticas e acessíveis.",
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

const localeLangMap: Record<string, string> = {
  en: "en",
  br: "pt-BR",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const allMessages = await getMessages();
  const { pages: _pages, ...clientMessages } = allMessages as Record<string, unknown>;

return (
    <html lang={localeLangMap[locale] ?? locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${nunitoSans.variable} text-foreground antialiased min-h-dvh scroll-smooth`}
      >
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <ThemeProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}