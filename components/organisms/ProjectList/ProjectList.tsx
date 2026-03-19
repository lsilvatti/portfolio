import { ProcessedProject } from "@/app/[locale]/(routes)/projects/page";
import { ProjectListCard } from "@/components/molecules";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectList({ projects, selectedLanguages, selectedTags }: {
    projects: ProcessedProject[];
    selectedLanguages: string[];
    selectedTags: string[];
}) {
    const t = useTranslations('pages.projects');

    if (projects.length === 0) {
        return (
            <div className="text-center flex flex-col text-neutral-500 py-10 gap-4">
                <SearchX size={48} className="mx-auto" />
                <p className="text-lg">{t('noResults')}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
            {projects.map((project) => {

                if(project.tags?.includes('hidden-from-portfolio')) {
                    return null;
                }

                let localizedDescription = project.description || '';
                if (t.has(`projects.${project.name}`)) {
                    localizedDescription = t(`projects.${project.name}`);
                }

                return (
                    <div key={project.name} className="break-inside-avoid inline-block w-full">
                        <ProjectListCard
                            title={project.name}
                            description={localizedDescription}
                            languages={project.languages}
                            tags={project.tags}
                            filteredLanguages={selectedLanguages}
                            filteredTags={selectedTags}
                        />
                    </div>
                );
            })}
        </div >
    )
}