import { Card, Typography } from "@/components/atoms";
import { MarkdownVisualizer } from "@/components/molecules";

export function ProjectReadme({ content }: { content: string | null }) {

    if(!content) {
        return (
            <div className="w-full mt-12 pt-12 border-t border-border animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <Typography variant="body" className="text-center italic text-muted-foreground">
                    Nenhum arquivo README encontrado para este projeto.
                </Typography>
            </div>
        )
    }

    return (
        <Card className="w-full border-t border-border animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Typography variant="h4" className="mb-6 font-mono w-full bg-background">
                # README.md
            </Typography>
            <MarkdownVisualizer markdown={content} />
        </Card>
    )
}