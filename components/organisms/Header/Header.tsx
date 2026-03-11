'use client';

import { LanguageToggle, ThemeToggle } from "@/components/atoms";
import { NavMenu } from "@/components/molecules";
import { usePathname } from "next/navigation"; 
import { useTranslations } from "next-intl";

export const Header = () => {
    const pathname = usePathname();
    const t = useTranslations("header");

    const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/pt-BR';

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-background/70 backdrop-blur-md">
            
            <div className="flex-1">
                {!isHomePage && (
                    <NavMenu 
                        items={t.raw("navMenuItems") as { label: string; href: string }[]} 
                        baseDelay={0.1}
                        incrementDelay={0.1}
                        className="justify-start gap-4 md:gap-6"
                    />
                )}
            </div>

            <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>
            
        </header>
    );
}