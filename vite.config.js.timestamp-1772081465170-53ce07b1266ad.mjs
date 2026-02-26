// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react()
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
  publicDir: "public",
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor": ["react", "react-dom", "react-router-dom"],
          "ui": ["lucide-react", "clsx"],
          "swiper": ["swiper", "swiper/react", "swiper/modules"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
        passes: 2
      }
    },
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lucide-react", "clsx", "swiper"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuLy8gaW1wb3J0IGltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgLy8gaW1hZ2VtaW4oe1xuICAgIC8vICAgZmlsdGVyOiAoZmlsZSkgPT4ge1xuICAgIC8vICAgICAvLyBFeGNsdWRlIHByb2JsZW1hdGljIGZhdmljb24gZmlsZXNcbiAgICAvLyAgICAgY29uc3QgZXhjbHVkZUZpbGVzID0gWydmYXZpY29uLmpwZycsICdmYXZpY29uLnBuZycsICdhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZyddO1xuICAgIC8vICAgICByZXR1cm4gIWV4Y2x1ZGVGaWxlcy5zb21lKGV4Y2x1ZGVGaWxlID0+IGZpbGUuaW5jbHVkZXMoZXhjbHVkZUZpbGUpKTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICBnaWZzaWNsZToge1xuICAgIC8vICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcbiAgICAvLyAgICAgaW50ZXJsYWNlZDogZmFsc2VcbiAgICAvLyAgIH0sXG4gICAgLy8gICBvcHRpcG5nOiB7XG4gICAgLy8gICAgIG9wdGltaXphdGlvbkxldmVsOiA3XG4gICAgLy8gICB9LFxuICAgIC8vICAgbW96anBlZzoge1xuICAgIC8vICAgICBxdWFsaXR5OiA3NSAvLyBSZWR1Y2VkIGZyb20gODAgZm9yIGJldHRlciBjb21wcmVzc2lvblxuICAgIC8vICAgfSxcbiAgICAvLyAgIHBuZ3F1YW50OiB7XG4gICAgLy8gICAgIHF1YWxpdHk6IFswLjcsIDAuOF0sIC8vIEFkanVzdGVkIGZvciBiZXR0ZXIgY29tcHJlc3Npb25cbiAgICAvLyAgICAgc3BlZWQ6IDRcbiAgICAvLyAgIH0sXG4gICAgLy8gICB3ZWJwOiB7XG4gICAgLy8gICAgIHF1YWxpdHk6IDc1IC8vIFJlZHVjZWQgZnJvbSA4MCBmb3IgYmV0dGVyIGNvbXByZXNzaW9uXG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgXSxcbiAgcHVibGljRGlyOiAncHVibGljJyxcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ3ZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAndWknOiBbJ2x1Y2lkZS1yZWFjdCcsICdjbHN4J10sXG4gICAgICAgICAgJ3N3aXBlcic6IFsnc3dpcGVyJywgJ3N3aXBlci9yZWFjdCcsICdzd2lwZXIvbW9kdWxlcyddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5sb2cnXSxcbiAgICAgICAgcGFzc2VzOiAyXG4gICAgICB9XG4gICAgfSxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2VcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbScsICdsdWNpZGUtcmVhY3QnLCAnY2xzeCcsICdzd2lwZXInXVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF5QlI7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osVUFBVSxDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQSxVQUNuRCxNQUFNLENBQUMsZ0JBQWdCLE1BQU07QUFBQSxVQUM3QixVQUFVLENBQUMsVUFBVSxnQkFBZ0IsZ0JBQWdCO0FBQUEsUUFDdkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsY0FBYztBQUFBLElBQ2QsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLFFBQ2YsWUFBWSxDQUFDLGFBQWE7QUFBQSxRQUMxQixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHNCQUFzQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsU0FBUyxhQUFhLG9CQUFvQixnQkFBZ0IsUUFBUSxRQUFRO0FBQUEsRUFDdEY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
