import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Estratégia Granular de Granular Chunking (RNF01 Protection)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Isola as primitivas do ecossistema Headless UI Core
            if (id.includes('@radix-ui') || id.includes('@slot') || id.includes('class-variance-authority')) {
              return 'vendor-ui-core';
            }
            // 2. Isola o motor de renderização de gráficos pesados (só carrega quando necessário)
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-analytics-charts';
            }
            // 3. Isola a biblioteca massiva de ícones vetoriais
            if (id.includes('lucide-react')) {
              return 'vendor-visual-icons';
            }
            // 4. Isola motores de animação e transição reativa
            if (id.includes('motion') || id.includes('embla-carousel')) {
              return 'vendor-motion-engine';
            }
            // 5. Quarentena do MUI (Sinaliza visualmente o peso morto no relatório de build para deleção)
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui-legacy-bloat';
            }
            // Qualquer outra dependência genérica de infraestrutura (Zustand, React-Router, etc)
            return 'vendor-shared-libs';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500, // Limite estrito de aviso de tamanho de chunk em kB
  },
})
