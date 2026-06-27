import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [
        react(),
        tailwind()
    ],
    vite: {
        server: {
            proxy: {
                '/api/9router': {
                    target: 'https://9router.codepai.my.id',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/9router/, ''),
                }
            }
        }
    }
});
