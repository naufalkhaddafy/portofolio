import React, { useState, useEffect } from 'react';
import { SectionBadge } from './ui';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

export function About() {
    const [currentLang, setCurrentLang] = useState<Language>('id');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const handleLangChange = (e: CustomEvent<Language>) => {
            setCurrentLang(e.detail);
        };
        window.addEventListener('langchange', handleLangChange as EventListener);
        return () => window.removeEventListener('langchange', handleLangChange as EventListener);
    }, []);

    const startIdentityScan = () => {
        if (isUnlocked || isScanning) return;

        setIsScanning(true);
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 4) + 1;
            if (progress > 100) progress = 100;
            setScanProgress(progress);

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsUnlocked(true);
                    setIsScanning(false);
                }, 800);
            }
        }, 30);
    };

    return (
        <section id="about" className="py-20 md:py-32 relative px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                {/* Image with Scanner */}
                <div className="relative group gs-reveal-left order-2 md:order-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon to-cyan rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-space rounded-lg p-2 border border-white/10 overflow-hidden">
                        <img
                            src="/profile.jpg"
                            alt="Muhammad Naufal Khaddafy"
                            className={`w-full h-auto rounded transition duration-500 ${isUnlocked ? '' : 'filter grayscale'
                                } group-hover:grayscale-0`}
                        />

                        {/* Identity Lock Overlay */}
                        {!isUnlocked && (
                            <div
                                className={`absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center transition-all duration-700 backdrop-blur-sm ${isUnlocked ? 'opacity-0 pointer-events-none' : ''
                                    }`}
                            >
                                {/* Scan Line */}
                                {isScanning && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan shadow-[0_0_15px_rgba(6,182,212,1)] animate-scan z-30"></div>
                                )}

                                <div className="text-center relative z-30">
                                    {!isScanning && (
                                        <i className="fas fa-lock text-4xl md:text-6xl text-gray-600 mb-4 transition-all duration-300"></i>
                                    )}
                                    {isScanning && (
                                        <div className="font-display text-5xl md:text-7xl font-bold text-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                                            {scanProgress}%
                                        </div>
                                    )}
                                    <div
                                        className={`font-mono text-xs md:text-sm mt-4 tracking-[0.3em] uppercase ${isScanning ? 'text-cyan animate-pulse' : 'text-gray-500'
                                            }`}
                                    >
                                        {isScanning ? 'SCANNING BIOMETRICS...' : 'Identity Locked'}
                                    </div>
                                </div>

                                {/* Grid Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                            </div>
                        )}

                        {/* Fingerprint Trigger */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-30">
                            <div className="font-mono text-[10px] md:text-xs text-neon">
                                STATUS: <span className={isUnlocked ? 'text-green-500' : ''}>{isUnlocked ? 'ONLINE' : 'ENCRYPTED'}</span>
                                <br />
                                LOC: KUTAI TIMUR, ID
                            </div>
                            <button
                                onClick={startIdentityScan}
                                className="focus:outline-none group relative cursor-pointer"
                                title="Click to Unlock Identity"
                            >
                                <div className="absolute inset-0 bg-cyan/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <i
                                    className={`fas fa-fingerprint text-3xl md:text-5xl transition-colors duration-300 relative z-10 ${isUnlocked ? 'text-green-500' : 'text-gray-500 group-hover:text-cyan animate-pulse'
                                        }`}
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="gs-reveal-right order-1 md:order-2">
                    <SectionBadge number="01" label="ABOUT_ME" color="cyan" />
                    <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">
                        {getTranslation(currentLang, 'about-title').split('<br>').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i === 0 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>
                    <div className="space-y-6 text-gray-400 text-base md:text-lg">
                        <p>{getTranslation(currentLang, 'about-desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
