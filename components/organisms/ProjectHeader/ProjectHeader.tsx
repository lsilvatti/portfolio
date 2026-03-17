import { Button, Card, Chip, Divider, ShareButton, Tooltip, Typography } from "@/components/atoms";
import Image from 'next/image';
import { Github, ExternalLink, Star, GitFork, Clock, Play } from 'lucide-react'; // Sugestão de ícones
import { GitHubRepoDetails } from "@/lib/github";
import { getLocale, getTranslations } from "next-intl/server";
import { GithubIcon } from "@/components/atoms/Icon";
import { ProjectActionButtons } from "@/components/molecules/ProjectActionButtons/ProjectActionButtons";
import { useMemo } from "react";

export async function ProjectHeader({ repo }: { repo: GitHubRepoDetails }) {
    const t = await getTranslations('pages.projects');

    const localeStr = await getLocale();

    const lastUpdated = new Date(repo.updatedAt).toLocaleDateString(localeStr === 'br' ? 'pt-BR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <Card as="header" className="mb-8 pb-12 md:pb-8 relative animate-fade-pop-in">
            <ShareButton className="absolute -top-6 right-6 md:right-8" />

            <div className="w-full flex flex-col gap-8">


                <div className="flex flex-col gap-4">
                    <Typography variant="h1" className="mb-0 m-0 capitalize animate-fade-down" style={{ animationDelay: '0.05s' }}>
                        {repo.name.replace(/-/g, ' ')}
                    </Typography>

                    <Divider animated color="secondary" />

                    <Typography variant="body" className="text-lg text-muted-foreground animate-fade-down" style={{ animationDelay: '0.1s' }}>
                        {t.has('projects.' + repo.name) ? t('projects.' + repo.name) : repo.description}
                    </Typography>

                    <div className="animate-fade-down" style={{ animationDelay: '0.15s' }}>
                        <Typography variant="body" className="font-medium">
                            {t('languages')}
                        </Typography>
                        <div className="flex flex-wrap gap-2 mt-2">

                            {repo.languages.map(lang => (
                                <Chip key={lang} variant="primary" label={lang} />
                            ))}
                        </div>

                    </div>
                    <div className="animate-fade-down" style={{ animationDelay: '0.2s' }}>
                        <Typography variant="body" className="font-medium">
                            {t('technologies')}
                        </Typography>
                        <div className="flex flex-wrap gap-2 mt-2">

                            {repo.tags.map(tag => (
                                <Chip key={tag} variant="secondary" label={tag} />
                            ))}
                        </div>
                    </div>

                   <ProjectActionButtons repoUrl={repo.url} homepageUrl={repo.homepageUrl} isPortfolio={repo.name === 'portfolio'} className="hidden md:flex md:absolute md:-bottom-5 right-9"/>

                    <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                        <Tooltip content={t('stars')}>
                            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> {repo.stargazerCount}</span>
                        </Tooltip>
                        <Tooltip content={t('forks')}>
                            <span className="flex items-center gap-1.5"><GitFork className="w-4 h-4" /> {repo.forkCount}</span>
                        </Tooltip>
                        <Tooltip content={t('lastUpdated')}>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lastUpdated}</span>
                        </Tooltip>
                        {repo.licenseName && <span>⚖️ {repo.licenseName}</span>}
                        {repo.isArchived && <span className="text-warning font-medium">⚠️ {t('archived')}</span>}
                    </div>

                    <ProjectActionButtons repoUrl={repo.url} homepageUrl={repo.homepageUrl} isPortfolio={repo.name === 'portfolio'} className="flex flex-col w-full items-stretch gap-3 md:hidden"/>
                </div>
            </div>
        </Card>
    );
}