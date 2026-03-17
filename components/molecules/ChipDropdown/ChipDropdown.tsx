'use client';

import { useState, useRef, useEffect } from 'react';
import { Chip, Button, Typography } from '@/components/atoms'; 
import { useTranslations } from 'next-intl';

interface ChipDropdownProps {
  options: string[];
  availableOptions: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
  label?: string;
  className?: string;
  style: React.CSSProperties;
  chipColor?: 'default' | 'outline' | 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';
}

export function ChipDropdown({ 
  options, 
  availableOptions,
  selectedOptions, 
  onToggle, 
  onClear, 
  label = "Tecnologias",
  className = "",
  style,
  chipColor = "default"
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
    <div className={`relative w-full sm:w-62.5 ${className} ${isOpen ? 'z-50' : 'z-10'}`} style={style} ref={dropdownRef}>
      
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
                <Chip
                  key={opt}
                  label={opt}
                  selected={true}
                  variant={chipColor}
                  selectable
                  active={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(opt);
                  }}
                />
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
            {options.map((topic) => {
              const isSelected = selectedOptions.includes(topic);
              const isActive = availableOptions.includes(topic) || isSelected;

              return (
                <Chip
                  key={topic}
                  label={topic}
                  selected={isSelected}
                  active={isActive}
                  selectable={isActive}
                  variant={chipColor}
                  onClick={() => isActive && onToggle(topic)}
                />
              );
            })}
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