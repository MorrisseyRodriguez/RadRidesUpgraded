import img1 from './20251007_180143.webp';
import img1400 from './20251007_180143-400w.webp';
import img1800 from './20251007_180143-800w.webp';
import img2 from './20251007_180053.webp';
import img2400 from './20251007_180053-400w.webp';
import img2800 from './20251007_180053-800w.webp';
import img3 from './20251007_180002.webp';
import img3400 from './20251007_180002-400w.webp';
import img3800 from './20251007_180002-800w.webp';
import img4 from './20240628_065940.webp';
import img4400 from './20240628_065940-400w.webp';
import img4800 from './20240628_065940-800w.webp';
import img5 from './20240627_200027.webp';
import img5400 from './20240627_200027-400w.webp';
import img5800 from './20240627_200027-800w.webp';
import img6 from './20240627_200020.webp';
import img6400 from './20240627_200020-400w.webp';
import img6800 from './20240627_200020-800w.webp';

const makeSrcSet = (w400, w800, wFull) => `${w400} 400w, ${w800} 800w, ${wFull} 1920w`;

export default {
  main: img3,
  gallery: [
    { src: img1, srcSet: makeSrcSet(img1400, img1800, img1) },
    { src: img2, srcSet: makeSrcSet(img2400, img2800, img2) },
    { src: img3, srcSet: makeSrcSet(img3400, img3800, img3) },
    { src: img4, srcSet: makeSrcSet(img4400, img4800, img4) },
    { src: img5, srcSet: makeSrcSet(img5400, img5800, img5) },
    { src: img6, srcSet: makeSrcSet(img6400, img6800, img6) },
  ]
};
