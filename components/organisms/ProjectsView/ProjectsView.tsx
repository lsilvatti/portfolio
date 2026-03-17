'use client';

import { useState, useMemo } from 'react';
import type { ProcessedProject } from '@/app/[locale]/(routes)/projects/page';
import { Card, SearchInput } from '@/components/atoms';
import { ChipDropdown, ProjectCard, } from '@/components/molecules';
import { useDebounce } from '@/hooks/useDebounce'; // Importe o novo hook
import { useTranslations } from 'next-intl';

interface ProjectsViewProps {
  projects: ProcessedProject[];
  initialDelay?: number;
}

export function ProjectsView({ projects, initialDelay = 0 }: ProjectsViewProps) {
  const t = useTranslations('pages.projects');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    projects.forEach((project) => {
      project.topics.forEach((topic) => topicsSet.add(topic));
    });
    return Array.from(topicsSet).sort();
  }, [projects]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const clearTopics = () => setSelectedTopics([]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch =
        project.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (project.description?.toLowerCase() || '').includes(debouncedSearchTerm.toLowerCase());

      const topicsMatch =
        selectedTopics.length === 0 ||
        selectedTopics.every((topic) => project.topics.includes(topic));

      return searchMatch && topicsMatch;
    });
  }, [projects, debouncedSearchTerm, selectedTopics]);




  return (
    <>
    <Card className="flex flex-col sm:flex-row gap-4 items-start w-full animate-fade-pop-in z-2" style={{ animationDelay: `${initialDelay}s` }}>
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
        options={allTopics}
        selectedOptions={selectedTopics}
        onToggle={toggleTopic}
        onClear={clearTopics}
        label={t('chipDropdown.label')}
        className='animate-fade-pop-in'
        style={{ animationDelay: `${initialDelay + 0.2}s` }}
      />
    </Card>

    <div className="flex flex-col gap-8">


      {filteredProjects.length === 0 ? (
        <div className="text-center text-neutral-500 py-10">
          {t('noResults')}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 gap-6 space-y-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              title={project.name}
              description={project.description || ''}
              languages={project.languages}
              tags={project.tags}
              />

          ))}
        </div>
      )}
    </div >
  </>
  );
}