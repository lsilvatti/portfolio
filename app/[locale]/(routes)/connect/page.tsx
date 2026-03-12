import { Card } from "@/components/atoms/Card/Card";
import { ConnectCard } from "@/components/organisms/ConnectCard/ConnectCard";
import { CenteredLayout } from "@/components/templates";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ConnectPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("pages.connect");

    return (
        <CenteredLayout>
            <ConnectCard />
        </CenteredLayout>
    );
}
