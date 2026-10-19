import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Typography } from '@/components/atoms';
import { getTranslations } from 'next-intl/server';
import { HorizontallyCenteredLayout } from '@/components/templates';
import type { Metadata } from 'next';
import { getProcessedRepositories, getRepositoryOverlayData } from '@/app/data/repositories';

const RepositoryView = dynamic(
  () => import('@/components/organisms').then((module) => module.RepositoryView),
  {
    loading: () => (
      <div className="w-full max-w-5xl animate-pulse rounded-2xl border border-border bg-muted/20 p-8">
        <div className="h-12 w-2/3 rounded-md bg-muted/30" />
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
  const t = await getTranslations('pages.projects');

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/repos`,
      languages: {
        en: '/en/repos',
        'pt-BR': '/br/repos',
        'x-default': '/en/repos',
      },
    },
  };
}

export default async function RepositoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ repo?: string } | undefined>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projects');

  const localeCode = locale === 'br' ? 'br' : 'en';
  const repositories = await getProcessedRepositories(localeCode);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedRepository =
    resolvedSearchParams?.repo && typeof resolvedSearchParams.repo === 'string'
      ? await getRepositoryOverlayData(localeCode, resolvedSearchParams.repo)
      : null;

  return (
    <HorizontallyCenteredLayout className="pb-10 sm:pb-14">
      <Typography variant="h1" as="h2" className="animate-fade-up mt-0 mb-0">
        {t('title')}
      </Typography>

      <Typography
        variant="body"
        className="max-w-2xl text-center animate-fade-up mb-16"
        style={{ animationDelay: '0.1s' }}
      >
        {t('description')}
      </Typography>

      <RepositoryView
        repositories={repositories}
        selectedRepository={selectedRepository}
        basePath="/repos"
        initialDelay={0.2}
      />
    </HorizontallyCenteredLayout>
  );
}
