import img1 from './20240702_073956.webp';
import img1400 from './20240702_073956-400w.webp';
import img1800 from './20240702_073956-800w.webp';
import img2 from './20240702_072819 (1).webp';
import img2400 from './20240702_072819 (1)-400w.webp';
import img2800 from './20240702_072819 (1)-800w.webp';
import img3 from './20240702_131258.webp';
import img3400 from './20240702_131258-400w.webp';
import img3800 from './20240702_131258-800w.webp';
import img4 from './20240702_131312.webp';
import img4400 from './20240702_131312-400w.webp';
import img4800 from './20240702_131312-800w.webp';
import img5 from './20240702_073937.webp';
import img5400 from './20240702_073937-400w.webp';
import img5800 from './20240702_073937-800w.webp';

const makeSrcSet = (w400, w800, wFull) => `${w400} 400w, ${w800} 800w, ${wFull} 1920w`;

export default {
  main: img1,
  gallery: [
    { src: img1, srcSet: makeSrcSet(img1400, img1800, img1) },
    { src: img2, srcSet: makeSrcSet(img2400, img2800, img2) },
    { src: img3, srcSet: makeSrcSet(img3400, img3800, img3) },
    { src: img4, srcSet: makeSrcSet(img4400, img4800, img4) },
    { src: img5, srcSet: makeSrcSet(img5400, img5800, img5) },
  ]
};
