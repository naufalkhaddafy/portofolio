import React, { useState, useEffect } from 'react';

export function Footer() {
    const [liveUsers, setLiveUsers] = useState<number>(3);
    const [totalVisits, setTotalVisits] = useState<number>(14258);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Total Visits logic (Simulated using LocalStorage)
        const currentVisits = localStorage.getItem('total_visits');
        let newVisits = 14258;
        if (currentVisits) {
            newVisits = parseInt(currentVisits, 10) + Math.floor(Math.random() * 3) + 1;
        }
        localStorage.setItem('total_visits', newVisits.toString());
        setTotalVisits(newVisits);

        // Live Users fluctuating logic (Simulated)
        const interval = setInterval(() => {
            const randomUsers = Math.floor(Math.random() * 8) + 2;
            setLiveUsers(randomUsers);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="border-t border-white/10 py-8 md:py-10 text-center font-mono text-[10px] md:text-xs">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Muhammad Naufal Khaddafy. SYSTEM SECURE.</p>
                </div>

                {mounted && (
                    <div className="flex gap-4 md:gap-8 text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>LIVE USERS: <span className="text-cyan font-bold">{liveUsers}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-satellite-dish text-gray-600"></i>
                            <span>VISITS: <span className="text-neon font-bold">{totalVisits.toLocaleString()}</span></span>
                        </div>
                    </div>
                )}
            </div>
        </footer>
    );
}

export default Footer;
