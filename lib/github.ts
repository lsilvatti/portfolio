export interface GitHubRepo {
    name: string;
    description: string | null;
    url: string;
    homepageUrl: string | null;
    stargazerCount: number;
    topics: string[];
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
            url
            homepageUrl
            stargazerCount
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
                url: node.url,
                homepageUrl: node.homepageUrl,
                stargazerCount: node.stargazerCount,
                topics: allTopics,
                readmeEn: node.readmeEn?.text || null, 
                readmePt: node.readmePt?.text || null,
            };
        });

        return repositories;

    } catch (error) {
        console.error('Erro ao buscar repositórios do GitHub:', error);
        throw error;
    }
}