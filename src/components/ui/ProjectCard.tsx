import React, { useState } from 'react';

interface ProjectCardProps {
    images: string[];
    category: string;
    categoryColor?: 'neon' | 'cyan' | 'purple';
    title: string;
    description: string;
    link?: string;
    techStack?: string[];
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
    images,
    category,
    categoryColor = 'neon',
    title,
    description,
    link,
    techStack,
}: ProjectCardProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="holo-card group rounded-xl overflow-hidden relative">
            <div className="h-48 md:h-64 overflow-hidden relative">
                <div
                    className={`absolute inset-0 ${overlayColors[categoryColor]} mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition duration-500`}
                />
                <img
                    src={images[currentImage]}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    alt={`${title} - ${currentImage + 1}`}
                />

                {/* Image Navigation - show only if multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <i className="fas fa-chevron-left text-sm"></i>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <i className="fas fa-chevron-right text-sm"></i>
                        </button>

                        {/* Image Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? 'bg-cyan w-4' : 'bg-white/50 hover:bg-white'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <span
                        className={`text-[10px] md:text-xs font-mono border ${colorClasses[categoryColor]} px-2 py-1 rounded`}
                    >
                        {category}
                    </span>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/50 hover:text-cyan transition"
                        >
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan transition">
                    {title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">{description}</p>

                {techStack && techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {techStack.map((tech, i) => (
                            <span 
                                key={i} 
                                className="text-[10px] md:text-[11px] font-mono text-cyan bg-cyan/5 border border-cyan/20 px-2 py-1 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-xs font-mono text-cyan hover:text-white border border-cyan/50 px-3 py-2 rounded hover:bg-cyan/20 transition-all"
                    >
                        VIEW PROJECT
                    </a>
                )}
            </div>
        </div>
    );
}
