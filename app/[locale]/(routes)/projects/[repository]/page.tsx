import { notFound } from 'next/navigation';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { fetchGitHubRepo } from '@/lib/github';
import { Typography, Button, Chip } from '@/components/atoms';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { Github, ExternalLink, Star, GitFork, Clock } from 'lucide-react'; // Sugestão de ícones
import { MarkdownVisualizer } from '@/components/molecules';

interface ProjectPageProps {
  params: Promise<{ locale: string; repository: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, repository } = await params;
  setRequestLocale(locale);
  const repo = await fetchGitHubRepo(repository);

  if (!repo) return { title: 'Projeto não encontrado' };

  return {
    title: `${repo.name} | Leonardo Silvatti`,
    description: repo.description || 'Detalhes do projeto',
    openGraph: {
      images: [repo.openGraphImageUrl],
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, repository } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projectDetail'); 
  const localeStr = await getLocale();

  const repo = await fetchGitHubRepo(repository);

  // Se a API retornar null, manda pra página de 404 automaticamente
  if (!repo) notFound();

  // Lógica de fallback do Readme baseada no idioma
  const content = localeStr === 'br' 
    ? (repo.readmePt || repo.readmeEn) 
    : (repo.readmeEn || repo.readmePt);

  // Formatação de data (opcional, pode extrair pra um utilitário)
  const lastUpdated = new Date(repo.updatedAt).toLocaleDateString(localeStr === 'br' ? 'pt-BR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <HorizontallyCenteredLayout className="pb-20">
      
      <div className="w-full flex flex-col gap-8 animate-fade-up">
        
        <div className="w-full h-64 sm:h-80 relative rounded-xl overflow-hidden border border-border shadow-lg">
          <Image 
            src={repo.openGraphImageUrl} 
            alt={`Capa do projeto ${repo.name}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Typography variant="h1" className="mb-0 m-0">
              {repo.name.replace(/-/g, ' ')}
            </Typography>

            <div className="flex items-center gap-3">
              <Button variant="outline">
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
              {repo.homepageUrl && (
                <Button variant="primary">
                  <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          <Typography variant="body" className="text-lg text-muted-foreground">
            {repo.description}
          </Typography>

          <div className="flex flex-wrap gap-2 mt-2">
            {repo.topics.map(topic => (
              <Chip key={topic} label={topic} variant="outline" selectable={false} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> {repo.stargazerCount}</span>
            <span className="flex items-center gap-1.5"><GitFork className="w-4 h-4" /> {repo.forkCount}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lastUpdated}</span>
            {repo.licenseName && <span>⚖️ {repo.licenseName}</span>}
            {repo.isArchived && <span className="text-warning font-medium">⚠️ Arquivado</span>}
          </div>
        </div>
      </div>

      <div className="w-full mt-12 pt-12 border-t border-border animate-fade-up" style={{ animationDelay: '0.2s' }}>
        {content ? (
          <MarkdownVisualizer markdown={content} />
        ) : (
          <Typography variant="body" className="text-center italic text-muted-foreground">
            Nenhum arquivo README encontrado para este projeto.
          </Typography>
        )}
      </div>

    </HorizontallyCenteredLayout>
  );
}