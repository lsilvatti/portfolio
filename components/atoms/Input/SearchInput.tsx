import React from 'react';
import { Input } from '@/components/atoms'; 

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Buscar...",
  className,
  style,
}: SearchInputProps) {
  return (
    <Input
        type="search" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        style={style}
        size="md" 
        hideHelper 
      />
  );
}