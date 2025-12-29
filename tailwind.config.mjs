/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                display: ['Syncopate', 'sans-serif'],
            },
            colors: {
                space: '#030014',
                neon: '#6366f1',
                cyan: '#06b6d4',
            },
            animation: {
                'drop': 'drop-anim 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite',
                'scan': 'scan-move 2s linear infinite',
                'float': 'float-icon 4s ease-in-out infinite',
            },
            keyframes: {
                'drop-anim': {
                    '0%': { top: '-50%', opacity: '0' },
                    '50%': { opacity: '1' },
                    '100%': { top: '100%', opacity: '0' },
                },
                'scan-move': {
                    '0%': { top: '0%', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { top: '100%', opacity: '0' },
                },
                'float-icon': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
            },
        },
    },
    plugins: [],
};
