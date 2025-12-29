import React, { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { callGeminiAPI } from '../utils/gemini';

interface Message {
    text: string;
    sender: 'user' | 'ai' | 'system';
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: 'Connection established.', sender: 'system' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
        setIsLoading(true);

        const context = 'You are a futuristic AI assistant. Keep answers short, technical, and cool.';
        const response = await callGeminiAPI(userMessage, context);

        setMessages((prev) => [...prev, { text: response, sender: 'ai' }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex flex-col items-start pointer-events-none">
            {/* Chat Window */}
            <div
                className={`holo-card w-[calc(100vw-2rem)] md:w-80 h-[400px] md:h-[450px] rounded-lg mb-4 transition-all duration-300 origin-bottom-left pointer-events-auto flex flex-col overflow-hidden border-neon/30 bg-black/80 backdrop-blur-xl ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 hidden'
                    }`}
            >
                {/* Header */}
                <div className="bg-neon/10 p-3 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-mono text-xs text-neon tracking-widest">AI_ASSISTANT_V2.0</span>
                    </div>
                    <button onClick={toggleChat} className="text-gray-400 hover:text-white p-2">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                            <span className="opacity-50">
                                {msg.sender === 'user' ? '> USER:' : msg.sender === 'system' ? '[SYSTEM]:' : '[AI]:'}
                            </span>{' '}
                            <span className={msg.sender === 'user' ? 'text-cyan' : 'text-white'}>{msg.text}</span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-neon animate-pulse">PROCESSING...</div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/10 bg-black/50">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="> Query..."
                            className="flex-1 bg-transparent border-none text-white focus:ring-0 font-mono text-xs placeholder-gray-600 outline-none"
                        />
                        <button type="submit" className="text-cyan hover:text-white p-2">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-transform duration-300 hover:scale-110 z-50 bg-black/50 backdrop-blur border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            >
                <div className="absolute inset-0 bg-cyan/30 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -inset-1 rounded-full border-2 border-transparent border-t-cyan border-l-neon animate-spin shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                <div className="absolute inset-1 bg-slate-900/90 backdrop-blur-md rounded-full border border-white/10 shadow-inner flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-neon/20 to-transparent opacity-50"></div>
                    <span className="absolute text-[8px] md:text-[10px] font-mono font-bold text-white/10 top-2">AI</span>
                </div>
                <i
                    className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-robot'} text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
                ></i>
            </button>
        </div>
    );
}

export default ChatWidget;
