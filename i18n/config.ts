export const locales = ["en", "br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
