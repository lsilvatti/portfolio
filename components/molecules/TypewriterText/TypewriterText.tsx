import { Typography, typographyVariants } from '@/components/atoms';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { TypewriterAnimation } from './TypewriterAnimation';

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

interface TypewriterTextProps {
  prefix?: string;
  words: string[];
  variant?: TypographyVariant;
  className?: string;
  style?: React.CSSProperties;
}

export function TypewriterText({ prefix = '', words, variant = 'h4', className, style }: TypewriterTextProps) {
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');

  return (
    <div className={cn('grid w-full', className)} style={style}>
      <Typography
        variant={variant}
        className="invisible col-start-1 row-start-1 text-center"
        aria-hidden="true"
      >
        {prefix}
        <span>{longestWord}</span>
        <span>_</span>  
      </Typography>

      <TypewriterAnimation words={words} prefix={prefix} variant={variant} initialText={longestWord} />
    </div>
  );
}