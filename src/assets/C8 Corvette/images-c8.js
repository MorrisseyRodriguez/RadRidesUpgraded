import main from './1000068220.webp';
import main400 from './1000068220-400w.webp';
import main800 from './1000068220-800w.webp';
import img2 from './DSC01434.webp';
import img2400 from './DSC01434-400w.webp';
import img2800 from './DSC01434-800w.webp';
import img3 from './Corvette sunny photo.webp';
import img3400 from './Corvette sunny photo-400w.webp';
import img3800 from './Corvette sunny photo-800w.webp';
import img4 from './1000068217.webp';
import img4400 from './1000068217-400w.webp';
import img4800 from './1000068217-800w.webp';
import img5 from './1000068218.webp';
import img5400 from './1000068218-400w.webp';
import img5800 from './1000068218-800w.webp';
import img6 from './1000068219.webp';
import img6400 from './1000068219-400w.webp';
import img6800 from './1000068219-800w.webp';
import img7 from './DSC01405.webp';
import img7400 from './DSC01405-400w.webp';
import img7800 from './DSC01405-800w.webp';

const makeSrcSet = (w400, w800, wFull) => `${w400} 400w, ${w800} 800w, ${wFull} 1920w`;

export default {
  main: main,
  gallery: [
    { src: main, srcSet: makeSrcSet(main400, main800, main) },
    { src: img2, srcSet: makeSrcSet(img2400, img2800, img2) },
    { src: img3, srcSet: makeSrcSet(img3400, img3800, img3) },
    { src: img4, srcSet: makeSrcSet(img4400, img4800, img4) },
    { src: img5, srcSet: makeSrcSet(img5400, img5800, img5) },
    { src: img6, srcSet: makeSrcSet(img6400, img6800, img6) },
    { src: img7, srcSet: makeSrcSet(img7400, img7800, img7) },
  ]
};
