'use client';

import { LanguageToggle, ThemeToggle } from "@/components/atoms";
import { NavMenu, MobileNavMenu } from "@/components/molecules";
import { usePathname } from "@/i18n/navigation"; 
import { useTranslations } from "next-intl";

export const Header = () => {
    const pathname = usePathname();
    const t = useTranslations("layout.header");

    const isHomePage = pathname === '/';
    const navItems = t.raw("navMenuItems") as { label: string; href: string }[];

    if (isHomePage) {
       
        return (
            <header className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </header>
        );
    }

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4">
            
            <div className="flex-1">
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

            <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>
            
        </header>
    );
}