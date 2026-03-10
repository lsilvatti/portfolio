"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={cn(
          "text-xs font-medium transition-colors cursor-pointer",
          locale === "en" ? "text-primary" : "text-muted hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted text-xs select-none">/</span>
      <button
        type="button"
        onClick={() => switchLocale("pt-BR")}
        className={cn(
          "text-xs font-medium transition-colors cursor-pointer",
          locale === "pt-BR" ? "text-primary" : "text-muted hover:text-foreground"
        )}
        aria-label="Mudar para Português"
      >
        PT
      </button>
    </div>
  );
}
