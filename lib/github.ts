export interface GitHubRepo {
    name: string;
    description: string | null;
    url: string;
    homepageUrl: string | null;
    stargazerCount: number;
    topics: string[];
    languages: string[];
    tags: string[] | null;
    readmeEn: string | null;
    readmePt: string | null;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
    if (!process.env.GITHUB_PUBLIC_KEY) {
        throw new Error("GITHUB_PUBLIC_KEY is not defined in environment variables");
    }

    if (!process.env.GITHUB_GRAPHQL_API) {
        throw new Error("GITHUB_GRAPHQL_API is not defined in environment variables");
    }

    const query = `
    query {
      user(login: "lsilvatti") {
        repositories(first: 50, privacy: PUBLIC, isFork: false, ownerAffiliations: [OWNER], orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            description
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
              
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(process.env.GITHUB_GRAPHQL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GITHUB_PUBLIC_KEY}`,
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 60 * 60 * 24 }, // 24h cache
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        if (json.errors) {
            console.error('Erros no GraphQL:', json.errors);
            throw new Error('Erro ao processar a query GraphQL no GitHub.');
        }

        const repositories = json.data.user.repositories.nodes.filter((node: any) => node.name !== 'lsilvatti').map((node: any) => {

            const languages = node.languages?.nodes.map((lang: any) => lang.name) || [];
            
            const tags = node.repositoryTopics?.nodes.map((topicNode: any) => topicNode.topic.name) || [];
            
            const allTopics = Array.from(new Set([...languages, ...tags]));

            return {
                name: node.name,
                description: node.description,
                languages: languages,
                tags: tags,
                topics: allTopics,
            };
        });

        return repositories;

    } catch (error) {
        console.error('Erro ao buscar repositórios do GitHub:', error);
        throw error;
    }
}

// lib/github.ts

export interface GitHubRepoDetails {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  isArchived: boolean;
  openGraphImageUrl: string;
  licenseName: string | null;
  languages: string[];
  tags: string[];
  topics: string[];
  readmeEn: string | null;
  readmePt: string | null;
}

export const fetchGitHubRepo = async (repoName: string): Promise<GitHubRepoDetails | null> => {
  const query = `
    query($repoName: String!) {
      repository(owner: "lsilvatti", name: $repoName) {
        name
        description
        url
        homepageUrl
        stargazerCount
        forkCount
        updatedAt
        isArchived
        openGraphImageUrl
        licenseInfo {
          name
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
        }
        languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
          }
        }
        readmeEn: object(expression: "HEAD:README.md") {
          ... on Blob {
            text
          }
        }
        readmePt: object(expression: "HEAD:README-pt.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(process.env.GITHUB_GRAPHQL_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GITHUB_PUBLIC_KEY}`,
      },
      body: JSON.stringify({ query, variables: { repoName } }),
      next: { revalidate: 60 * 60 } // 1h cache
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const json = await response.json();

    if (json.errors || !json.data.repository) {
        return null; 
    }

    const repo = json.data.repository;
    const languages = repo.languages?.nodes.map((lang: any) => lang.name) || [];
    const tags = repo.repositoryTopics?.nodes.map((topicNode: any) => topicNode.topic.name) || [];

    return {
      name: repo.name,
      description: repo.description,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      updatedAt: repo.updatedAt,
      isArchived: repo.isArchived,
      openGraphImageUrl: repo.openGraphImageUrl,
      licenseName: repo.licenseInfo?.name || null,
      languages,
      tags,
      topics: Array.from(new Set([...languages, ...tags])),
      readmeEn: repo.readmeEn?.text || null, 
      readmePt: repo.readmePt?.text || null,
    };
  } catch (error) {
    console.error('Erro ao buscar repositório do GitHub:', error);
    return null;
  }
}