import { useTranslations } from "next-intl";

export default function Connect() {
  const t = useTranslations("connect");

  return (
    <>
      <p>{t("title")}</p>
    </>
  );
}
