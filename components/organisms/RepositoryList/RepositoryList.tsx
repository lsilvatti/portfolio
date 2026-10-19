import { ProcessedRepository } from "@/app/data/repositories";
import { RepositoryListCard } from "@/components/molecules";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

export function RepositoryList({
  repositories,
  selectedLanguages,
  selectedTags,
  basePath,
  animateCards = true,
}: {
  repositories: ProcessedRepository[];
  selectedLanguages: string[];
  selectedTags: string[];
  basePath: string;
  animateCards?: boolean;
}) {
  const t = useTranslations('pages.projects');

  if (repositories.length === 0) {
    return (
      <div className="text-center flex flex-col text-neutral-500 py-10 gap-4">
        <SearchX size={48} className="mx-auto" />
        <p className="text-lg">{t('noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
      {repositories.map((repository) => {
        if (repository.tags?.includes('hidden-from-portfolio')) {
          return null;
        }

        let localizedDescription = repository.description || '';
        if (t.has(`projects.${repository.name}`)) {
          localizedDescription = t(`projects.${repository.name}`);
        }

        return (
          <div key={repository.name} className="break-inside-avoid inline-block w-full">
            <RepositoryListCard
              href={`${basePath}?repo=${encodeURIComponent(repository.name)}`}
              title={repository.name}
              description={localizedDescription}
              languages={repository.languages}
              tags={repository.tags}
              itemTypeLabel={t('repositoryLabel')}
              filteredLanguages={selectedLanguages}
              filteredTags={selectedTags}
              animate={animateCards}
            />
          </div>
        );
      })}
    </div>
  );
}