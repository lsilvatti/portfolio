import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("pages.notFound");

  return (
    <div className="flex h-screen w-full items-center justify-center gap-4 bg-background">
      <h1 className="text-6xl font-bold">{t("title")}</h1>
      <p className="text-lg text-muted-foreground">{t("description")}</p>
    </div>
  );
}
