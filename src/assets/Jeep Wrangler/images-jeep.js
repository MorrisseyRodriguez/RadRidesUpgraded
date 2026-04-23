import img1 from './Screenshot 2025-08-27 124716.webp';
import img2 from './IMG_20250617_151937 (1).webp';
import img2400 from './IMG_20250617_151937 (1)-400w.webp';
import img2800 from './IMG_20250617_151937 (1)-800w.webp';
import img3 from './IMG_20250617_151937.webp';
import img3400 from './IMG_20250617_151937-400w.webp';
import img3800 from './IMG_20250617_151937-800w.webp';

const makeSrcSet = (w400, w800, wFull) => `${w400} 400w, ${w800} 800w, ${wFull} 1920w`;

export default {
  main: img3,
  gallery: [
    { src: img1, srcSet: '' },
    { src: img2, srcSet: makeSrcSet(img2400, img2800, img2) },
    { src: img3, srcSet: makeSrcSet(img3400, img3800, img3) },
  ]
};
