import { Link } from '@/components/atoms';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
}

interface NavMenuProps {
  items: NavItem[];
  baseDelay?: number;
  incrementDelay?: number;
  className?: string;
}

export const NavMenu = ({ 
  items, 
  baseDelay = 0.5,
  incrementDelay = 0.1,
  className 
}: NavMenuProps) => {
  return (
    <nav className={cn("flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10", className)}>
      {items.map((item, index) => {
        const currentDelay = baseDelay + (index * incrementDelay);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "text-lg font-medium text-muted-foreground capitalize",
              "animate-fade-down md:animate-fade-right",
              "transition-all duration-300 ease-in-out",
              "hover:text-primary hover:drop-shadow-[0_0_6px_var(--color-primary)]",
              "active:scale-95"
            )}
            style={{ animationDelay: `${currentDelay}s` }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};