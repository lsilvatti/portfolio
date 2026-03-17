import { GoToTop, Typography } from "@/components/atoms";
import { ResumeCard } from "@/components/organisms";
import { HorizontallyCenteredLayout } from "@/components/templates";
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
      <HorizontallyCenteredLayout className="mt-8 mb-8">
        <Typography variant='h1' as="h2" className="mt-0 mb-0">
          {t('title')}
        </Typography>
        <Typography variant="body" className='max-w-2xl text-center mt-0 mb-0'>
          {t('description')}
        </Typography>
        <ResumeCard />
      </HorizontallyCenteredLayout>
      <GoToTop />
    </>

  );
}
