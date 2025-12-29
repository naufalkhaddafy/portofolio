'use client';

import React, { useEffect } from 'react';
import { useThreeBackground } from '../hooks/useThreeBackground';
import { useCustomCursor } from '../hooks/useCustomCursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function BackgroundCanvas() {
    const canvasRef = useThreeBackground();

    return <canvas ref={canvasRef} id="bg-canvas" />;
}

export function CustomCursor() {
    const { dotRef, outlineRef } = useCustomCursor();

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={outlineRef} className="cursor-outline" />
        </>
    );
}

export function GSAPAnimations() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Initial hero animations
        const tl = gsap.timeline();
        tl.from('.hero-anim', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
        });

        // Scroll reveal animations
        gsap.utils.toArray('.gs-reveal-up').forEach((elem: any) => {
            gsap.from(elem, {
                scrollTrigger: { trigger: elem, start: 'top 90%' },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        });

        gsap.from('.gs-reveal-left', {
            scrollTrigger: { trigger: '#about', start: 'top 80%' },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.from('.gs-reveal-right', {
            scrollTrigger: { trigger: '#about', start: 'top 80%' },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
        });

        gsap.from('.gs-reveal-scale', {
            scrollTrigger: { trigger: '#contact', start: 'top 85%' },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return null;
}
