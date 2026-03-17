'use client';

import { useState, useRef, useEffect } from 'react';
import { Chip, Button, Typography } from '@/components/atoms'; 
import { useTranslations } from 'next-intl';

interface ChipDropdownProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
  label?: string;
  className?: string;
  style: React.CSSProperties
}

export function ChipDropdown({ 
  options, 
  selectedOptions, 
  onToggle, 
  onClear, 
  label = "Tecnologias",
  className = "",
  style
}: ChipDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('components.chipDropdown');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (options.length === 0) return null;

  return (
    <div className={`relative w-full sm:w-62.5 ${className}`} style={style} ref={dropdownRef}>
      
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        className="w-full h-10 px-3 py-2 rounded-lg bg-surface border border-border text-foreground hover:bg-surface-hover transition-colors flex items-center justify-between gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shadow-sm"
      >
        
        <div className="flex items-center flex-1 min-w-0 pr-2">
          {selectedOptions.length === 0 ? (
            <Typography variant="body" className="text-sm font-medium whitespace-nowrap px-1">
              {label}
            </Typography>
          ) : (
            <div className="flex items-center gap-1.5 w-full overflow-hidden mask-[linear-gradient(to_right,black_70%,transparent_100%)]">
              {selectedOptions.map((opt) => (
                <span 
                  key={opt} 
                  className="shrink-0 whitespace-nowrap px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary text-primary-foreground shadow-sm"
                >
                  {opt}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 pl-1">
          {selectedOptions.length > 0 && (
            <span className="flex items-center justify-center bg-primary-light text-primary font-bold text-[10px] h-5 min-w-5 px-1 rounded-full">
              {selectedOptions.length}
            </span>
          )}
          <span className={`text-[10px] text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>

      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-75 max-h-75 overflow-y-auto bg-surface border border-border rounded-lg shadow-lg z-50 p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-wrap gap-2">
            {options.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                selected={selectedOptions.includes(topic)}
                onClick={() => onToggle(topic)}
              />
            ))}
          </div>
          
          {selectedOptions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
              >
                {t('clean')}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}