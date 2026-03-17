import { getTranslations } from "next-intl/server";
import { Avatar, Divider, Typography } from "@/components/atoms";
import { GoBackButton } from "@/components/molecules";
import { CenteredLayout } from "@/components/templates/CenteredLayout/CenteredLayout";

export default async function NotFound() {
  const t = await getTranslations("pages.notFound");

  return (
    <CenteredLayout>
      <Avatar  loading="eager" alt="cat photo" size="lg" src="/zelda.png" />

      <Typography className="text-6xl font-bold">{t("title")}</Typography>

      <Typography className="text-lg text-muted-foreground">{t("description")}</Typography>

      <Divider color="border" className="max-w-70" />

      <Typography variant="body" className="text-muted-foreground text-center max-w-70  sm:max-w-xl" >{t("catchphrase")}</Typography>
      <GoBackButton />
    </CenteredLayout>
  );
}