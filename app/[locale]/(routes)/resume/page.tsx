import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.resume");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/resume`,
      languages: {
        en: "/en/resume",
        "pt-BR": "/br/resume",
      },
    },
  };
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.resume");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {t("description")}
      </p>
    </div>
  );
}
