import React from 'react';
import { SectionBadge, SkillCard } from './ui';

const skillsData = {
    frontend: {
        title: 'FRONTEND',
        icon: 'fas fa-code',
        iconColor: 'text-cyan',
        skills: [
            { icon: 'fab fa-react', label: 'React', delay: 1 as const },
            { icon: 'fab fa-js', label: 'JavaScript', delay: 2 as const },
            { icon: 'fab fa-html5', label: 'HTML5', delay: 3 as const },
            { icon: 'fab fa-css3-alt', label: 'CSS3', delay: 4 as const },
            { icon: 'img:/icons/tailwind.svg', label: 'Tailwind', delay: 2 as const },
            { icon: 'fab fa-bootstrap', label: 'Bootstrap', delay: 1 as const },
            { icon: 'fab fa-vuejs', label: 'Vite', delay: 3 as const },
            { icon: 'fab fa-sass', label: 'SCSS', delay: 4 as const },
        ],
    },
    backend: {
        title: 'BACKEND',
        icon: 'fas fa-server',
        iconColor: 'text-neon',
        skills: [
            { icon: 'fab fa-node-js', label: 'Node.js', delay: 3 as const },
            { icon: 'fab fa-php', label: 'PHP', delay: 1 as const },
            { icon: 'fab fa-laravel', label: 'Laravel', delay: 4 as const },
            { icon: 'fas fa-database', label: 'MySQL', delay: 2 as const },
            { icon: 'fas fa-leaf', label: 'MongoDB', delay: 1 as const },
            { icon: 'fab fa-git-alt', label: 'Git', delay: 3 as const },
            { icon: 'fab fa-linux', label: 'Ubuntu', delay: 4 as const },
            { icon: 'img:/icons/nginx.svg', label: 'Nginx', delay: 2 as const },
        ],
    },
    automation: {
        title: 'AUTOMATION',
        icon: 'fas fa-robot',
        iconColor: 'text-purple-500',
        skills: [
            { icon: 'img:/icons/n8n.svg', label: 'n8n', delay: 2 as const },
            { icon: 'img:/icons/automate.png', label: 'Power Automate', delay: 4 as const },
            { icon: 'img:/icons/powerbi.svg', label: 'Power BI', delay: 1 as const },
            { icon: 'fab fa-microsoft', label: 'SPFx', delay: 3 as const },
            { icon: 'img:/icons/sharepoint.svg', label: 'SharePoint', delay: 2 as const },
            { icon: 'fas fa-file-alt', label: 'eCopy', delay: 1 as const },
        ],
    },
};

export function Skills() {
    return (
        <section id="skills" className="py-20 md:py-24 relative px-6 bg-space/30">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16 gs-reveal-up">
                    <SectionBadge number="02" label="TECH_ARSENAL" color="neon" />
                    <h2 className="text-3xl md:text-5xl font-display font-bold">CORE ABILITIES</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="gs-reveal-up">
                        <SkillCard {...skillsData.frontend} />
                    </div>
                    <div className="gs-reveal-up" style={{ animationDelay: '100ms' }}>
                        <SkillCard {...skillsData.backend} />
                    </div>
                    <div className="gs-reveal-up" style={{ animationDelay: '200ms' }}>
                        <SkillCard {...skillsData.automation} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
