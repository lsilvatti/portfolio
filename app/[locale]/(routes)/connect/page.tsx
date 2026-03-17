import type { Metadata } from "next";
import { ConnectView } from "@/components/organisms/ConnectView";
import { CenteredLayout } from "@/components/templates";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Typography } from "@/components/atoms/Typography/Typography";

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
        <CenteredLayout className="mt-8 mb-0 md:-mt-8">
                  <Typography variant='h1' as="h2" className="mt-0 mb-0 animate-fade-up">
                    {t('title')}
                  </Typography>
                  <Typography variant="body" className='max-w-2xl text-center mt-0 mb-0 animate-fade-up' style={{ animationDelay: '0.1s' }}>
                    {t('description')}
                  </Typography>
            <ConnectView className="animate-fade-up" style={{ animationDelay: '0.2s' }} />
        </CenteredLayout>
    );
}
