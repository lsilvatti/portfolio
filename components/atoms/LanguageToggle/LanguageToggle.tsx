"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en" as Locale, label: "EN", ariaLabel: "Switch to English" },
  { code: "pt-BR" as Locale, label: "PT", ariaLabel: "Mudar para Português" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  const activeIndex = locales.findIndex((l) => l.code === locale);

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-lg bg-surface p-0.5",
        className
      )}
      role="radiogroup"
      aria-label="Language"
    >
      {/* Sliding pill indicator */}
      <span
        aria-hidden
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md bg-primary-light transition-transform duration-250 ease-in-out"
        style={{
          transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 2}px))`,
        }}
      />

      {locales.map(({ code, label, ariaLabel }) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={locale === code}
          onClick={() => switchLocale(code)}
          className={cn(
            "relative z-10 px-2.5 py-1 text-xs font-medium cursor-pointer",
            "rounded-md transition-colors duration-200",
            locale === code
              ? "text-primary"
              : "text-muted hover:text-foreground"
          )}
          aria-label={ariaLabel}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
