'use client';

import { useState, useRef, useEffect } from 'react';
import { Chip, Button, Typography } from '@/components/atoms'; 

interface ChipDropdownProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
  label?: string;
}

export function ChipDropdown({ 
  options, 
  selectedOptions, 
  onToggle, 
  onClear, 
  label = "Tecnologias" 
}: ChipDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="relative min-w-62.5" ref={dropdownRef}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        className="w-full sm:w-auto px-4 py-2 min-h-10 rounded-lg bg-surface border border-border text-foreground hover:bg-surface-hover transition-colors flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shadow-sm"
      >
        <div className="flex flex-wrap gap-1.5 items-center grow">
          {selectedOptions.length === 0 ? (
            <Typography variant="body" className="text-sm font-medium">
              {label}
            </Typography>
          ) : (
            selectedOptions.map((opt) => (
              <span 
                key={opt} 
                className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground shadow-sm"
              >
                {opt}
              </span>
            ))
          )}
        </div>
        
        <span className={`text-[10px] text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-75 max-h-75 overflow-y-auto bg-surface border border-border rounded-lg shadow-lg z-10 p-4 animate-in fade-in slide-in-from-top-2">
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
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}