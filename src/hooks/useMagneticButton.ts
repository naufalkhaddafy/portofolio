import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export function useMagneticButton() {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: 'power2.out',
            });

            const span = button.querySelector('span');
            if (span) {
                gsap.to(span, {
                    duration: 0.3,
                    x: x * 0.1,
                    y: y * 0.1,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: 'elastic.out(1, 0.3)',
            });

            const span = button.querySelector('span');
            if (span) {
                gsap.to(span, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: 'elastic.out(1, 0.3)',
                });
            }
        };

        button.addEventListener('mousemove', handleMouseMove as EventListener);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove as EventListener);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return buttonRef;
}
