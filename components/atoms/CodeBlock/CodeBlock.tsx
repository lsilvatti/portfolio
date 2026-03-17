'use client'; // Necessário pois o highlighter manipula o DOM

import React from 'react';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// O tema dracula combina perfeitamente com fundos escuros e roxos
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

export function CodeBlock({ inline, className, children, ...props }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (!inline && match) {
    return (
      <div className="rounded-lg overflow-hidden my-6 border border-border shadow-lg text-sm">
        <SyntaxHighlighter
          style={dracula as any}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }} 
          className="bg-[#1e1e2e]" // Forçando um fundo escuro elegante
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code
      className={cn(
        "bg-surface-hover text-primary font-mono px-1.5 py-0.5 rounded text-[0.875em] border border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}