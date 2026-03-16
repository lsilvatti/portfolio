import { getLocale } from 'next-intl/server';
import { fetchGitHubRepos } from '@/lib/github'; 
import { CenteredLayout } from '@/components/templates';
import { ProjectsView } from '@/components/organisms';
import { Typography } from '@/components/atoms';
import { getTranslations } from 'next-intl/server';


export interface ProcessedProject {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  topics: string[];
  content: string | null; 
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
        content: selectedReadme,
      };
    })
    .filter((project) => project.content !== null);

  return (
    <CenteredLayout>
      <Typography variant='h1' as="h2">
        {t('title')}
      </Typography>
      <Typography variant="body" className='max-w-2xl text-center'>
        {t('description')}
      </Typography>
      <ProjectsView projects={processedProjects} />
    </CenteredLayout>
  );
}