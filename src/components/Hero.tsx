import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

// Text Scramble Effect Class
class TextScramble {
    el: HTMLElement;
    chars: string = '!<>-_\\/[]{}—=+*^?#________';
    queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
    frame: number = 0;
    frameRequest: number = 0;
    resolve!: () => void;

    constructor(el: HTMLElement) {
        this.el = el;
        this.update = this.update.bind(this);
    }

    setText(newText: string): Promise<void> {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="text-neon/50">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

interface HeroProps {
    onChatToggle?: () => void;
}

export function Hero({ onChatToggle }: HeroProps) {
    const [currentLang, setCurrentLang] = useState<Language>('id');
    const scramble1Ref = useRef<HTMLSpanElement>(null);
    const scramble2Ref = useRef<HTMLSpanElement>(null);
    const fx1Ref = useRef<TextScramble | null>(null);
    const fx2Ref = useRef<TextScramble | null>(null);

    useEffect(() => {
        const handleLangChange = (e: CustomEvent<Language>) => {
            setCurrentLang(e.detail);
        };
        window.addEventListener('langchange', handleLangChange as EventListener);
        return () => window.removeEventListener('langchange', handleLangChange as EventListener);
    }, []);

    // Initialize text scramble
    useEffect(() => {
        if (scramble1Ref.current) {
            fx1Ref.current = new TextScramble(scramble1Ref.current);
        }
        if (scramble2Ref.current) {
            fx2Ref.current = new TextScramble(scramble2Ref.current);
        }
    }, []);



    const handleScramble = (ref: React.RefObject<HTMLSpanElement>, fxRef: React.RefObject<TextScramble | null>) => {
        if (ref.current && fxRef.current) {
            const originalText = ref.current.getAttribute('data-value') || '';
            fxRef.current.setText(originalText);
        }
    };

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative px-6 pt-24 md:pt-0"
        >
            <div
                className="text-center relative z-10 max-w-5xl w-full transition-transform duration-100 ease-out"
            >
                <div className="overflow-hidden mb-4">
                    <p className="hero-anim text-cyan font-mono tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-base uppercase">
                        {getTranslation(currentLang, 'hero-badge')}
                    </p>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-tight mb-6 mix-blend-overlay cursor-default">
                    <div className="overflow-hidden">
                        <span
                            ref={scramble1Ref}
                            className="hero-anim inline-block glitch-text"
                            data-text="TECH"
                            data-value="TECH"
                            onMouseEnter={() => handleScramble(scramble1Ref, fx1Ref)}
                        >
                            TECH
                        </span>
                    </div>
                    <div className="overflow-hidden">
                        <span
                            ref={scramble2Ref}
                            className="hero-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon via-purple-500 to-cyan"
                            data-value="ARCHITECT"
                            onMouseEnter={() => handleScramble(scramble2Ref, fx2Ref)}
                        >
                            ARCHITECT
                        </span>
                    </div>
                </h1>

                <p className="hero-anim text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4">
                    {getTranslation(currentLang, 'hero-desc')}
                </p>

                <div className="hero-anim flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                    <Button as="a" href="#projects" variant="primary" magnetic>
                        {getTranslation(currentLang, 'hero-btn-works')}
                    </Button>
                    <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('openChat'))}>
                        <i className="fas fa-robot mr-2"></i>
                        {getTranslation(currentLang, 'hero-btn-ai')}
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                onClick={scrollToAbout}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group z-20 hover:opacity-100 transition-opacity duration-300 opacity-70"
            >
                <span className="text-[10px] md:text-xs tracking-[0.3em] font-mono text-gray-400 group-hover:text-cyan transition-colors duration-300">
                    SCROLL
                </span>
                <div className="relative w-[1px] h-16 md:h-20 bg-white/10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan to-transparent animate-drop"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
