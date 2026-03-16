'use client';

import { useState, useMemo } from 'react';
import type { ProcessedProject } from '@/app/[locale]/(routes)/projects/page';
import { Card, SearchInput } from '@/components/atoms';
import { ChipDropdown,  } from '@/components/molecules';
import { useDebounce } from '@/hooks/useDebounce'; // Importe o novo hook

interface ProjectsViewProps {
  projects: ProcessedProject[];
}

export function ProjectsView({ projects }: ProjectsViewProps) {
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
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col sm:flex-row gap-4 items-start full-width">
        <div className="w-full grow">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar repositório por nome ou descrição..." 
          />
        </div>

        <ChipDropdown
          options={allTopics}
          selectedOptions={selectedTopics}
          onToggle={toggleTopic}
          onClear={clearTopics}
          label="Tecnologias"
        />
      </Card>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-neutral-500 py-10">
          Nenhum projeto encontrado com estes filtros.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
             <div key={project.name} className="flex flex-col border border-neutral-800 bg-neutral-900/50 rounded-lg p-5 transition-colors hover:border-neutral-600">
               <h3 className="text-xl font-bold text-white capitalize">{project.name.replace(/-/g, ' ')}</h3>
               <p className="text-sm text-neutral-400 mb-4">{project.description}</p>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}