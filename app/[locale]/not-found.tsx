import { getTranslations } from "next-intl/server";
import { Divider } from "@/components/atoms";
import { GoBackButton } from "@/components/molecules";

export default async function NotFound() {
  const t = await getTranslations("pages.notFound");

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-6">
        <h1 className="text-6xl font-bold">{t("title")}</h1>
        <Divider orientation="vertical" color="border" className="h-16" />
        <p className="text-lg text-muted-foreground">{t("description")}</p>
      </div>
      <GoBackButton />
    </div>
  );
}
