import { Card, Chip, Link, Typography } from "@/components/atoms";

export interface ProjectListCardProps {
  title: string;
  description: string;
  languages: string[];
  tags: string[] | null;
  style?: React.CSSProperties;
  filteredLanguages?: string[];
  filteredTags?: string[];
  onClickLanguageChip?: (language: string) => void;
  onClickTagChip?: (tag: string) => void;
}

export function ProjectListCard({
  title,
  description,
  languages,
  tags,
  style,
  filteredLanguages,
  filteredTags,
}: ProjectListCardProps) {

  return (
    <Link href={`/projects/${title}`} className="w-full">
      <Card
        className="flex flex-col border animate-fade-pop-in gap-3 p-4 hover:border-primary hover:cursor-pointer hover:bg-surface-hover w-full"
        style={{ animationDelay: '0.1s', ...style }}
      >
        <Typography variant="h3">{title.replace(/-/g, ' ')}</Typography>
        <Typography variant="body">{description}</Typography>
        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              variant={filteredLanguages?.includes(lang) ? 'primary' : 'outline-primary'}
              className="mb-2"
            />
          ))}
          {tags && tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant={filteredTags?.includes(tag) ? 'secondary' : 'outline-secondary'}
              className="mb-2"
            />
          ))}
        </div>
      </Card>
    </Link>
  )
}