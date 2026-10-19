import { setRequestLocale } from 'next-intl/server';
import { RepositoryView } from '@/components/organisms';
import { Typography } from '@/components/atoms';
import { getTranslations } from 'next-intl/server';
import { HorizontallyCenteredLayout } from '@/components/templates';
import { Metadata } from 'next';
import { getProcessedRepositories } from '@/app/data/repositories';

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
      canonical: `/${locale}/repos`,
      languages: {
        "en": "/en/repos",
        "pt-BR": "/br/repos",
        "x-default": "/en/repos"
      },
    }
  };
}

export default async function LegacyRepositoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projects');
  const repositories = await getProcessedRepositories(locale === 'br' ? 'br' : 'en');

  return (
    <HorizontallyCenteredLayout className='mb-0'>
      <Typography variant='h1' as="h2" className="animate-fade-up mt-0 mb-0">
        {t('title')}
      </Typography>

      <Typography variant="body" className='max-w-2xl text-center animate-fade-up mb-16' style={{ animationDelay: '0.1s' }}>
        {t('description')}
      </Typography>

      <RepositoryView
        repositories={repositories}
        selectedRepository={null}
        basePath="/projects"
        initialDelay={0.2}
      />
    </HorizontallyCenteredLayout>
  );
}