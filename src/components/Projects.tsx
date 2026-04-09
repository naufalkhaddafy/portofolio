import React, { useState, useEffect } from 'react';
import { SectionBadge, ProjectCard } from './ui';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

type ProjectCategory = 'all' | 'website' | 'automation';

interface Project {
    images: string[];
    category: string;
    categoryColor: 'neon' | 'cyan' | 'purple';
    title?: string;
    description?: string;
    titleKey?: string;
    descKey?: string;
    link?: string;
    tab: ProjectCategory;
}

const projectsData: Project[] = [
    // Website Projects
    {
        images: ['/projects/esign-1.png'],
        category: 'SPFX REACT',
        categoryColor: 'neon',
        titleKey: 'p4-title',
        descKey: 'p4-desc',
        link: 'https://github.com/naufalkhaddafy',
        tab: 'website',
    },
    {
        images: ['/projects/kajianislamsangatta.png'],
        category: 'WEBSITE',
        categoryColor: 'neon',
        titleKey: 'p8-title',
        descKey: 'p8-desc',
        link: 'https://kajianislamsangatta.com/',
        tab: 'website',
    },
    {
        images: ['/projects/nafbf.png'],
        category: 'WEBSITE',
        categoryColor: 'purple',
        titleKey: 'p9-title',
        descKey: 'p9-desc',
        link: 'https://nafbf.codepai.my.id/',
        tab: 'website',
    },
    {
        images: ['/projects/quran-app.png'],
        category: 'WEBSITE',
        categoryColor: 'cyan',
        titleKey: 'p10-title',
        descKey: 'p10-desc',
        link: 'https://quran-app.kajianislamsangatta.com/',
        tab: 'website',
    },
    {
        images: ['https://placehold.co/600x400/111/6366f1?text=SPFx+Web+Parts'],
        category: 'SHAREPOINT',
        categoryColor: 'purple',
        titleKey: 'p2-title',
        descKey: 'p2-desc',
        tab: 'website',
    },
    // Automation Projects
    {
        images: ['https://placehold.co/600x400/111/06b6d4?text=eCopy+Automation'],
        category: 'AUTOMATION',
        categoryColor: 'cyan',
        titleKey: 'p1-title',
        descKey: 'p1-desc',
        tab: 'automation',
    },
    {
        images: ['https://placehold.co/600x400/111/a855f7?text=n8n+Workflow'],
        category: 'N8N',
        categoryColor: 'purple',
        titleKey: 'p6-title',
        descKey: 'p6-desc',
        tab: 'automation',
    },
    {
        images: ['https://placehold.co/600x400/111/6366f1?text=Power+Automate'],
        category: 'POWER AUTOMATE',
        categoryColor: 'neon',
        titleKey: 'p7-title',
        descKey: 'p7-desc',
        tab: 'automation',
    },
    {
        images: ['https://placehold.co/600x400/111/4ade80?text=Home+Lab+Server'],
        category: 'LINUX HOMELAB',
        categoryColor: 'cyan',
        titleKey: 'p3-title',
        descKey: 'p3-desc',
        tab: 'automation',
    },
];

const tabs = [
    { id: 'all' as ProjectCategory, label: 'ALL' },
    { id: 'website' as ProjectCategory, label: 'WEBSITE' },
    { id: 'automation' as ProjectCategory, label: 'AUTOMATION' },
];

export function Projects() {
    const [currentLang, setCurrentLang] = useState<Language>('id');
    const [activeTab, setActiveTab] = useState<ProjectCategory>('all');

    useEffect(() => {
        const handleLangChange = (e: CustomEvent<Language>) => {
            setCurrentLang(e.detail);
        };
        window.addEventListener('langchange', handleLangChange as EventListener);
        return () => window.removeEventListener('langchange', handleLangChange as EventListener);
    }, []);

    const filteredProjects = activeTab === 'all'
        ? projectsData
        : projectsData.filter(p => p.tab === activeTab);

    return (
        <section id="projects" className="py-20 md:py-32 relative px-6 bg-space/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gs-reveal-up">
                    <div className="w-full">
                        <SectionBadge number="04" label="SELECTED_WORKS" color="cyan" />
                        <h2 className="text-3xl md:text-6xl font-display font-bold">
                            {getTranslation(currentLang, 'projects-title')}
                        </h2>
                    </div>
                    <div className="hidden md:block w-32 h-[2px] bg-white/20"></div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 md:px-6 md:py-3 font-mono text-xs md:text-sm tracking-wider rounded-lg transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-cyan text-black font-bold'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {tab.label}
                            <span className="ml-2 text-[10px] opacity-60">
                                ({tab.id === 'all' ? projectsData.length : projectsData.filter(p => p.tab === tab.id).length})
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={`${project.title || project.titleKey}-${index}`}
                            className="gs-reveal-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <ProjectCard
                                images={project.images}
                                category={project.category}
                                categoryColor={project.categoryColor}
                                title={project.titleKey ? getTranslation(currentLang, project.titleKey) : project.title!}
                                description={project.descKey ? getTranslation(currentLang, project.descKey) : project.description!}
                                link={project.link}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
