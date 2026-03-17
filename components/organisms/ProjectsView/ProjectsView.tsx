'use client';

import { useState, useMemo } from 'react';
import type { ProcessedProject } from '@/app/[locale]/(routes)/projects/page';
import { Card, SearchInput } from '@/components/atoms';
import { ChipDropdown } from '@/components/molecules';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from 'next-intl';
import { ProjectList } from '../ProjectList';

interface ProjectsViewProps {
  projects: ProcessedProject[];
  initialDelay?: number;
}

export function ProjectsView({ projects, initialDelay = 0 }: ProjectsViewProps) {
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
    projects.forEach((project) => {
      project.languages.forEach((language) => languagesSet.add(language));
    });
    return Array.from(languagesSet).sort();
  }, [projects]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [projects]);

  const clearLanguages = () => setSelectedLanguages([]);
  const clearTags = () => setSelectedTags([]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch =
        project.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (project.description?.toLowerCase() || '').includes(debouncedSearchTerm.toLowerCase());

      const languagesMatch =
        selectedLanguages.length === 0 ||
        selectedLanguages.every((language) => project.languages.includes(language));

      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags?.includes(tag));

      return searchMatch && languagesMatch && tagsMatch;
    });
  }, [projects, debouncedSearchTerm, selectedLanguages, selectedTags]);

  const availableLanguages = useMemo(() => {
    const available = new Set<string>();
    filteredProjects.forEach(p => p.languages.forEach(l => available.add(l)));
    return Array.from(available);
  }, [filteredProjects]);

  const availableTags = useMemo(() => {
    const available = new Set<string>();
    filteredProjects.forEach(p => p.tags?.forEach(t => available.add(t)));
    return Array.from(available);
  }, [filteredProjects]);

  return (
    <>
      <Card className="flex flex-col sm:flex-row gap-4 items-start w-full animate-fade-pop-in z-2 backdrop-blur-sm bg-background/35" style={{ animationDelay: `${initialDelay}s` }}>
        <div className="w-full grow">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('searchInput.placeholder')}
            className='animate-fade-pop-in'
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
          className='animate-fade-pop-in'
          style={{ animationDelay: `${initialDelay + 0.2}s` }}
          chipColor="outline-primary"
        />

        <ChipDropdown
          options={allTags}
          availableOptions={availableTags}
          selectedOptions={selectedTags}
          onToggle={toggleTag}
          onClear={clearTags}
          label={t('technologies')}
          className='animate-fade-pop-in'
          style={{ animationDelay: `${initialDelay + 0.2}s` }}
          chipColor="outline-secondary"
        />
      </Card>

      <ProjectList 
        projects={filteredProjects}
        selectedLanguages={selectedLanguages}
        selectedTags={selectedTags}
        toggleLanguage={toggleLanguage}
        toggleTag={toggleTag}
      />
    </>
  );
}