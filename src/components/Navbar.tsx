import React, { useState, useEffect } from 'react';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

interface NavbarProps {
    initialLang?: Language;
}

const navItems = [
    { href: '#home', key: 'nav-home', default: 'HOME' },
    { href: '#about', key: 'nav-about', default: 'ABOUT' },
    { href: '#skills', key: null, default: 'SKILLS' },
    { href: '#experience', key: null, default: 'EXP' },
    { href: '#projects', key: 'nav-works', default: 'WORKS' },
];

export function Navbar({ initialLang = 'id' }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<Language>(initialLang);

    const toggleLanguage = () => {
        const newLang = currentLang === 'id' ? 'en' : 'id';
        setCurrentLang(newLang);
        window.dispatchEvent(new CustomEvent('langchange', { detail: newLang }));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="fixed w-full z-50 py-4 px-6 md:py-6 md:px-12 flex justify-between items-center bg-[#030014]/90 backdrop-blur-md border-b border-white/5 md:bg-transparent md:border-none md:backdrop-blur-none transition-all duration-300">
                <a
                    href="#"
                    className="text-xl md:text-2xl font-display font-bold tracking-widest hover:text-neon transition-colors duration-300 relative z-[70]"
                >
                    CODEPAI<span className="text-cyan text-3xl md:text-4xl">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className="hover:text-cyan transition-colors">
                            {item.key ? getTranslation(currentLang, item.key) : item.default}
                        </a>
                    ))}
                    <div className="flex items-center gap-4 pl-8 border-l border-white/20">
                        <button
                            onClick={toggleLanguage}
                            className="hover:text-neon transition-transform hover:scale-110 font-mono text-xs border border-white/30 px-2 py-1 rounded"
                        >
                            {currentLang.toUpperCase()}
                        </button>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden z-[70]">
                    <div className="flex items-center bg-black/40 backdrop-blur-lg border border-white/10 rounded-full p-0.5 shadow-lg hover:border-neon/50 transition-colors duration-300">
                        <button
                            onClick={toggleLanguage}
                            className="h-9 w-10 flex items-center justify-center text-xs font-mono font-bold text-gray-300 rounded-l-full hover:bg-white/10 hover:text-white transition-all"
                        >
                            {currentLang.toUpperCase()}
                        </button>
                        <div className="w-[1px] h-4 bg-white/10"></div>
                        <button
                            id="menu-btn"
                            onClick={toggleMenu}
                            className="h-9 w-10 flex items-center justify-center focus:outline-none rounded-r-full hover:bg-white/10 transition-colors group"
                            aria-label="Toggle Menu"
                        >
                            <div className={`minimal-btn ${isMenuOpen ? 'minimal-active' : ''}`}>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#030014]/98 backdrop-blur-xl z-[60] transform transition-transform duration-500 flex flex-col items-center justify-center gap-8 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {navItems.map((item, idx) => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`text-3xl font-display hover:text-cyan tracking-widest transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                    >
                        {item.key ? getTranslation(currentLang, item.key) : item.default}
                    </a>
                ))}
                <div
                    className={`mt-8 pt-8 border-t border-white/10 w-1/2 flex justify-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '600ms' }}
                >
                    <button
                        onClick={toggleLanguage}
                        className="hover:text-neon font-mono border border-white/30 px-4 py-2 rounded"
                    >
                        LANG: {currentLang.toUpperCase()}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;
