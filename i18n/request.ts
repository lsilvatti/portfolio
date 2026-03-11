import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const contexts = ["common", "layout", "pages", "components"] as const;
  const modules = await Promise.all(
    contexts.map((ctx) => import(`../messages/${locale}/${ctx}.json`))
  );
  const messages = Object.assign({}, ...modules.map((m) => m.default));

  return {
    locale,
    messages,
  };
});
