import type { Metadata } from "next";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { routing } from "@/i18n/routing";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leonardo Silvatti Silva - Portfolio",
  description: "Frontend Engineer specializing in React, Next.js, and TypeScript. Passionate about crafting performant and accessible web applications with a focus on clean code and best practices.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

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
  // Exclude `pages` namespace — only consumed by server components
  const { pages: _pages, ...clientMessages } = allMessages as Record<string, unknown>;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})()`,
          }}
        />
      </head>
      {/* Aqui aplicamos as variáveis das fontes e as cores globais de bg e text */}
      <body
        className={`${spaceGrotesk.variable} ${nunitoSans.variable} bg-background text-foreground antialiased min-h-dvh scroll-smooth`}
      >
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}