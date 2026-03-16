import { useTranslations } from "next-intl";
import { Typography } from "@/components/atoms";
import { Link } from "@/components/atoms/Link/Link";
import { Button } from "@/components/atoms/Button/Button";
import { GoBackButton } from "@/components/molecules";

export function UnderConstructionBanner() {
  const t = useTranslations("pages.home.underConstruction");

  return (
    <div className="flex flex-col items-center gap-6 text-center max-w-lg px-4">
      <Typography variant="h1" as="h1">
        {t("title")}
      </Typography>

      <Typography variant="body" className="text-muted">
        {t.rich("description", {
          link: (chunks) => (
            <Link variant="primary" href="/connect">
              {chunks}
            </Link>
          ),
        })}
      </Typography>

      <GoBackButton />
    </div>
  );
}