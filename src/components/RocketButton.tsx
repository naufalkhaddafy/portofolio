import React, { useState, useEffect } from 'react';

export function RocketButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFlying, setIsFlying] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
            if (window.scrollY <= 300) {
                setIsFlying(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const flyRocket = () => {
        setIsFlying(true);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1000);
        setTimeout(() => {
            setIsFlying(false);
        }, 2500);
    };

    return (
        <button
            onClick={flyRocket}
            className={`rocket-btn fixed bottom-24 right-4 md:bottom-28 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-neon text-white flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300 hover:scale-110 hover:bg-cyan ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } ${isFlying ? 'is-flying' : ''}`}
        >
            <i className="fas fa-rocket text-lg md:text-xl -rotate-45"></i>
        </button>
    );
}

export default RocketButton;
