'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUp, Play, X } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import type { LocalizedFreelanceProject } from '@/app/data/freelance-projects';
import { Button, Card, Chip, Divider, IconButton, Typography } from '@/components/atoms';
import { GithubIcon } from '@/components/atoms/Icon';
import { FreelanceOverviewMedia } from '@/components/molecules';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownComponents } from '@/components/molecules/MarkdownVisualizer/markdownComponents';

interface FreelanceOverlayProps {
  project: LocalizedFreelanceProject;
  basePath: string;
  closeLabel: string;
  backToTopLabel: string;
  technologiesLabel: string;
  highlightsLabel: string;
  projectUrlLabel: string;
  repositoryUrlLabel: string;
  previousImageLabel: string;
  nextImageLabel: string;
}

export function FreelanceOverlay({
  project,
  basePath,
  closeLabel,
  backToTopLabel,
  technologiesLabel,
  highlightsLabel,
  projectUrlLabel,
  repositoryUrlLabel,
  previousImageLabel,
  nextImageLabel,
}: FreelanceOverlayProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isClosingRef = useRef(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasOverviewMarkdown = project.overviewMarkdown.trim().length > 0;

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
    setShowBackToTop((contentRef.current?.scrollTop ?? 0) > 280);
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
    const enterTimer = window.setTimeout(() => setIsVisible(true), 10);

    return () => {
      window.clearTimeout(enterTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 px-4 py-6 sm:px-8 sm:py-10">
      <button
        type="button"
        aria-label={closeLabel}
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
            transition: 'opacity 260ms ease, transform 340ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'opacity, transform',
          }}
        >
          <div
            ref={contentRef}
            onScroll={handleContentScroll}
            className="min-h-0 flex-1 overflow-y-auto p-5 pb-10 sm:p-8 sm:pb-14"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <Typography variant="h2" className="break-words pr-2">
                {project.title}
              </Typography>
              <IconButton icon={X} label={closeLabel} variant="ghost" onClick={handleClose} />
            </div>

            <FreelanceOverviewMedia
              images={project.overviewImages}
              previousLabel={previousImageLabel}
              nextLabel={nextImageLabel}
            />
            {hasOverviewMarkdown && (
              <div className="mt-6 max-w-none">
                <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                  {project.overviewMarkdown}
                </ReactMarkdown>
              </div>
            )}

            <Divider className="my-6" />

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <Chip key={technology} label={technology} variant="outline-secondary" />
                ))}
              </div>
            </div>

            {!hasOverviewMarkdown && (
              <div className="mb-8">
                <Typography variant="body" className="mb-2 font-medium">
                  {highlightsLabel}
                </Typography>
                <ul className="list-disc space-y-2 pl-5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Typography variant="body">{highlight}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-4 border-t border-border pt-4">
              {project.projectUrl && (
                <Button
                  rounded
                  size="md"
                  variant="primary"
                  iconLeft={Play}
                  href={project.projectUrl}
                  target="_blank"
                  className="text-white"
                >
                  {projectUrlLabel}
                </Button>
              )}
              {project.repositoryUrl && (
                <Button
                  rounded
                  size="md"
                  iconLeft={GithubIcon}
                  href={project.repositoryUrl}
                  target="_blank"
                  className="bg-[#24292F] text-white hover:bg-[#1a1e23]"
                >
                  {repositoryUrlLabel}
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div
          className={`absolute bottom-6 right-4 transition-all duration-300 sm:bottom-10 sm:right-8 ${
            showBackToTop ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          <IconButton icon={ArrowUp} label={backToTopLabel} variant="secondary" onClick={scrollToTop} />
        </div>
      </div>
    </div>
  );
}
