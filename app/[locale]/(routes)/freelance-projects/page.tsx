import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, Typography } from '@/components/atoms';
import { FreelanceProjectsView } from '@/components/organisms';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { getFreelanceProjectById, getFreelanceProjects } from '@/app/data/freelance-projects';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.freelanceProjects');

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/freelances`,
      languages: {
        en: '/en/freelances',
        'pt-BR': '/br/freelances',
        'x-default': '/en/freelances',
      },
    },
  };
}

export default async function FreelanceProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ project?: string } | undefined>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.freelanceProjects');
  const localeCode = locale === 'br' ? 'br' : 'en';
  const projects = getFreelanceProjects(localeCode);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedProject =
    resolvedSearchParams?.project && typeof resolvedSearchParams.project === 'string'
      ? getFreelanceProjectById(localeCode, resolvedSearchParams.project)
      : null;

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
        basePath="/freelance-projects"
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
