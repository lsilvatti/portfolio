import { UnderConstructionBanner } from "@/components/organisms";
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
  const t = await getTranslations("pages.projects");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        "en": "/en/projects",
        "pt-BR": "/br/projects",
        "x-default": "/en/projects"
      },
    }
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projects");

  return (
    <CenteredLayout>
      <UnderConstructionBanner />
    </CenteredLayout>
  );
}
