import { GoToTop } from "@/components/atoms";
import { ResumeCard } from "@/components/organisms";
import { CenteredLayout } from "@/components/templates";
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
        "x-default": "/en/resume",
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
    <>
      <CenteredLayout>
        <ResumeCard params={params} />
      </CenteredLayout>
      <GoToTop />
    </>

  );
}
