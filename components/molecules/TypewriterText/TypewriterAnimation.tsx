'use client';

import { useState, useEffect, startTransition } from 'react';
import { Typography, typographyVariants } from '@/components/atoms/Typography/Typography';
import { type VariantProps } from 'class-variance-authority';

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

interface TypewriterAnimationProps {
  prefix?: string;
  words: string[];
  variant?: TypographyVariant;
  initialText?: string;
}

export const TypewriterAnimation = ({ 
  prefix = '', 
  words, 
  variant = 'h4', 
  initialText 
}: TypewriterAnimationProps) => {
  const startIndex = initialText ? Math.max(words.indexOf(initialText), 0) : 0;
  const [currentWordIndex, setCurrentWordIndex] = useState(startIndex);
  const [currentText, setCurrentText] = useState(initialText ?? words[0] ?? '');
  
  const [isDeleting, setIsDeleting] = useState(true);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseAtEnd = 2000;

    const fullWord = words[currentWordIndex];

    if (!isDeleting && currentText === fullWord) {
      const timeout = setTimeout(
        () => startTransition(() => setIsDeleting(true)),
        pauseAtEnd
      );
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === '') {
      startTransition(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      });
      return;
    }

    const timeout = setTimeout(() => {
      startTransition(() => {
        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, -1));
        } else {
          setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
        }
      });
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, hasStarted]);

  return (
    <Typography
      variant={variant}
      className="col-start-1 row-start-1 text-center text-muted-foreground"
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix}
      <span className="text-primary font-medium">{currentText}</span>
      <span 
        className={`text-primary ${hasStarted ? 'animate-pulse' : ''}`} 
        aria-hidden="true"
      >
        _
      </span>
    </Typography>
  );
};