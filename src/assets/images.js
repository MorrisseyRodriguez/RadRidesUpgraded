// C8 Corvette Images
import c8CorvetteMain from './C8 Corvette/Corvette sunny photo.webp';
import c8CorvetteDSC01405 from './C8 Corvette/DSC01405.jpg';
import c8CorvetteDSC01434 from './C8 Corvette/DSC01434.jpg';
import c8Corvette1000068217 from './C8 Corvette/1000068217.jpg';
import c8Corvette1000068218 from './C8 Corvette/1000068218.jpg';
import c8Corvette1000068219 from './C8 Corvette/1000068219.jpg';
import c8Corvette1000068220 from './C8 Corvette/1000068220.jpg';

// Escalade SP Images
import escaladeNewPrimary from './Escalade SP/20241114_163926.jpg';
import escaladeNewMain from './Escalade SP/Qzjwmer4RqivcrwA0gqJEg.avif';
import escaladeNewImg1 from './Escalade SP/TGDeeWCkSkG8E-MZo6mVRA.avif';
import escaladeNewImg2 from './Escalade SP/0FkoB61IRlyM_BEUb2w1OA.avif';
import escaladeNewImg3 from './Escalade SP/G15c_zfbRhOtla3GNeNGKg.avif';
import escaladeNewImg4 from './Escalade SP/5LunFCU9RKK4_mIvbMFWoA.avif';
import escaladeNewImg5 from './Escalade SP/IBQtZdJDTjiRidLNtaCqHw.avif';
import escaladeNewImg6 from './Escalade SP/vKO7LBbGTvS7epBTZiTFUQ.avif';
import escaladeNewImg7 from './Escalade SP/Iek3RltYRaml6T9lzVJVcQ.avif';
import escaladeNewImg8 from './Escalade SP/yfpBi4DGR9CLNqo3sdzKXQ.avif';
import escaladeNewImg9 from './Escalade SP/Ziqwl0CCQGGMGo744URHNA.avif';
import escaladeNewImg10 from './Escalade SP/3ah3XN-hQGWxGyuz_yQRMQ.avif';

// McLaren 570s Spider Images
import mclaren570sNewMain from './McLaren 570s/20240702_073956.jpg';
import mclaren570sNewImg1 from './McLaren 570s/20240702_072819 (1).jpg';
import mclaren570sNewImg2 from './McLaren 570s/20240702_131258.jpg';
import mclaren570sNewImg3 from './McLaren 570s/20240702_131312.jpg';
import mclaren570sNewImg5 from './McLaren 570s/20240702_073937.jpg';

// Fiat 500 Images
import fiat500Main from './Fiat 500/IMG_20250610_215338.jpg';
import fiat500Img1 from './Fiat 500/IMG_20250610_215342.jpg';
import fiat500Img2 from './Fiat 500/IMG_20250610_215349.jpg';
import fiat500Img3 from './Fiat 500/IMG_20250610_215353.jpg';

// Jeep Wrangler Images
import jeepWranglerImg2 from './Jeep Wrangler/IMG_20250617_151937 (1).jpg';
import jeepWranglerMain from './Jeep Wrangler/IMG_20250617_151937.jpg';
import jeepWranglerNewImg from './Jeep Wrangler/Screenshot 2025-08-27 124716.png';

// Team Images
import teamChad from './Team/Screenshot 2025-05-17 143859.png';
import teamDara from './Team/Screenshot 2025-05-17 143848.png';
import teamMascots from './Team/Screenshot 2025-05-17 143836.png';

// Logo Image
import logoImage from './Logo/RadRides_Logo-removebg-preview.png';

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

export const images = {
  c8Corvette: {
    main: c8Corvette1000068220,
    DSC01405: c8CorvetteDSC01405,
    DSC01434: c8CorvetteDSC01434,
    gallery: [
      c8Corvette1000068220,      // 1st - 1000068220.jpg
      c8CorvetteDSC01434,        // 2nd - DSC01434.jpg
      c8CorvetteMain,            // 3rd - Corvette sunny photo.webp
      c8Corvette1000068217,      // 4th - 1000068217.jpg
      c8Corvette1000068218,      // 5th - 1000068218.jpg
      c8Corvette1000068219,      // 6th - 1000068219.jpg
      c8CorvetteDSC01405         // 7th - DSC01405.jpg
    ],
    fallbacks: highQualityFallbacks.corvette
  },
  escalade: {
    main: escaladeNewPrimary,
    gallery: [
      escaladeNewPrimary,        // 1st - 20241114_163926.jpg
      escaladeNewMain,           // 2nd - Qzjwmer4RqivcrwA0gqJEg.avif
      escaladeNewImg1,           // 3rd - TGDeeWCkSkG8E-MZo6mVRA.avif
      escaladeNewImg2,           // 4th - 0FkoB61IRlyM_BEUb2w1OA.avif
      escaladeNewImg3,           // 5th - G15c_zfbRhOtla3GNeNGKg.avif
      escaladeNewImg4,           // 6th - 5LunFCU9RKK4_mIvbMFWoA.avif
      escaladeNewImg5,           // 7th - IBQtZdJDTjiRidLNtaCqHw.avif
      escaladeNewImg6,           // 8th - vKO7LBbGTvS7epBTZiTFUQ.avif
      escaladeNewImg7,           // 9th - Iek3RltYRaml6T9lzVJVcQ.avif
      escaladeNewImg8,           // 10th - yfpBi4DGR9CLNqo3sdzKXQ.avif
      escaladeNewImg9,           // 11th - Ziqwl0CCQGGMGo744URHNA.avif
      escaladeNewImg10           // 12th - 3ah3XN-hQGWxGyuz_yQRMQ.avif
    ],
    fallbacks: highQualityFallbacks.rrCullinan
  },
  mclaren570s: {
    main: mclaren570sNewMain,
    gallery: [
      mclaren570sNewMain,        // 1st - 20240702_073956.jpg
      mclaren570sNewImg1,        // 2nd - 20240702_072819 (1).jpg
      mclaren570sNewImg2,        // 3rd - 20240702_131258.jpg
      mclaren570sNewImg3,        // 4th - 20240702_131312.jpg
      mclaren570sNewImg5         // 5th - 20240702_073937.jpg
    ],
    fallbacks: highQualityFallbacks.mclaren
  },
  fiat500: {
    main: fiat500Main,
    gallery: [
      fiat500Main,               // 1st - IMG_20250610_215338.jpg
      fiat500Img1,               // 2nd - IMG_20250610_215342.jpg
      fiat500Img2,               // 3rd - IMG_20250610_215349.jpg
      fiat500Img3                // 4th - IMG_20250610_215353.jpg
    ],
    fallbacks: highQualityFallbacks.fiat
  },
  jeepWrangler: {
    main: jeepWranglerMain,
    gallery: [
      jeepWranglerNewImg,        // 1st - Screenshot 2025-08-27 124716.png
      jeepWranglerImg2,          // 2nd - IMG_20250617_151937 (1).jpg
      jeepWranglerMain           // 3rd - IMG_20250617_151937.jpg
    ],
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