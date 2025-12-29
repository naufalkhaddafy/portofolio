import React from 'react';
import { SectionBadge, TimelineItem } from './ui';

const experienceData = [
    {
        title: 'IT Support & Data Center Operations',
        period: 'SEP 2024 - PRESENT',
        company: 'PT. BERCA HARDAYA PERKASA • Project at PT Kaltim Prima Coal',
        description:
            'Started as Desktop Support Engineer handling hardware/software troubleshooting. Currently managing Data Center Operations including Active Directory, Microsoft 365, Veeam backup, and infrastructure monitoring.',
        color: 'neon' as const,
        isActive: true,
    },
    {
        title: 'System Engineer',
        period: 'MAY 2024 - SEP 2024',
        company: 'PT. PERMATA INDONESIA (ASTRAGRAPHIA) • Project at PT Kaltim Prima Coal',
        description:
            'Configuring eCopy system for document scanning automation workflow. Managing SharePoint document management. Creating automation using n8n and Power Automate. Developing SPFx web parts.',
        color: 'cyan' as const,
        isActive: false,
    },
    {
        title: 'Freelance Web Developer',
        period: 'APR 2024 - MAY 2024',
        company: 'EAST KUTAI, INDONESIA',
        description:
            'Engaged with clients to gather requirements and deliver solutions. Created interactive and responsive web applications with databases and server infrastructure.',
        color: 'purple' as const,
        isActive: false,
    },
    {
        title: 'Fullstack Developer Intern',
        period: 'JUL 2023 - OCT 2023',
        company: 'PT. META MATA INDONESIA',
        description:
            'Slicing UI/UX designs to responsive web pages. Developed features using Laravel and MySQL. Performed feature testing for smooth operation.',
        color: 'cyan' as const,
        isActive: false,
    },
];

export function Experience() {
    return (
        <section id="experience" className="py-20 md:py-24 relative px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 md:mb-16 text-left md:text-right gs-reveal-up">
                    <SectionBadge number="03" label="MISSION_LOGS" color="purple" />
                    <h2 className="text-3xl md:text-5xl font-display font-bold">EXPERIENCE</h2>
                </div>

                <div className="relative timeline-line pl-6 md:pl-8 space-y-12">
                    {experienceData.map((exp, index) => (
                        <div key={index} className="gs-reveal-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <TimelineItem {...exp} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
