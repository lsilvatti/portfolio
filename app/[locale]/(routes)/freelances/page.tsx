import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, Typography } from '@/components/atoms';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { getFreelanceProjectById, getFreelanceProjects } from '@/app/data/freelance-projects';

const FreelanceProjectsView = dynamic(
  () => import('@/components/organisms').then((module) => module.FreelanceProjectsView),
  {
    loading: () => (
      <div className="w-full max-w-5xl animate-pulse rounded-2xl border border-border bg-muted/20 p-8">
        <div className="h-14 w-2/3 rounded-md bg-muted/30" />
      </div>
    ),
  }
);

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

export default async function FreelancesPage({
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
