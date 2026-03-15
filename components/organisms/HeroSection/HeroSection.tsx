import { Typography, NameLogo, Divider } from "@/components/atoms"
import { TypewriterText } from "@/components/molecules";
import { NavMenu } from "@/components/molecules/NavMenu/NavMenu";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
    const t = useTranslations("pages.home.hero");

    return (
        <>
            <NameLogo className={"h-7 md:h-14 animate-fade-down"} style={{ animationDelay: '0.1s' }} />

            <TypewriterText 
                prefix={t("typewriter.prefix")}
                words={t.raw("typewriter.words") as string[]}
                className="font-mono text-center"
                variant="body"
            />
 
            <Divider 
                animated
                color="primary"
                size="thin"
                className="w-[80%] md:w-full md:max-w-xl mt-4"
                style={{ animationDelay: '0.4s' }} 
            />

            <NavMenu 
                items={t.raw("navMenuItems") as { label: string; href: string }[]}
                baseDelay={0.7}
            />

        </>
    )
}