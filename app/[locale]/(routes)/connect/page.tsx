import type { Metadata } from "next";
import { ConnectView } from "@/components/organisms/ConnectView";
import { CenteredLayout } from "@/components/templates";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
  };
}

export default async function ConnectPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("pages.connect");

    return (
        <CenteredLayout>
            <ConnectView />
        </CenteredLayout>
    );
}
