'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Chip, Divider, IconButton, Typography } from '@/components/atoms';
import { X, Star, GitFork, Clock, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import remarkGfm from 'remark-gfm';
import ReactMarkdown, { type Components } from 'react-markdown';
import { RepositoryActionButtons } from '@/components/molecules/RepositoryActionButtons/RepositoryActionButtons';
import type { RepositoryOverlayData } from '@/app/data/repositories';

interface RepositoryOverlayProps {
  repository: RepositoryOverlayData;
  basePath: string;
}

const markdownComponents: Components = {
  a: ({ ...props }) => (
    <a
      {...props}
      target={props.href?.startsWith('#') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="break-all underline underline-offset-2"
    />
  ),
  img: ({ ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ''}
      className="my-4 h-auto max-w-full rounded-md border border-border"
    />
  ),
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table {...props} className="w-full min-w-[32rem] border-collapse text-left text-sm" />
    </div>
  ),
  th: ({ ...props }) => (
    <th {...props} className="border border-border bg-surface px-3 py-2 font-semibold" />
  ),
  td: ({ ...props }) => <td {...props} className="border border-border px-3 py-2 align-top" />,
  pre: ({ ...props }) => (
    <pre
      {...props}
      className="my-4 overflow-x-auto rounded-lg border border-border bg-[#1e1e2e] p-4 text-sm"
    />
  ),
  code: ({ className, children, ...props }) => {
    if (className?.includes('language-')) {
      return (
        <code {...props} className={className}>
          {children}
        </code>
      );
    }

    return (
      <code
        {...props}
        className="break-words rounded border border-border/60 bg-surface-hover px-1.5 py-0.5 font-mono text-[0.875em]"
      >
        {children}
      </code>
    );
  },
};

export function RepositoryOverlay({ repository, basePath }: RepositoryOverlayProps) {
  const t = useTranslations('pages.projects');
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isClosingRef = useRef(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const navigateBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.replace(basePath);
  }, [basePath, router]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsVisible(false);
    window.setTimeout(navigateBack, 320);
  }, [navigateBack]);

  const handleContentScroll = useCallback(() => {
    const currentScrollTop = contentRef.current?.scrollTop ?? 0;
    setShowBackToTop(currentScrollTop > 280);
  }, []);

  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const enterTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 10);

    if ('prefetch' in router && typeof router.prefetch === 'function') {
      router.prefetch(basePath);
    }

    return () => {
      window.clearTimeout(enterTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [basePath, handleClose, router]);

  const localizedDescription = t.has(`projects.${repository.name}`)
    ? t(`projects.${repository.name}`)
    : repository.description;

  const lastUpdated = new Date(repository.updatedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 px-4 py-6 sm:px-8 sm:py-10">
      <button
        type="button"
        aria-label={t('closeRepository')}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 260ms ease',
          willChange: 'opacity',
        }}
        onClick={handleClose}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <Card
          className="flex w-full max-h-[calc(100dvh-3rem)] flex-col overflow-hidden sm:max-h-[calc(100vh-5rem)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(10px) scale(0.985)',
            transition:
              'opacity 260ms ease, transform 340ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'opacity, transform',
          }}
        >
          <div
            ref={contentRef}
            onScroll={handleContentScroll}
            className="min-h-0 flex-1 overflow-y-auto p-5 pb-10 sm:p-8 sm:pb-14"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <Typography variant="h2" className="break-words pr-2 capitalize">
                {repository.name.replace(/-/g, ' ')}
              </Typography>
              <IconButton icon={X} label={t('closeRepository')} variant="ghost" onClick={handleClose} />
            </div>

            <Typography variant="body" className="text-muted-foreground text-lg">
              {localizedDescription}
            </Typography>

            <Divider className="my-6" />

            <div className="mb-6">
              <Typography variant="body" className="font-medium mb-2">
                {t('languages')}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {repository.languages.map((language) => (
                  <Chip key={language} label={language} variant="primary" />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Typography variant="body" className="font-medium mb-2">
                {t('topics')}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {repository.tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="secondary" />
                ))}
              </div>
            </div>

            <RepositoryActionButtons
              repoUrl={repository.url}
              homepageUrl={repository.homepageUrl}
              isPortfolio={repository.name === 'portfolio'}
              className="mb-6"
            />

            <div className="mb-8 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground sm:gap-6">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4" /> {repository.stargazerCount} {t('stars')}
              </span>
              <span className="flex items-center gap-1.5">
                <GitFork className="h-4 w-4" /> {repository.forkCount} {t('forks')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {lastUpdated}
              </span>
              {repository.licenseName && <span>⚖️ {repository.licenseName}</span>}
              {repository.isArchived && <span className="text-warning font-medium">⚠️ {t('archived')}</span>}
            </div>

            {repository.content ? (
              <Card className="border-t border-border mb-2 sm:mb-4">
                <Typography variant="h4" className="mb-6 font-mono">
                  # README.md
                </Typography>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words prose-p:mb-4 prose-headings:mt-6 prose-headings:mb-3 prose-li:break-words prose-code:break-words">
                  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {repository.content}
                  </ReactMarkdown>
                </div>
              </Card>
            ) : (
              <Typography variant="body" className="mb-2 text-center italic text-muted-foreground sm:mb-4">
                {t('noReadme')}
              </Typography>
            )}
          </div>
        </Card>

        <div
          className={`absolute bottom-6 right-4 transition-all duration-300 sm:bottom-10 sm:right-8 ${
            showBackToTop ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          <IconButton
            icon={ArrowUp}
            label={t('backToTop')}
            variant="secondary"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </div>
  );
}
