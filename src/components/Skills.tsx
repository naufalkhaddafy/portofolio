import React from 'react';
import { SectionBadge, SkillCard } from './ui';

const skillsData = [
    {
        title: 'FRONTEND DEVELOPMENT',
        icon: 'fas fa-code',
        iconColor: 'text-cyan',
        skills: [
            { icon: 'fab fa-react', label: 'React', delay: 1 as const },
            { icon: 'fab fa-js', label: 'JavaScript', delay: 2 as const },
            { icon: 'fab fa-html5', label: 'HTML5 & CSS3', delay: 3 as const },
            { icon: 'img:/icons/tailwind.svg', label: 'Tailwind CSS', delay: 4 as const },
            { icon: 'fab fa-bootstrap', label: 'Bootstrap', delay: 1 as const },
            { icon: 'fab fa-vuejs', label: 'Vite', delay: 2 as const },
            { icon: 'fab fa-sass', label: 'SCSS', delay: 3 as const },
        ],
    },
    {
        title: 'BACKEND DEVELOPMENT',
        icon: 'fas fa-server',
        iconColor: 'text-neon',
        skills: [
            { icon: 'fab fa-node-js', label: 'Node.js', delay: 1 as const },
            { icon: 'fab fa-php', label: 'PHP', delay: 2 as const },
            { icon: 'fab fa-laravel', label: 'Laravel', delay: 3 as const },
            { icon: 'fab fa-golang', label: 'Golang', delay: 4 as const },
            { icon: 'fab fa-python', label: 'Python', delay: 1 as const },
        ],
    },
    {
        title: 'DATABASES',
        icon: 'fas fa-database',
        iconColor: 'text-red-500',
        skills: [
            { icon: 'fas fa-database', label: 'MySQL', delay: 1 as const },
            { icon: 'fas fa-database', label: 'PostgreSQL', delay: 2 as const },
            { icon: 'fas fa-database', label: 'SQL Server', delay: 3 as const },
            { icon: 'fas fa-leaf', label: 'MongoDB', delay: 4 as const },
        ],
    },
    {
        title: 'DEVOPS & CONTAINERS',
        icon: 'fas fa-cogs',
        iconColor: 'text-purple-500',
        skills: [
            { icon: 'fab fa-docker', label: 'Docker', delay: 1 as const },
            { icon: 'fas fa-box-open', label: 'Portainer', delay: 2 as const },
            { icon: 'fab fa-git-alt', label: 'Git', delay: 3 as const },
            { icon: 'fab fa-github', label: 'GitHub Actions', delay: 4 as const },
        ],
    },
    {
        title: 'BUSINESS AUTOMATION',
        icon: 'fas fa-robot',
        iconColor: 'text-orange-500',
        skills: [
            { icon: 'img:/icons/n8n.svg', label: 'n8n', delay: 1 as const },
            { icon: 'img:/icons/automate.png', label: 'Power Automate', delay: 2 as const },
            { icon: 'img:/icons/powerbi.svg', label: 'Power BI', delay: 3 as const },
            { icon: 'img:/icons/sharepoint.svg', label: 'SharePoint', delay: 4 as const },
            { icon: 'fab fa-microsoft', label: 'SPFx', delay: 1 as const },
            { icon: 'fas fa-file-alt', label: 'eCopy', delay: 2 as const },
        ],
    },
    {
        title: 'CLOUD & INFRASTRUCTURE',
        icon: 'fas fa-network-wired',
        iconColor: 'text-blue-400',
        skills: [
            { icon: 'fab fa-google', label: 'GCP', delay: 1 as const },
            { icon: 'fas fa-server', label: 'VMware vSphere', delay: 2 as const },
            { icon: 'fas fa-sitemap', label: 'vCenter', delay: 3 as const },
            { icon: 'fab fa-linux', label: 'Ubuntu Linux', delay: 4 as const },
            { icon: 'img:/icons/nginx.svg', label: 'Nginx', delay: 1 as const },
            { icon: 'fab fa-windows', label: 'Windows Server', delay: 2 as const },
        ],
    },
    {
        title: 'STORAGE SYSTEMS',
        icon: 'fas fa-hdd',
        iconColor: 'text-emerald-400',
        skills: [
            { icon: 'fas fa-hdd', label: 'HPE 3PAR', delay: 1 as const },
            { icon: 'fas fa-server', label: 'HPE MSA 2060', delay: 2 as const },
            { icon: 'fas fa-tape', label: 'HPE MSL 3040', delay: 3 as const },
            { icon: 'fas fa-terminal', label: 'Nimble CLI', delay: 4 as const },
        ],
    },
    {
        title: 'DATA PROTECTION',
        icon: 'fas fa-life-ring',
        iconColor: 'text-rose-400',
        skills: [
            { icon: 'fas fa-life-ring', label: 'Veeam B&R', delay: 1 as const },
            { icon: 'fas fa-tape', label: 'Tape Backup', delay: 2 as const },
            { icon: 'fas fa-history', label: 'Storage Snapshots', delay: 3 as const },
        ],
    },
    {
        title: 'IDENTITY & SECURITY',
        icon: 'fas fa-shield-alt',
        iconColor: 'text-yellow-400',
        skills: [
            { icon: 'fab fa-windows', label: 'Active Directory', delay: 1 as const },
            { icon: 'fab fa-microsoft', label: 'Microsoft 365', delay: 2 as const },
            { icon: 'fas fa-users-cog', label: 'ADManager Plus', delay: 3 as const },
            { icon: 'fas fa-user-shield', label: 'ADAudit Plus', delay: 4 as const },
            { icon: 'fas fa-chart-line', label: 'Zabbix', delay: 1 as const },
            { icon: 'fas fa-shield-virus', label: 'CrowdStrike', delay: 2 as const },
        ],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-20 md:py-24 relative px-6 bg-space/30">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16 gs-reveal-up">
                    <SectionBadge number="02" label="TECH_ARSENAL" color="neon" />
                    <h2 className="text-3xl md:text-5xl font-display font-bold">CORE ABILITIES</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {skillsData.map((category, idx) => (
                        <div key={idx} className="gs-reveal-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <SkillCard {...category} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
