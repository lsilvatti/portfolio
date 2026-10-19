import Image from 'next/image';
import { Card, Chip, Link, Typography } from '@/components/atoms';

interface FreelanceProjectCardProps {
  title: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  listImageSrc: string;
  listImageAlt: string;
  technologiesLabel: string;
  highlightsLabel: string;
  projectUrl?: string;
  repositoryUrl?: string;
  projectUrlLabel: string;
  repositoryUrlLabel: string;
  showLinks?: boolean;
}

export function FreelanceProjectCard({
  title,
  summary,
  highlights,
  technologies,
  listImageSrc,
  listImageAlt,
  technologiesLabel,
  highlightsLabel,
  projectUrl,
  repositoryUrl,
  projectUrlLabel,
  repositoryUrlLabel,
  showLinks = true,
}: FreelanceProjectCardProps) {
  return (
    <Card className="overflow-hidden border animate-fade-pop-in h-full p-0">
      <div className="relative aspect-[1200/630] w-full border-b border-border">
        <Image
          src={listImageSrc}
          alt={listImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex h-full flex-col gap-4 p-6">
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body">{summary}</Typography>

        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <Chip key={technology} label={technology} variant="outline-secondary" />
          ))}
        </div>

        <div className="space-y-2">
          <Typography variant="small" className="font-semibold uppercase tracking-wide">
            {highlightsLabel}
          </Typography>
          <ul className="list-disc space-y-1 pl-5">
            {highlights.map((highlight) => (
              <li key={highlight}>
                <Typography variant="body">{highlight}</Typography>
              </li>
            ))}
          </ul>
        </div>

        {showLinks && (
          <div className="mt-auto flex flex-wrap gap-4 pt-2">
            {projectUrl && (
              <Link href={projectUrl} external variant="primary">
                {projectUrlLabel}
              </Link>
            )}

            {repositoryUrl && (
              <Link href={repositoryUrl} external variant="primary">
                {repositoryUrlLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
