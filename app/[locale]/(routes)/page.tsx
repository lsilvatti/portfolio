import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/organisms";
import { CenteredLayout } from "@/components/templates";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en": "/en",
        "pt-BR": "/br",
        "x-default": "/en"
      },
    }
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <CenteredLayout>
            <HeroSection />
        </CenteredLayout>
    );
}