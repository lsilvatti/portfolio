import { Typography } from "@/components/atoms";
import { useTranslations } from "next-intl";

export const Footer = () => {
    const t = useTranslations("footer");

    return (
        <footer className="fixed bottom-4 w-full text-center text-sm text-gray-50">
            <Typography variant="body" className="text-muted">
                {t("copyright", { year: new Date().getFullYear() })}
            </Typography>
        </footer>
    );
}