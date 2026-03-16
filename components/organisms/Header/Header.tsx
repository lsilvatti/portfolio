'use client';

import { cn } from "@/lib/utils";
import { LanguageToggle, ThemeToggle } from "@/components/atoms";
import { NavMenu, MobileNavMenu } from "@/components/molecules";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const Header = () => {
    const pathname = usePathname();
    const t = useTranslations("layout.header");

    const isHomePage = pathname === '/';
    const navItems = t.raw("navMenuItems") as { label: string; href: string }[];

    return (
        <header
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50",
                "w-[calc(100%-2rem)] overflow-hidden",
                "rounded-2xl border border-border bg-background/40 backdrop-blur-md shadow-lg",
                "transition-[max-width] duration-500 ease-in-out",
                isHomePage ? "max-w-38" : "max-w-4xl",
            )}
        >
            <div className="flex items-center justify-between px-3 py-2.5">
                <div
                    className={cn(
                        "overflow-hidden transition-opacity ease-in-out",
                        isHomePage
                            ? "w-0 opacity-0 pointer-events-none duration-150"
                            : "flex-1 min-w-0 pr-4 opacity-100 duration-300 delay-250 px-4",
                    )}
                >
                    <NavMenu
                        items={navItems}
                        baseDelay={0.1}
                        incrementDelay={0.1}
                        className="hidden md:flex justify-start gap-4 md:gap-6"
                    />
                    <MobileNavMenu
                        items={navItems}
                        className="md:hidden"
                    />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}