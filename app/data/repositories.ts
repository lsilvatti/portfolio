import type { Locale } from '@/i18n/config';
import { fetchGitHubRepo, fetchGitHubRepos, type GitHubRepoDetails } from '@/lib/github';

export interface ProcessedRepository {
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

export interface RepositoryOverlayData extends GitHubRepoDetails {
  content: string | null;
}

export async function getProcessedRepositories(locale: Locale): Promise<ProcessedRepository[]> {
  const rawRepos = await fetchGitHubRepos();

  return rawRepos
    .map((repo) => {
      const selectedReadme = locale === 'br' ? repo.readmePt || repo.readmeEn : repo.readmeEn || repo.readmePt;

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
    .filter((repository) => repository.content !== null);
}

export async function getRepositoryOverlayData(
  locale: Locale,
  repository: string
): Promise<RepositoryOverlayData | null> {
  const repo = await fetchGitHubRepo(repository);

  if (!repo) {
    return null;
  }

  const content = locale === 'br' ? repo.readmePt || repo.readmeEn : repo.readmeEn || repo.readmePt;

  return {
    ...repo,
    content,
  };
}
