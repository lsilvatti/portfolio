import { getLocale, setRequestLocale } from 'next-intl/server';
import { fetchGitHubRepos } from '@/lib/github'; 
import { ProjectsView } from '@/components/organisms';
import { Typography } from '@/components/atoms';
import { getTranslations } from 'next-intl/server';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { Metadata } from 'next';


export interface ProcessedProject {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  topics: string[];
  languages: string[];
  tags: string[] | null;
  content: string | null; 
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projects");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        "en": "/en/projects",
        "pt-BR": "/br/projects",
        "x-default": "/en/projects"
      },
    }
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations('pages.projects');

  const locale = await getLocale(); 
  
  const rawRepos = await fetchGitHubRepos();

  const processedProjects: ProcessedProject[] = rawRepos
    .map((repo) => {
      let selectedReadme = null;

      if (locale === 'br') {
        selectedReadme = repo.readmePt || repo.readmeEn;
      } else {
        selectedReadme = repo.readmeEn || repo.readmePt;
      }

      return {
        name: repo.name,
        description: repo.description,
        url: repo.url,
        homepageUrl: repo.homepageUrl,
        stargazerCount: repo.stargazerCount,
        topics: repo.topics,
        languages: repo.languages,
        tags: repo.tags,
        content: selectedReadme,
      };
    })
    .filter((project) => project.content !== null);

  return (
    <HorizontallyCenteredLayout className='mb-0'>
      <Typography variant='h1' as="h2" className="animate-fade-up mt-0 mb-0">
        {t('title')}
      </Typography>

      <Typography variant="body" className='max-w-2xl text-center animate-fade-up' style={{ animationDelay: '0.1s' }}>
        {t('description')}
      </Typography>

      <ProjectsView projects={processedProjects} initialDelay={0.2} />
    </HorizontallyCenteredLayout>
  );
}