import React from 'react';

interface SectionBadgeProps {
    number: string;
    label: string;
    color?: 'cyan' | 'neon' | 'purple';
}

const colorClasses = {
    cyan: 'text-cyan',
    neon: 'text-neon',
    purple: 'text-purple-500',
};

export function SectionBadge({ number, label, color = 'cyan' }: SectionBadgeProps) {
    return (
        <h4 className={`${colorClasses[color]} font-mono mb-2 text-sm tracking-widest`}>
            {number} // {label}
        </h4>
    );
}
