'use client';

import { useMemo, useState } from 'react';
import type { ProcessedRepository, RepositoryOverlayData } from '@/app/data/repositories';
import { Card, SearchInput } from '@/components/atoms';
import { ChipDropdown } from '@/components/molecules';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from 'next-intl';
import { RepositoryList } from '../RepositoryList';
import { RepositoryOverlay } from '../RepositoryOverlay/RepositoryOverlay';

interface RepositoryViewProps {
  repositories: ProcessedRepository[];
  basePath: string;
  selectedRepository: RepositoryOverlayData | null;
  initialDelay?: number;
}

export function RepositoryView({
  repositories,
  basePath,
  selectedRepository,
  initialDelay = 0,
}: RepositoryViewProps) {
  const t = useTranslations('pages.projects');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const allLanguages = useMemo(() => {
    const languagesSet = new Set<string>();
    repositories.forEach((repository) => {
      repository.languages.forEach((language) => languagesSet.add(language));
    });
    return Array.from(languagesSet).sort();
  }, [repositories]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    repositories.forEach((repository) => {
      repository.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [repositories]);

  const clearLanguages = () => setSelectedLanguages([]);
  const clearTags = () => setSelectedTags([]);

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) => {
      const searchMatch =
        repository.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (repository.description?.toLowerCase() || '').includes(debouncedSearchTerm.toLowerCase());

      const languagesMatch =
        selectedLanguages.length === 0 ||
        selectedLanguages.every((language) => repository.languages.includes(language));

      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => repository.tags?.includes(tag));

      return searchMatch && languagesMatch && tagsMatch;
    });
  }, [repositories, debouncedSearchTerm, selectedLanguages, selectedTags]);

  const availableLanguages = useMemo(() => {
    const available = new Set<string>();
    filteredRepositories.forEach((repository) => repository.languages.forEach((language) => available.add(language)));
    return Array.from(available);
  }, [filteredRepositories]);

  const availableTags = useMemo(() => {
    const available = new Set<string>();
    filteredRepositories.forEach((repository) => repository.tags?.forEach((tag) => available.add(tag)));
    return Array.from(available);
  }, [filteredRepositories]);

  return (
    <>
      <Card
        className="flex flex-col sm:flex-row gap-4 items-start w-full z-2 backdrop-blur-sm bg-background/35 animate-fade-pop-in"
        style={{ animationDelay: `${initialDelay}s` }}
      >
        <div className="w-full grow">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('searchInput.placeholder')}
            className="animate-fade-pop-in"
            style={{ animationDelay: `${initialDelay + 0.1}s` }}
          />
        </div>

        <ChipDropdown
          options={allLanguages}
          availableOptions={availableLanguages}
          selectedOptions={selectedLanguages}
          onToggle={toggleLanguage}
          onClear={clearLanguages}
          label={t('languages')}
          className="animate-fade-pop-in"
          style={{ animationDelay: `${initialDelay + 0.2}s` }}
          chipColor="outline-primary"
        />

        <ChipDropdown
          options={allTags}
          availableOptions={availableTags}
          selectedOptions={selectedTags}
          onToggle={toggleTag}
          onClear={clearTags}
          label={t('topics')}
          className="animate-fade-pop-in"
          style={{ animationDelay: `${initialDelay + 0.2}s` }}
          chipColor="outline-secondary"
        />
      </Card>

      <RepositoryList
        repositories={filteredRepositories}
        selectedLanguages={selectedLanguages}
        selectedTags={selectedTags}
        basePath={basePath}
        animateCards={true}
      />

      {selectedRepository && <RepositoryOverlay repository={selectedRepository} basePath={basePath} />}
    </>
  );
}