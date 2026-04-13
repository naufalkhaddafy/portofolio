import React, { useState } from 'react';
import { createPortal } from 'react-dom';

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
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
            <div 
                className="h-48 md:h-64 overflow-hidden relative cursor-pointer"
                onClick={() => setIsPreviewOpen(true)}
            >
                <div
                    className={`absolute inset-0 ${overlayColors[categoryColor]} mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition duration-500`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-500 z-10 pointer-events-none" />
                <img
                    src={images[currentImage]}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    alt={`${title} - ${currentImage + 1}`}
                />

                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPreviewOpen(true);
                        }}
                        className="text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-110 pointer-events-auto"
                        title="Preview Image"
                    >
                        <i className="fas fa-expand text-4xl md:text-5xl drop-shadow-xl"></i>
                    </button>
                </div>

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

            {isPreviewOpen && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPreviewOpen(false);
                    }}
                >
                    <button 
                        className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white z-50 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPreviewOpen(false);
                        }}
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center pointer-events-none">
                        <img 
                            src={images[currentImage]} 
                            alt={`${title} Preview`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg pointer-events-auto shadow-2xl ring-1 ring-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
                                    }}
                                    className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-opacity pointer-events-auto"
                                >
                                    <i className="fas fa-chevron-left md:text-xl"></i>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImage((prev) => (prev + 1) % images.length);
                                    }}
                                    className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-opacity pointer-events-auto"
                                >
                                    <i className="fas fa-chevron-right md:text-xl"></i>
                                </button>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
