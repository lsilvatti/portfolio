'use client';

import { useState, useEffect } from 'react';
import { Typography, typographyVariants } from '@/components/atoms/Typography/Typography';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

interface TypewriterTextProps {
  prefix?: string;
  words: string[];
  variant?: TypographyVariant;
  className?: string;
  style?: React.CSSProperties;
}

export const TypewriterText = ({ prefix = "", words, variant = "h4", className, style }: TypewriterTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0] ?? '');
  const [isDeleting, setIsDeleting] = useState(false);

  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseAtEnd = 2000;

    const fullWord = words[currentWordIndex];

    if (!isDeleting && currentText === fullWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAtEnd);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else {
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className={cn("grid w-full", className)} style={style}>
      <Typography 
        variant={variant} 
        className="invisible col-start-1 row-start-1 text-center" 
        aria-hidden="true"
      >
        {prefix}
        <span className="font-medium">{longestWord}</span>
        <span>_</span>
      </Typography>

      <Typography 
        variant={variant} 
        className="col-start-1 row-start-1 text-center text-muted-foreground"
      >
        {prefix}
        <span className="text-primary font-medium">{currentText}</span>
        <span className="animate-pulse text-primary">_</span>
      </Typography>
    </div>
  );
};