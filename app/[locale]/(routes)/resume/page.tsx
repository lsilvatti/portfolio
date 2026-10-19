import dynamic from 'next/dynamic';
import { GoToTop, Typography } from "@/components/atoms";
import { HorizontallyCenteredLayout } from "@/components/templates";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

const ResumeCard = dynamic(
  () => import('@/components/organisms').then((module) => module.ResumeCard),
  {
    loading: () => <div className="h-64 w-full max-w-3xl animate-pulse rounded-xl bg-muted/30" />,
  }
);

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
      <HorizontallyCenteredLayout>
        <Typography variant='h1' as="h2" className="mt-0 mb-0 animate-fade-up">
          {t('title')}
        </Typography>
        <Typography variant="body" className='max-w-2xl text-center mt-0 mb-0 animate-fade-up' style={{ animationDelay: '0.1s' }}>
          {t('description')}
        </Typography>
        <ResumeCard className="animate-fade-up mt-16" style={{ animationDelay: '0.2s' }} />
      </HorizontallyCenteredLayout>
      <GoToTop />
    </>

  );
}
