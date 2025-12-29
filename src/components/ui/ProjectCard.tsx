import React from 'react';

interface ProjectCardProps {
    image: string;
    category: string;
    categoryColor?: 'neon' | 'cyan' | 'purple';
    title: string;
    description: string;
    link?: string;
}

const colorClasses = {
    neon: 'border-neon text-neon',
    cyan: 'border-cyan text-cyan',
    purple: 'border-purple-500 text-purple-500',
};

const overlayColors = {
    neon: 'bg-neon/20',
    cyan: 'bg-cyan/20',
    purple: 'bg-purple-500/20',
};

export function ProjectCard({
    image,
    category,
    categoryColor = 'neon',
    title,
    description,
    link,
}: ProjectCardProps) {
    const Wrapper = link ? 'a' : 'div';
    const wrapperProps = link ? { href: link } : {};

    return (
        <div className="holo-card group rounded-xl overflow-hidden relative">
            <div className="h-48 md:h-64 overflow-hidden relative">
                <div
                    className={`absolute inset-0 ${overlayColors[categoryColor]} mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition duration-500`}
                />
                <img
                    src={image}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    alt={title}
                />
            </div>
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <span
                        className={`text-[10px] md:text-xs font-mono border ${colorClasses[categoryColor]} px-2 py-1 rounded`}
                    >
                        {category}
                    </span>
                    <i className="fas fa-arrow-up-right text-white/50 group-hover:text-white transition"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan transition">
                    {title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">{description}</p>
            </div>
        </div>
    );
}
