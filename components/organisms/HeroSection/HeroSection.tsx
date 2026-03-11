import { Typography, NameLogo, Divider } from "@/components/atoms"
import { TypewriterText } from "@/components/molecules";
import { NavMenu } from "@/components/molecules/NavMenu/NavMenu";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
    const t = useTranslations("pages.home.hero");

    return (
        <>
            <NameLogo className={"h-6 md:h-14 opacity-0 animate-fade-down"} style={{ animationDelay: '0.1s' }} />

            <TypewriterText 
                prefix={t("typewriter.prefix")}
                words={t.raw("typewriter.words") as string[]}
                className="font-mono text-center mt-4"
                variant="h4"
                style={{ animationDelay: '0.3s' }}
            />
 
            <Divider 
                animated
                color="primary"
                size="thin"
                className="w-[80%] md:w-full md:max-w-xl mt-1"
                style={{ animationDelay: '0.4s' }} 
            />

            <NavMenu 
                items={t.raw("navMenuItems") as { label: string; href: string }[]}
                baseDelay={0.7}
            />

        </>
    )
}