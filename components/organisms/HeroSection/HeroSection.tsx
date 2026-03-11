import { Typography, NameLogo, Divider } from "@/components/atoms"
import { useTranslations } from "next-intl";

export const HeroSection = () => {
    const t = useTranslations("heroSection");

    return (
        <>
            <NameLogo className={"h-6 md:h-14 opacity-0 animate-fade-down"} style={{ animationDelay: '0.2s' }} />

            <Typography
                variant="h4"
                className="text-muted-foreground opacity-0 text-center animate-fade-down mb-2"
                style={{ animationDelay: '0.4s' }}
            >
                {t("description")}
            </Typography>

            <Divider 
                animated
                color="primary"
                size="thin"
                className="w-[80%] md:w-full md:max-w-xl mb-4"
                style={{ animationDelay: '1.0s' }} 
            />
        </>
    )
}