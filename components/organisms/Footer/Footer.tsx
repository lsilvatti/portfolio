import { Typography } from "@/components/atoms";
import { useTranslations } from "next-intl";

export const Footer = () => {
    const t = useTranslations("layout.footer");

    return (
        <footer className="fixed bottom-4 w-full text-center text-sm text-gray-50">
            <div>
                <Typography variant="caption" className="text-muted pl-4 pr-4">
                    {t("copyright", { year: new Date().getFullYear() })}
                </Typography>
            </div>
        </footer>
    );
}