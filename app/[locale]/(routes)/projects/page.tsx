import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {t("description")}
      </p>
    </div>
  );
}
