import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    // imagemin({
    //   filter: (file) => {
    //     // Exclude problematic favicon files
    //     const excludeFiles = ['favicon.jpg', 'favicon.png', 'android-chrome-192x192.png'];
    //     return !excludeFiles.some(excludeFile => file.includes(excludeFile));
    //   },
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false
    //   },
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   mozjpeg: {
    //     quality: 75 // Reduced from 80 for better compression
    //   },
    //   pngquant: {
    //     quality: [0.7, 0.8], // Adjusted for better compression
    //     speed: 4
    //   },
    //   webp: {
    //     quality: 75 // Reduced from 80 for better compression
    //   }
    // })
  ],
  publicDir: 'public',
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react', 'clsx'],
          'swiper': ['swiper', 'swiper/react', 'swiper/modules']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2
      }
    },
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'clsx', 'swiper']
  }
});