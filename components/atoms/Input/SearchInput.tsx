import React from 'react';
import { Input } from '@/components/atoms'; 

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Buscar...",
  className
}: SearchInputProps) {
  return (
    <Input
        type="search" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        size="md" 
        hideHelper 
      />
  );
}