import { Card, Chip, Typography } from "@/components/atoms";

export interface ProjectCardProps {
    title: string; 
    description: string; 
    languages: string[];
    tags: string[] | null;
}

export function ProjectCard({ title, description, languages, tags }: ProjectCardProps) {
    return (
        <Card key={title} className="flex flex-col border animate-fade-pop-in gap-3 p-4 hover:border-primary hover:cursor-pointer hover:bg-surface-hover" style={{ animationDelay: '0.1s' }}>
            <Typography variant="h3" >{title.replace(/-/g, ' ')}</Typography>
            <Typography variant="body">{description}</Typography>
            <div className="flex gap-2 flex-wrap">
            {languages.map((lang) => (
                <Chip key={lang} label={lang} variant="primary" className="mb-2" />
            ))}
            {tags && tags.map((tag) => (
                <Chip key={tag} label={tag} variant="secondary" className="mb-2" />
            ))}
            </div>
        </Card>
    )
}