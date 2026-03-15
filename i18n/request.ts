import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

function deepMerge(target: any, source: any) {
  const output = { ...target };
  if (typeof target === "object" && typeof source === "object") {
    Object.keys(source).forEach((key) => {
      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const contexts = ["common", "layout", "pages", "components"] as const;
  const modules = await Promise.all(
    contexts.map((ctx) => import(`../messages/${locale}/${ctx}.json`))
  );

  const messages = modules.reduce((acc, m) => deepMerge(acc, m.default), {});

  return {
    locale,
    messages,
  };
});