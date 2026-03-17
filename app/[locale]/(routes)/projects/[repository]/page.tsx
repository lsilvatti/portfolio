import { notFound } from 'next/navigation';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { fetchGitHubRepo } from '@/lib/github';
import { Typography, Button, Chip, Link, GoToTop } from '@/components/atoms';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { MarkdownVisualizer } from '@/components/molecules';
import { ProjectHeader, ProjectReadme } from '@/components/organisms';

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
  const t = await getTranslations('pages.projects'); 
  const localeStr = await getLocale();

  const repo = await fetchGitHubRepo(repository);

  if (!repo) notFound();

  const content = localeStr === 'br' 
    ? (repo.readmePt || repo.readmeEn) 
    : (repo.readmeEn || repo.readmePt);

  const lastUpdated = new Date(repo.updatedAt).toLocaleDateString(localeStr === 'br' ? 'pt-BR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <HorizontallyCenteredLayout className="pb-20 mt-5">
      <div className="w-full max-w-full flex items-center justify-center md:justify-between">
      <Link href="/projects" variant="nav" className="text-sm text-muted-foreground">
          ← {t('backToProjects')}
        </Link>
      </div>
 

      <ProjectHeader repo={repo} />

      <ProjectReadme content={content} />

      <GoToTop />

    </HorizontallyCenteredLayout>
  );
}