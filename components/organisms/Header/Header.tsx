import { LanguageToggle, ThemeToggle } from "@/components/atoms";

export const Header = () => {
    return (
            <header className="fixed top-4 right-4 z-50 flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </header>
    );
}