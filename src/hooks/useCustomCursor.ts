import { useEffect, useRef } from 'react';

export function useCustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        const handleMouseMove = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            outline.animate(
                { left: `${posX}px`, top: `${posY}px` },
                { duration: 500, fill: 'forwards' }
            );
        };

        const handleMouseEnter = () => {
            if (outline) {
                outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                outline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
            if (dot) {
                dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            }
        };

        const handleMouseLeave = () => {
            if (outline) {
                outline.style.transform = 'translate(-50%, -50%) scale(1)';
                outline.style.backgroundColor = 'transparent';
            }
            if (dot) {
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Add hover effects to interactable elements
        const interactables = document.querySelectorAll('a, button, input, textarea');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactables.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return { dotRef, outlineRef };
}
