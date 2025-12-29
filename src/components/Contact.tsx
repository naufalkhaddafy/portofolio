import React, { useState, useEffect } from 'react';
import { HoloCard, Button } from './ui';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';
import { callGeminiAPI } from '../utils/gemini';

export function Contact() {
    const [currentLang, setCurrentLang] = useState<Language>('id');
    const [idea, setIdea] = useState('');
    const [result, setResult] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const handleLangChange = (e: CustomEvent<Language>) => {
            setCurrentLang(e.detail);
        };
        window.addEventListener('langchange', handleLangChange as EventListener);
        return () => window.removeEventListener('langchange', handleLangChange as EventListener);
    }, []);

    const generateEmailDraft = async () => {
        if (!idea.trim()) {
            alert('INPUT REQUIRED.');
            return;
        }

        setIsGenerating(true);
        const draft = await callGeminiAPI(`Draft formal email: ${idea}`, 'Plain text body only.');
        setResult(draft);
        setShowResult(true);
        setIsGenerating(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        alert('COPIED');
    };

    return (
        <section id="contact" className="py-20 md:py-32 relative px-6">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="gs-reveal-scale">
                    <h2 className="text-3xl md:text-5xl lg:text-8xl font-display font-bold mb-6 md:mb-8">
                        {getTranslation(currentLang, 'contact-title')}
                    </h2>
                    <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
                        {getTranslation(currentLang, 'contact-desc')}
                    </p>
                </div>

                <div className="gs-reveal-up holo-card p-1 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 inline-block w-full text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50 animate-[scan_3s_linear_infinite]"></div>
                    <div className="bg-[#050505] p-6 md:p-8 rounded-xl">
                        <label className="font-mono text-neon text-[10px] md:text-xs mb-2 block tracking-widest">
                            [INPUT_MESSAGE_PARAMETERS]
                        </label>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            rows={3}
                            className="w-full bg-space border border-white/20 rounded p-4 text-white focus:border-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all font-mono text-sm"
                            placeholder="> Input command here..."
                        />

                        <div className="mt-4">
                            <button
                                onClick={generateEmailDraft}
                                disabled={isGenerating}
                                className="w-full bg-white text-black font-bold py-3 md:py-4 hover:bg-cyan hover:text-white transition-all duration-300 font-display text-xs md:text-sm tracking-widest uppercase relative overflow-hidden group disabled:opacity-50"
                            >
                                <span className="relative z-10">
                                    {isGenerating ? 'COMPUTING...' : getTranslation(currentLang, 'btn-generate-text')}
                                </span>
                            </button>
                        </div>

                        {/* Result Console */}
                        {showResult && (
                            <div className="mt-6 border-t border-white/10 pt-6">
                                <label className="font-mono text-green-400 text-[10px] md:text-xs mb-2 block tracking-widest">
                                    [OUTPUT_GENERATED]
                                </label>
                                <textarea
                                    value={result}
                                    readOnly
                                    rows={6}
                                    className="w-full bg-space/50 border-l-2 border-green-500 p-4 text-gray-300 font-mono text-xs md:text-sm focus:outline-none"
                                />
                                <div className="flex gap-4 mt-4 justify-end">
                                    <a
                                        href={`mailto:email@example.com?body=${encodeURIComponent(result)}`}
                                        className="text-xs md:text-sm font-mono text-cyan hover:text-white hover:underline"
                                    >
                                        [SEND_TRANSMISSION]
                                    </a>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-xs md:text-sm font-mono text-gray-500 hover:text-white"
                                    >
                                        [COPY_DATA]
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-16 md:mt-20 flex justify-center gap-8 text-2xl md:text-3xl">
                    <a href="#" className="hover:text-cyan hover:scale-125 transition-all">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="hover:text-neon hover:scale-125 transition-all">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="hover:text-pink-500 hover:scale-125 transition-all">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contact;
