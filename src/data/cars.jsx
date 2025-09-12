import { images } from '../assets/images';

export const carsData = {
  'mclaren-570s-spider': {
    name: 'McLaren 570S Spider',
    image: images.mclaren570s.main,
    fallbacks: images.mclaren570s.fallbacks,
    images: images.mclaren570s.gallery,
    acceleration: '3.2s',
    horsepower: '562 HP',
    seats: 2,
    depositAmount: '$1,500',
    features: [
      'Retractable hardtop convertible',
      'Carbon fiber construction',
      'Active aerodynamics',
      'Track-tuned suspension',
      'Premium leather interior',
      'Advanced infotainment system'
    ],
    overview: 'The McLaren 570S Spider combines breathtaking performance with open-air driving pleasure. This convertible supercar features a twin-turbo V8 engine, carbon fiber construction, and McLaren\'s signature dihedral doors. Perfect for those who want to experience pure automotive excellence.'
  },
  'corvette-c8-z06': {
    name: 'Corvette C8 Z06',
    image: images.c8Corvette.main,
    fallbacks: images.c8Corvette.fallbacks,
    images: images.c8Corvette.gallery,
    acceleration: '2.6s',
    horsepower: '670 HP',
    seats: 2,
    depositAmount: '$1,500',
    features: [
      'Mid-engine layout',
      'Naturally aspirated V8',
      'Track-focused aerodynamics',
      'Magnetic ride control',
      'Performance data recorder',
      'Carbon fiber wheels available'
    ],
    overview: 'The C8 Z06 represents the pinnacle of American sports car engineering. With its naturally aspirated 5.5L V8 and mid-engine layout, this Corvette delivers track-ready performance with everyday usability.'
  },
  'cadillac-escalade-sport-platinum': {
    name: 'Cadillac Escalade Sport Platinum',
    image: images.escalade.main,
    fallbacks: images.escalade.fallbacks,
    images: images.escalade.gallery,
    acceleration: '6.1s',
    horsepower: '420 HP',
    seats: 8,
    depositAmount: '$500',
    features: [
      'Premium leather seating',
      '38-inch curved OLED display',
      'Super Cruise hands-free driving',
      'Air ride adaptive suspension',
      'Bose premium audio system',
      'Wireless device charging'
    ],
    overview: 'The Escalade Sport Platinum combines luxury with commanding presence. This full-size SUV offers unparalleled comfort, cutting-edge technology, and the capability to handle any journey in style.'
  },
  'fiat-500-abarth': {
    name: 'Fiat 500 Abarth',
    image: images.fiat500.main,
    fallbacks: images.fiat500.fallbacks,
    images: images.fiat500.gallery,
    acceleration: '6.8s',
    horsepower: '160 HP',
    seats: 4,
    depositAmount: '$300',
    features: [
      'Turbocharged engine',
      'Sport-tuned suspension',
      'Abarth performance exhaust',
      'Racing-inspired interior',
      'Manual transmission',
      'Compact city-friendly size'
    ],
    overview: 'The Fiat 500 Abarth proves that good things come in small packages. This pocket rocket delivers surprising performance and Italian flair, making every drive an adventure.'
  },
  'jeep-wrangler-rubicon-4xe': {
    name: 'Jeep Wrangler Rubicon 4xe',
    image: images.jeepWrangler.gallery[0],
    fallbacks: images.jeepWrangler.fallbacks,
    images: images.jeepWrangler.gallery,
    acceleration: '6.0s',
    horsepower: '375 HP',
    seats: 5,
    depositAmount: '$400',
    features: [
      'Plug-in hybrid powertrain',
      'Removable doors and roof',
      'Rock-Trac 4WD system',
      'Electronic sway bar disconnect',
      'Skid plates and rock rails',
      'Uconnect infotainment'
    ],
    overview: 'The Wrangler Rubicon 4xe combines legendary off-road capability with modern hybrid efficiency. Whether you\'re conquering trails or cruising the city, this Jeep delivers adventure and sustainability.'
  }
};