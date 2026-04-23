// Logo Image - always loaded (used in nav)
import logoImage from './Logo/RadRides_Logo-removebg-preview.webp';

// Fleet card images - loaded on home page (with responsive variants)
import c8CorvetteMain from './C8 Corvette/1000068220.webp';
import c8CorvetteMain400 from './C8 Corvette/1000068220-400w.webp';
import c8CorvetteMain800 from './C8 Corvette/1000068220-800w.webp';
import escaladeMain from './Escalade SP/20251007_180002.webp';
import escaladeMain400 from './Escalade SP/20251007_180002-400w.webp';
import escaladeMain800 from './Escalade SP/20251007_180002-800w.webp';
import mclarenMain from './McLaren 570s/20240702_073956.webp';
import mclarenMain400 from './McLaren 570s/20240702_073956-400w.webp';
import mclarenMain800 from './McLaren 570s/20240702_073956-800w.webp';
import fiat500Main from './Fiat 500/IMG_20250610_215338.webp';
import fiat500Main400 from './Fiat 500/IMG_20250610_215338-400w.webp';
import fiat500Main800 from './Fiat 500/IMG_20250610_215338-800w.webp';
import jeepWranglerMain from './Jeep Wrangler/Screenshot 2025-08-27 124716.webp';

// Team Images - loaded on home page (below fold, lazy)
import teamChad from './Team/Screenshot 2025-05-17 143859.webp';
import teamDara from './Team/Screenshot 2025-05-17 143848.webp';
import teamMascots from './Team/Screenshot 2025-05-17 143836.webp';

const makeSrcSet = (w400, w800, wFull) => `${w400} 400w, ${w800} 800w, ${wFull} 1920w`;

// High-quality fallback images for better reliability
const highQualityFallbacks = {
  corvette: [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  mclaren: [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  rrCullinan: [
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  ferrari: [
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  porsche: [
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  fiat: [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  jeep: [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ]
};

// Dynamic imports for car detail page images - only loaded when needed
export const carImageLoaders = {
  c8Corvette: () => import('./C8 Corvette/images-c8.js').then(m => m.default),
  escalade: () => import('./Escalade SP/images-escalade.js').then(m => m.default),
  mclaren570s: () => import('./McLaren 570s/images-mclaren.js').then(m => m.default),
  fiat500: () => import('./Fiat 500/images-fiat.js').then(m => m.default),
  jeepWrangler: () => import('./Jeep Wrangler/images-jeep.js').then(m => m.default),
};

export const images = {
  c8Corvette: {
    main: c8CorvetteMain,
    mainSrcSet: makeSrcSet(c8CorvetteMain400, c8CorvetteMain800, c8CorvetteMain),
    fallbacks: highQualityFallbacks.corvette
  },
  escalade: {
    main: escaladeMain,
    mainSrcSet: makeSrcSet(escaladeMain400, escaladeMain800, escaladeMain),
    fallbacks: highQualityFallbacks.rrCullinan
  },
  mclaren570s: {
    main: mclarenMain,
    mainSrcSet: makeSrcSet(mclarenMain400, mclarenMain800, mclarenMain),
    fallbacks: highQualityFallbacks.mclaren
  },
  fiat500: {
    main: fiat500Main,
    mainSrcSet: makeSrcSet(fiat500Main400, fiat500Main800, fiat500Main),
    fallbacks: highQualityFallbacks.fiat
  },
  jeepWrangler: {
    main: jeepWranglerMain,
    mainSrcSet: '',
    fallbacks: highQualityFallbacks.jeep
  },
  team: {
    chad: teamChad,
    dara: teamDara,
    mascots: teamMascots
  },
  logo: logoImage
};

export default images;
