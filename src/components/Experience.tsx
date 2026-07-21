import React, { useState, useEffect } from 'react';
import { SectionBadge, TimelineItem } from './ui';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

interface ExperienceItem {
    titleKey: string;
    periodKey: string;
    companyKey: string;
    descKey: string;
    color: 'neon' | 'cyan' | 'purple';
    isActive: boolean;
}

const experienceData: ExperienceItem[] = [
    {
        titleKey: 'exp-1-title',
        periodKey: 'exp-1-period',
        companyKey: 'exp-1-company',
        descKey: 'exp-1-desc',
        color: 'green',
        isActive: true,
    },
    {
        titleKey: 'exp-2-title',
        periodKey: 'exp-2-period',
        companyKey: 'exp-2-company',
        descKey: 'exp-2-desc',
        color: 'cyan',
        isActive: false,
    },
    {
        titleKey: 'exp-3-title',
        periodKey: 'exp-3-period',
        companyKey: 'exp-3-company',
        descKey: 'exp-3-desc',
        color: 'purple',
        isActive: false,
    },
    {
        titleKey: 'exp-4-title',
        periodKey: 'exp-4-period',
        companyKey: 'exp-4-company',
        descKey: 'exp-4-desc',
        color: 'cyan',
        isActive: false,
    },
];

export function Experience() {
    const [currentLang, setCurrentLang] = useState<Language>('id');

    useEffect(() => {
        const handleLangChange = (e: CustomEvent<Language>) => {
            setCurrentLang(e.detail);
        };
        window.addEventListener('langchange', handleLangChange as EventListener);
        return () => window.removeEventListener('langchange', handleLangChange as EventListener);
    }, []);

    return (
        <section id="experience" className="py-20 md:py-24 relative px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 md:mb-16 text-left md:text-right gs-reveal-up">
                    <SectionBadge number="03" label="MISSION_LOGS" color="purple" />
                    <h2 className="text-3xl md:text-5xl font-display font-bold">
                        {getTranslation(currentLang, 'experience-title')}
                    </h2>
                </div>

                <div className="relative timeline-line pl-6 md:pl-8 space-y-12">
                    {experienceData.map((exp, index) => (
                        <div key={index} className="gs-reveal-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <TimelineItem 
                                title={getTranslation(currentLang, exp.titleKey)}
                                period={getTranslation(currentLang, exp.periodKey)}
                                company={getTranslation(currentLang, exp.companyKey)}
                                description={getTranslation(currentLang, exp.descKey)}
                                color={exp.color}
                                isActive={exp.isActive}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
