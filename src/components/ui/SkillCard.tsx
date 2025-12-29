import React from 'react';

interface SkillIconProps {
    icon: string;
    label: string;
    delay?: 1 | 2 | 3 | 4;
}

export function SkillIcon({ icon, label, delay = 1 }: SkillIconProps) {
    return (
        <div className={`skill-item delay-${delay}`}>
            <i className={icon}></i>
            <span>{label}</span>
        </div>
    );
}

interface SkillCardProps {
    title: string;
    icon: string;
    iconColor: string;
    skills: Array<{ icon: string; label: string; delay?: 1 | 2 | 3 | 4 }>;
}

export function SkillCard({ title, icon, iconColor, skills }: SkillCardProps) {
    return (
        <div className="holo-card p-6 md:p-8 rounded-xl interactive-card" data-tilt>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg md:text-xl font-bold font-display text-white">{title}</h3>
                <i className={`${icon} ${iconColor} opacity-50`}></i>
            </div>
            <div className={`skill-grid ${iconColor}`}>
                {skills.map((skill, index) => (
                    <SkillIcon key={index} {...skill} />
                ))}
            </div>
        </div>
    );
}
