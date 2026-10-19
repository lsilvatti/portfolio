import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, Typography } from '@/components/atoms';
import { FreelanceProjectsView } from '@/components/organisms';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { getFreelanceProjectById, getFreelanceProjects } from '@/app/data/freelance-projects';

interface FreelanceOverlayPageProps {
  params: Promise<{ locale: string; project: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; project: string }>;
}): Promise<Metadata> {
  const { locale, project } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.freelanceProjects');

  return {
    title: project,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/freelances/${project}`,
      languages: {
        en: `/en/freelances/${project}`,
        'pt-BR': `/br/freelances/${project}`,
        'x-default': `/en/freelances/${project}`,
      },
    },
  };
}

export default async function FreelanceOverlayPage({ params }: FreelanceOverlayPageProps) {
  const { locale, project } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.freelanceProjects');

  const localeCode = locale === 'br' ? 'br' : 'en';
  const [projects, selectedProject] = await Promise.all([
    Promise.resolve(getFreelanceProjects(localeCode)),
    Promise.resolve(getFreelanceProjectById(localeCode, project)),
  ]);

  if (!selectedProject) {
    notFound();
  }

  return (
    <HorizontallyCenteredLayout className="mb-24">
      <Typography variant="h1" as="h2" className="animate-fade-up mt-0 mb-0">
        {t('title')}
      </Typography>

      <Typography
        variant="body"
        className="max-w-3xl text-center animate-fade-up mb-10"
        style={{ animationDelay: '0.1s' }}
      >
        {t('description')}
      </Typography>

      <Typography variant="body" className="max-w-3xl text-center mb-8">
        {t.rich('contactCta', {
          link: (chunks) => (
            <Link href="/connect" variant="primary">
              {chunks}
            </Link>
          ),
        })}
      </Typography>

      <FreelanceProjectsView
        projects={projects}
        selectedProject={selectedProject}
        basePath="/freelances"
        technologiesLabel={t('technologies')}
        highlightsLabel={t('highlights')}
        projectUrlLabel={t('viewProject')}
        repositoryUrlLabel={t('viewRepository')}
        searchPlaceholder={t('searchInput.placeholder')}
        noResults={t('noResults')}
        closeOverlayLabel={t('closeFreelance')}
        backToTopLabel={t('backToTop')}
        previousImageLabel={t('previousImage')}
        nextImageLabel={t('nextImage')}
      />
    </HorizontallyCenteredLayout>
  );
}
