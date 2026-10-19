import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Typography } from '@/components/atoms';
import { RepositoryView } from '@/components/organisms';
import { HorizontallyCenteredLayout } from '@/components/templates';
import type { Metadata } from 'next';
import { getProcessedRepositories, getRepositoryOverlayData } from '@/app/data/repositories';

interface RepositoryOverlayPageProps {
  params: Promise<{ locale: string; repository: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; repository: string }>;
}): Promise<Metadata> {
  const { locale, repository } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projects');

  return {
    title: repository,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/repos/${repository}`,
      languages: {
        en: `/en/repos/${repository}`,
        'pt-BR': `/br/repos/${repository}`,
        'x-default': `/en/repos/${repository}`,
      },
    },
  };
}

export default async function RepositoryOverlayPage({ params }: RepositoryOverlayPageProps) {
  const { locale, repository } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projects');

  const localeCode = locale === 'br' ? 'br' : 'en';
  const [repositories, selectedRepository] = await Promise.all([
    getProcessedRepositories(localeCode),
    getRepositoryOverlayData(localeCode, repository),
  ]);

  if (!selectedRepository) {
    notFound();
  }

  return (
    <HorizontallyCenteredLayout className="mb-0 pb-10 sm:pb-14">
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
