import { Typography, NameLogo, Divider } from "@/components/atoms"
import { TypewriterText } from "@/components/molecules";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
    const t = useTranslations("heroSection");

    return (
        <>
            <NameLogo className={"h-6 md:h-14 opacity-0 animate-fade-down"} style={{ animationDelay: '0.1s' }} />

            <Typography
                variant="h4"
                className="text-muted-foreground opacity-0 text-center animate-fade-down mb-4"
                style={{ animationDelay: '0.2s' }}
            >
                {t("description")}
            </Typography>

            <TypewriterText 
                prefix={t("typewriter.prefix")}
                words={t.raw("typewriter.words") as string[]}
                className="font-mono text-center"
                variant="h4"
                style={{ animationDelay: '0.3s' }}
            />
 
            <Divider 
                animated
                color="primary"
                size="thin"
                className="w-[80%] md:w-full md:max-w-xl mb-4"
                style={{ animationDelay: '0.4s' }} 
            />
        </>
    )
}