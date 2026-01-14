export interface Cafe {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  specialty?: string;
  description?: string;
}

export const cafes: Cafe[] = [
  {
    id: 'luxxe',
    name: 'Luxxe Cafe',
    address: '60 Waymouth St, Adelaide SA 5000',
    lat: -34.92579587843371,
    lng: 138.59736580994866,
    specialty: 'Matcha lattes & specialty coffee',
    description: 'Located in the heart of Adelaide\'s thriving business district.'
  },
  {
    id: 'munch-deli',
    name: 'Munch Deli',
    address: 'Shop 6/82 King William St, Adelaide SA 5000',
    lat: -34.9247,
    lng: 138.6000,
    specialty: 'Viet-inspired sandwiches & matcha',
    description: 'Known for delicious Vietnamese-inspired sandos and quality matcha drinks.'
  },
  {
    id: 'blended',
    name: 'Blended Cafe Adelaide',
    address: '95 Grenfell St, Adelaide SA 5000',
    lat: -34.924460149284684,
    lng: 138.60327653747476,
    specialty: 'Bagels & specialty matcha',
    description: 'Bringing bagels and brews to the CBD with excellent matcha options.'
  },
  {
    id: 'noru-cafe',
    name: 'Noru Cafe',
    address: 'Unit 2, 61-63 Grote St, Adelaide SA 5000',
    lat: -34.9294,
    lng: 138.5965,
    specialty: 'Matcha near the Central Market',
    description: 'Adelaide\'s newest matcha and coffee haven, pouring exceptional matcha.'
  },
  {
    id: 'yuku-do',
    name: 'Yuku Do',
    address: '252 Hindley St, Adelaide SA 5000',
    lat: -34.923266269619916,
    lng: 138.59001589800766,
    specialty: 'Japanese sandos & matcha',
    description: 'Japanese-inspired cafe serving onigiri, fluffy shokupan, and quality matcha.'
  },
  {
    id: 'matsuri-japanese',
    name: 'Matsuri Japanese',
    address: 'Shop 33 Renaissance Arcade, 128/130 Rundle Mall, Adelaide SA 5000',
    lat: -34.92240759843686,
    lng: 138.60420667116395,
    specialty: 'Traditional Japanese & matcha',
    description: 'Authentic Japanese restaurant with traditional matcha offerings.'
  },
  {
    id: 'please-say-please',
    name: 'Please Say Please',
    address: 'Shop 2 W, 50 Grenfell St, Adelaide SA 5000',
    lat: -34.924035709656714,
    lng: 138.60170476299606,
    specialty: 'Specialty coffee & matcha',
    description: 'Known for excellent coffee and quality matcha drinks in a friendly atmosphere.'
  },
  {
    id: 'deux-coffee',
    name: 'Deux Coffee Roasters',
    address: '149 Flinders St, Adelaide SA 5000',
    lat: -34.92705546386342,
    lng: 138.6063623863002,
    specialty: 'Japanese matcha & coffee roasters',
    description: 'Adelaide\'s newest coffee roasters serving matcha straight from Japan.'
  }
];
