'use client';

import { useMemo, useState } from 'react';
import type { LocalizedFreelanceProject } from '@/app/data/freelance-projects';
import { Card, Link, SearchInput, Typography } from '@/components/atoms';
import { ChipDropdown, FreelanceProjectCard } from '@/components/molecules';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchX } from 'lucide-react';
import { FreelanceOverlay } from '../FreelanceOverlay/FreelanceOverlay';

interface FreelanceProjectsViewProps {
  projects: LocalizedFreelanceProject[];
  selectedProject: LocalizedFreelanceProject | null;
  basePath: string;
  technologiesLabel: string;
  highlightsLabel: string;
  projectUrlLabel: string;
  repositoryUrlLabel: string;
  searchPlaceholder: string;
  noResults: string;
  closeOverlayLabel: string;
  backToTopLabel: string;
  previousImageLabel: string;
  nextImageLabel: string;
}

export function FreelanceProjectsView({
  projects,
  selectedProject,
  basePath,
  technologiesLabel,
  highlightsLabel,
  projectUrlLabel,
  repositoryUrlLabel,
  searchPlaceholder,
  noResults,
  closeOverlayLabel,
  backToTopLabel,
  previousImageLabel,
  nextImageLabel,
}: FreelanceProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const allTechnologies = useMemo(() => {
    const technologySet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((technology) => technologySet.add(technology));
    });
    return Array.from(technologySet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const text = `${project.title} ${project.summary} ${project.highlights.join(' ')}`.toLowerCase();
      const searchMatch = text.includes(debouncedSearchTerm.toLowerCase());

      const technologiesMatch =
        selectedTechnologies.length === 0 ||
        selectedTechnologies.every((technology) => project.technologies.includes(technology));

      return searchMatch && technologiesMatch;
    });
  }, [projects, debouncedSearchTerm, selectedTechnologies]);

  const availableTechnologies = useMemo(() => {
    const available = new Set<string>();
    filteredProjects.forEach((project) => {
      project.technologies.forEach((technology) => available.add(technology));
    });
    return Array.from(available);
  }, [filteredProjects]);

  const toggleTechnology = (technology: string) => {
    setSelectedTechnologies((previous) =>
      previous.includes(technology)
        ? previous.filter((item) => item !== technology)
        : [...previous, technology]
    );
  };

  return (
    <>
      <Card className="flex flex-col sm:flex-row gap-4 items-start w-full animate-fade-pop-in z-2 backdrop-blur-sm bg-background/35">
        <div className="w-full grow">
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} />
        </div>

        <ChipDropdown
          options={allTechnologies}
          availableOptions={availableTechnologies}
          selectedOptions={selectedTechnologies}
          onToggle={toggleTechnology}
          onClear={() => setSelectedTechnologies([])}
          label={technologiesLabel}
          style={{}}
          chipColor="outline-secondary"
        />
      </Card>

      {filteredProjects.length === 0 ? (
        <div className="text-center flex flex-col text-neutral-500 py-10 gap-4">
          <SearchX size={48} className="mx-auto" />
          <Typography variant="body">{noResults}</Typography>
        </div>
      ) : (
        <section className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`${basePath}?project=${encodeURIComponent(project.id)}`}
              className="w-full"
            >
              <div
                className="animate-fade-up"
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <FreelanceProjectCard
                  title={project.title}
                  summary={project.summary}
                  highlights={project.highlights}
                  technologies={project.technologies}
                  listImageSrc={project.listImage.src}
                  listImageAlt={project.listImage.alt}
                  technologiesLabel={technologiesLabel}
                  highlightsLabel={highlightsLabel}
                  projectUrl={project.projectUrl}
                  repositoryUrl={project.repositoryUrl}
                  projectUrlLabel={projectUrlLabel}
                  repositoryUrlLabel={repositoryUrlLabel}
                  showLinks={false}
                />
              </div>
            </Link>
          ))}
        </section>
      )}

      {selectedProject && (
        <FreelanceOverlay
          project={selectedProject}
          basePath={basePath}
          closeLabel={closeOverlayLabel}
          backToTopLabel={backToTopLabel}
          technologiesLabel={technologiesLabel}
          highlightsLabel={highlightsLabel}
          projectUrlLabel={projectUrlLabel}
          repositoryUrlLabel={repositoryUrlLabel}
          previousImageLabel={previousImageLabel}
          nextImageLabel={nextImageLabel}
        />
      )}
    </>
  );
}
