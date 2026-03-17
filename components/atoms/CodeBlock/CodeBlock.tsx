'use client'; // Necessário pois o highlighter manipula o DOM

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

export function CodeBlock({ inline, className, children, ...props }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const [Highlighter, setHighlighter] = useState<any>(null);
  const [styleObj, setStyleObj] = useState<any>(null);

  useEffect(() => {
    if (!inline && match) {
      let mounted = true;
      Promise.all([
        import('react-syntax-highlighter'),
        import('react-syntax-highlighter/dist/cjs/styles/prism').catch(() => ({})),
      ]).then(([mod, styles]) => {
        if (!mounted) return;
        const H = mod.Prism || mod.default || mod;
        setHighlighter(() => H);
        const s = styles as any;
        setStyleObj(s.dracula || s.vs || s.atomOneDark || {});
      });

      return () => {
        mounted = false;
      };
    }
  }, [inline, match]);

  if (!inline && match) {
    // placeholder while loading
    if (!Highlighter) {
      return (
        <div className="rounded-lg overflow-hidden my-6 border border-border shadow-lg text-sm">
          <pre
            style={{ margin: 0, padding: '1.25rem', background: 'transparent' }}
            className="bg-[#1e1e2e]"
          >
            <code>{String(children).replace(/\n$/, '')}</code>
          </pre>
        </div>
      );
    }

    const High = Highlighter;
    return (
      <div className="rounded-lg overflow-hidden my-6 border border-border shadow-lg text-sm">
        <High
          style={styleObj as any}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}
          className="bg-[#1e1e2e]"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </High>
      </div>
    );
  }

  return (
    <code
      className={cn(
        'bg-surface-hover text-primary font-mono px-1.5 py-0.5 rounded text-[0.875em] border border-border/50',
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}