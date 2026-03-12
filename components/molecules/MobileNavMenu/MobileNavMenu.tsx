'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, Icon } from '@/components/atoms';
import { MenuIcon, XIcon } from '@/components/atoms/Icon/icons';
import { cn } from '@/lib/utils';
import type { NavItem } from '../NavMenu/NavMenu';

interface MobileNavMenuProps {
  items: NavItem[];
  className?: string;
}

export const MobileNavMenu = ({ items, className }: MobileNavMenuProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => { setMounted(true); }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, close]);

  const dropdown = (
    <div
      ref={dropdownRef}
      className={cn(
        'fixed z-40 top-20 left-1/2 -translate-x-1/2',
        'w-[calc(100%-3rem)] max-w-md',
        'rounded-2xl border border-border bg-background/80 backdrop-blur-md shadow-xl',
        'origin-top transition-all duration-200 ease-out',
        open
          ? 'scale-100 opacity-100 pointer-events-auto'
          : 'scale-95 opacity-0 pointer-events-none',
      )}
      aria-label="Navigation"
    >
      <nav className="flex flex-col py-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={close}
            className={cn(
              'px-4 py-2.5 text-base font-medium capitalize',
              'text-muted-foreground hover:text-primary hover:bg-surface-hover',
              'transition-colors duration-150',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div ref={menuRef} className={cn('relative flex', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className={cn(
          'relative h-9 w-9 cursor-pointer rounded-lg',
          'text-muted hover:text-foreground',
          'transition-colors duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        )}
      >
        <Icon
          icon={MenuIcon}
          size="sm"
          className={cn(
            'absolute inset-0 m-auto transition-all duration-300',
            open
              ? 'scale-0 rotate-90 opacity-0'
              : 'scale-100 rotate-0 opacity-100',
          )}
        />
        <Icon
          icon={XIcon}
          size="sm"
          className={cn(
            'absolute inset-0 m-auto transition-all duration-300',
            open
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-0 -rotate-90 opacity-0',
          )}
        />
      </button>

      {mounted && createPortal(dropdown, document.body)}
    </div>
  );
};
