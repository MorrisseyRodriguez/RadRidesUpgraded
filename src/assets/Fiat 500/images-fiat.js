import img1 from './IMG_20250610_215338.webp';
import img1400 from './IMG_20250610_215338-400w.webp';
import img1800 from './IMG_20250610_215338-800w.webp';
import img2 from './IMG_20250610_215342.webp';
import img2400 from './IMG_20250610_215342-400w.webp';
import img2800 from './IMG_20250610_215342-800w.webp';
import img3 from './IMG_20250610_215349.webp';
import img3400 from './IMG_20250610_215349-400w.webp';
import img3800 from './IMG_20250610_215349-800w.webp';
import img4 from './IMG_20250610_215353.webp';
import img4400 from './IMG_20250610_215353-400w.webp';
import img4800 from './IMG_20250610_215353-800w.webp';

const makeSrcSet = (w400, w800, wFull) => `${w400} 400w, ${w800} 800w, ${wFull} 1920w`;

export default {
  main: img1,
  gallery: [
    { src: img1, srcSet: makeSrcSet(img1400, img1800, img1) },
    { src: img2, srcSet: makeSrcSet(img2400, img2800, img2) },
    { src: img3, srcSet: makeSrcSet(img3400, img3800, img3) },
    { src: img4, srcSet: makeSrcSet(img4400, img4800, img4) },
  ]
};
