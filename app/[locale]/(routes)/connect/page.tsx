import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { HorizontallyCenteredLayout } from "@/components/templates";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Typography } from "@/components/atoms/Typography/Typography";

const ConnectView = dynamic(
  () => import('@/components/organisms/ConnectView').then((module) => module.ConnectView),
  {
    loading: () => <div className="h-80 w-full max-w-xl animate-pulse rounded-xl bg-muted/30" />,
  }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.connect");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/connect`,
      languages: {
        "en": "/en/connect",
        "pt-BR": "/br/connect",
        "x-default": "/en/connect"
      },
    }
  };
}

export default async function ConnectPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("pages.connect");

    return (
        <HorizontallyCenteredLayout>
                  <Typography variant='h1' as="h2" className="mt-0 mb-0 animate-fade-up">
                    {t('title')}
                  </Typography>
                  <Typography variant="body" className='max-w-2xl text-center mt-0 mb-16 animate-fade-up' style={{ animationDelay: '0.1s' }}>
                    {t('description')}
                  </Typography>
            <ConnectView className="animate-fade-up" style={{ animationDelay: '0.2s' }} />
        </HorizontallyCenteredLayout>
    );
}
