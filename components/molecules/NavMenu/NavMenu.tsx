'use client';

import { ExternalLink } from 'lucide-react';
import { Link } from '@/components/atoms';
import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavMenuProps {
  items: NavItem[];
  baseDelay?: number;
  incrementDelay?: number;
  className?: string;
}

export function NavMenu({ 
  items, 
  baseDelay = 0.5,
  incrementDelay = 0.1,
  className 
}: NavMenuProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10", className)}>
      {items.map((item, index) => {
        const currentDelay = baseDelay + (index * incrementDelay);
        const isActive = !item.external && pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            variant="nav"
            data-active={isActive}
            external={item.external}
            className="inline-flex items-center gap-1 animate-fade-down md:animate-fade-right"
            style={{ animationDelay: `${currentDelay}s` }}
          >
            {item.label}
            {item.external && <ExternalLink size={14} className="shrink-0 opacity-70" />}
          </Link>
        );
      })}
    </nav>
  );
}