import React, { useState, useEffect } from 'react';
import { SectionBadge, ProjectCard } from './ui';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

const projectsData = [
    {
        image: 'https://placehold.co/600x400/111/06b6d4?text=eCopy+Automation',
        category: 'AUTOMATION',
        categoryColor: 'neon' as const,
        titleKey: 'p1-title',
        descKey: 'p1-desc',
    },
    {
        image: 'https://placehold.co/600x400/111/6366f1?text=SPFx+Web+Parts',
        category: 'SHAREPOINT',
        categoryColor: 'cyan' as const,
        titleKey: 'p2-title',
        descKey: 'p2-desc',
    },
    {
        image: 'https://placehold.co/600x400/111/a855f7?text=n8n+Workflow',
        category: 'WORKFLOW',
        categoryColor: 'purple' as const,
        title: 'n8n Automation Workflow',
        description: 'Automated business processes using n8n and Power Automate integration.',
    },
];

export function Projects() {
    const [currentLang, setCurrentLang] = useState<Language>('id');

    useEffect(() => {
        const handleLangChange = (e: CustomEvent<Language>) => {
            setCurrentLang(e.detail);
        };
        window.addEventListener('langchange', handleLangChange as EventListener);
        return () => window.removeEventListener('langchange', handleLangChange as EventListener);
    }, []);

    return (
        <section id="projects" className="py-20 md:py-32 relative px-6 bg-space/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gs-reveal-up">
                    <div className="w-full">
                        <SectionBadge number="04" label="SELECTED_WORKS" color="cyan" />
                        <h2 className="text-3xl md:text-6xl font-display font-bold">
                            {getTranslation(currentLang, 'projects-title')}
                        </h2>
                    </div>
                    <div className="hidden md:block w-32 h-[2px] bg-white/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projectsData.map((project, index) => (
                        <div key={index} className="gs-reveal-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <ProjectCard
                                image={project.image}
                                category={project.category}
                                categoryColor={project.categoryColor}
                                title={project.titleKey ? getTranslation(currentLang, project.titleKey) : project.title!}
                                description={project.descKey ? getTranslation(currentLang, project.descKey) : project.description!}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
