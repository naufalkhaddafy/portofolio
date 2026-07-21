import React from 'react';

interface TimelineItemProps {
    title: string;
    period: string;
    company: string;
    description: string;
    color?: 'neon' | 'cyan' | 'purple' | 'green';
    isActive?: boolean;
}

const colorClasses = {
    neon: 'border-neon',
    cyan: 'border-cyan',
    purple: 'border-purple-500',
    green: 'border-green-500',
};

const dotColorClasses = {
    neon: 'bg-neon',
    cyan: 'bg-cyan',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
};

const textColorClasses = {
    neon: 'text-neon',
    cyan: 'text-cyan',
    purple: 'text-purple-500',
    green: 'text-green-500',
};

export function TimelineItem({
    title,
    period,
    company,
    description,
    color = 'neon',
    isActive = false,
}: TimelineItemProps) {
    return (
        <div className="relative">
            <div
                className={`absolute -left-5 md:-left-8 top-0 w-6 h-6 md:w-8 md:h-8 bg-space border-2 ${isActive ? colorClasses[color] : 'border-white/20'} rounded-full flex items-center justify-center z-10 transition-colors duration-500`}
            >
                <div
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 ${isActive ? dotColorClasses[color] : 'bg-white/20'} rounded-full ${isActive ? 'animate-pulse' : ''}`}
                />
            </div>
            <div
                className={`holo-card ml-4 md:ml-6 p-5 md:p-6 rounded-xl hover:${colorClasses[color].replace('border', 'border')}/50 transition duration-300`}
            >
                <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
                    <span className={`${textColorClasses[color]} font-mono text-xs md:text-sm mt-1 md:mt-0`}>
                        {period}
                    </span>
                </div>
                <h4 className="text-gray-400 mb-3 font-mono text-xs md:text-sm">{company}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
