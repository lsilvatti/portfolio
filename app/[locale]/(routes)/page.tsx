import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/organisms";
import { CenteredLayout } from "@/components/templates";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <CenteredLayout>
            <HeroSection />
        </CenteredLayout>
    );
}