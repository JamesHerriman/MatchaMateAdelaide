export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Café {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  location: 'cbd' | 'outside';
  specialty?: string;
  description?: string;
  openingHours?: OpeningHours;
}

export const cafes: Café[] = [
  {
    id: 'luxxe',
    name: 'Luxxe Café',
    address: '60 Waymouth St, Adelaide SA 5000',
    lat: -34.92579587843371,
    lng: 138.59736580994866,
    location: 'cbd',
    specialty: 'Matcha lattes & specialty coffee',
    description: 'Located in the heart of Adelaide\'s thriving business district.',
    openingHours: {
      monday: '7:00 AM - 3:30 PM',
      tuesday: '7:00 AM - 3:30 PM',
      wednesday: '7:00 AM - 3:30 PM',
      thursday: '7:00 AM - 3:30 PM',
      friday: '7:00 AM - 3:30 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  },
  {
    id: 'munch-deli',
    name: 'Munch Deli',
    address: 'Shop 6/82 King William St, Adelaide SA 5000',
    lat: -34.9247,
    lng: 138.6000,
    location: 'cbd',
    specialty: 'Viet-inspired sandwiches & matcha',
    description: 'Known for delicious Vietnamese-inspired sandos and quality matcha drinks.',
    openingHours: {
      monday: '7:30 AM - 3:00 PM',
      tuesday: '7:30 AM - 3:00 PM',
      wednesday: '7:30 AM - 3:00 PM',
      thursday: '7:30 AM - 3:00 PM',
      friday: '7:30 AM - 3:00 PM',
      saturday: '10:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: 'blended',
    name: 'Blended Café Adelaide',
    address: '95 Grenfell St, Adelaide SA 5000',
    lat: -34.924460149284684,
    lng: 138.60327653747476,
    location: 'cbd',
    specialty: 'Bagels & specialty matcha',
    description: 'Bringing bagels and brews to the CBD with excellent matcha options.',
    openingHours: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: '7:00 AM - 3:00 PM',
      friday: '7:00 AM - 3:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: 'noru-cafe',
    name: 'Noru Café',
    address: 'Unit 2, 61-63 Grote St, Adelaide SA 5000',
    lat: -34.9294,
    lng: 138.5965,
    location: 'cbd',
    specialty: 'Matcha near the Central Market',
    description: 'Adelaide\'s newest matcha and coffee haven, pouring exceptional matcha.',
    openingHours: {
      monday: '7:00 AM - 4:00 PM',
      tuesday: '7:00 AM - 4:00 PM',
      wednesday: '7:00 AM - 4:00 PM',
      thursday: '7:00 AM - 4:00 PM',
      friday: '7:00 AM - 4:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  },
  {
    id: 'yuku-do',
    name: 'Yuku Do',
    address: '252 Hindley St, Adelaide SA 5000',
    lat: -34.923266269619916,
    lng: 138.59001589800766,
    location: 'cbd',
    specialty: 'Japanese sandos & matcha',
    description: 'Japanese-inspired cafe serving onigiri, fluffy shokupan, and quality matcha.',
    openingHours: {
      monday: '8:00 AM - 4:00 PM',
      tuesday: '8:00 AM - 4:00 PM',
      wednesday: '8:00 AM - 4:00 PM',
      thursday: '8:00 AM - 4:00 PM',
      friday: '8:00 AM - 4:00 PM',
      saturday: '8:30 AM - 3:00 PM',
      sunday: '8:30 AM - 3:00 PM'
    }
  },
  {
    id: 'matsuri-japanese',
    name: 'Matsuri Japanese',
    address: 'Shop 33 Renaissance Arcade, 128/130 Rundle Mall, Adelaide SA 5000',
    lat: -34.92240759843686,
    lng: 138.60420667116395,
    location: 'cbd',
    specialty: 'Traditional Japanese & matcha',
    description: 'Authentic Japanese restaurant with traditional matcha offerings.',
    openingHours: {
      monday: 'Closed',
      tuesday: '11:00 AM - 6:00 PM',
      wednesday: '11:00 AM - 6:00 PM',
      thursday: '11:00 AM - 6:00 PM',
      friday: '11:00 AM - 9:00 PM',
      saturday: '11:00 AM - 6:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: 'please-say-please',
    name: 'Please Say Please',
    address: 'Shop 2 W, 50 Grenfell St, Adelaide SA 5000',
    lat: -34.924035709656714,
    lng: 138.60170476299606,
    location: 'cbd',
    specialty: 'Specialty coffee & matcha',
    description: 'Known for excellent coffee and quality matcha drinks in a friendly atmosphere.',
    openingHours: {
      monday: '6:00 AM - 2:00 PM',
      tuesday: '6:00 AM - 2:00 PM',
      wednesday: '6:00 AM - 2:00 PM',
      thursday: '6:00 AM - 2:00 PM',
      friday: '6:00 AM - 2:00 PM',
      saturday: '8:00 AM - 11:30 AM',
      sunday: '8:00 AM - 11:30 AM'
    }
  },
  {
    id: 'deux-coffee',
    name: 'Deux Coffee Roasters',
    address: '149 Flinders St, Adelaide SA 5000',
    lat: -34.92705546386342,
    lng: 138.6063623863002,
    location: 'cbd',
    specialty: 'Japanese matcha & coffee roasters',
    description: 'Adelaide\'s newest coffee roasters serving matcha straight from Japan.',
    openingHours: {
      monday: '7:00 AM - 2:00 PM',
      tuesday: '7:00 AM - 2:00 PM',
      wednesday: '7:00 AM - 2:00 PM',
      thursday: '7:00 AM - 2:00 PM',
      friday: '7:00 AM - 2:00 PM',
      saturday: '8:00 AM - 1:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: 'homeboy',
    name: 'Homeboy',
    address: '266-269 North Terrace, Adelaide SA 5000',
    lat: -34.921382693977804,
    lng: 138.60756112684334,
    location: 'cbd',
    specialty: 'Focaccias, scrolls & matcha',
    description: 'Social media sensation serving smooth matcha and specialty coffee at Yugo Adelaide.',
    openingHours: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: '7:00 AM - 3:00 PM',
      friday: '7:00 AM - 3:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: 'cha-no-wa',
    name: 'Cha-no-wa',
    address: 'Shop G6, 33 King William St, Adelaide SA 5000',
    lat: -34.92292549373351,
    lng: 138.59913148306933,
    location: 'cbd',
    specialty: 'Luxury Japanese matcha & sweets',
    description: 'First Australian store of the Hiroshima matcha brand, serving premium matcha drinks and desserts.',
    openingHours: {
      monday: '10:30 AM - 8:00 PM',
      tuesday: '10:30 AM - 8:00 PM',
      wednesday: '10:30 AM - 8:00 PM',
      thursday: '10:30 AM - 8:00 PM',
      friday: '10:30 AM - 9:00 PM',
      saturday: '10:30 AM - 8:00 PM',
      sunday: '10:30 AM - 8:00 PM'
    }
  },
  {
    id: 'bottega-bandito',
    name: 'Bottega Bandito',
    address: '25 James Pl, Adelaide SA 5000',
    lat: -34.92368219585526,
    lng: 138.6005915998554,
    location: 'cbd',
    specialty: 'Italian deli with matcha',
    description: 'Modern delicatessen and cafe offering sandwiches, pastries, and quality matcha lattes.',
    openingHours: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: '7:00 AM - 3:00 PM',
      friday: '7:00 AM - 3:00 PM',
      saturday: '8:00 AM - 3:00 PM',
      sunday: '8:00 AM - 3:00 PM'
    }
  },
  {
    id: 'kafin',
    name: 'Kafi:n',
    address: '211 Rundle St, Adelaide SA 5000',
    lat: -34.9224713391593,
    lng: 138.6077296710216,
    location: 'cbd',
    specialty: 'Korean cafe with matcha',
    description: 'Korean-style cafe offering delicious matcha drinks and Korean-inspired treats.',
    openingHours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 10:00 PM',
      thursday: '7:00 AM - 10:00 PM',
      friday: '7:00 AM - 11:00 PM',
      saturday: '8:00 AM - 11:00 PM',
      sunday: '9:00 AM - 5:00 PM'
    }
  },
  {
    id: 'florice-cafe',
    name: 'Florice Café',
    address: '81 Flinders St, Adelaide SA 5000',
    lat: -34.92745,
    lng: 138.60576,
    location: 'cbd',
    specialty: 'Specialty coffee & matcha',
    description: 'Charming café serving quality matcha drinks alongside specialty coffee.',
    openingHours: {
      monday: '7:00 AM - 3:30 PM',
      tuesday: '7:00 AM - 3:30 PM',
      wednesday: '7:00 AM - 3:30 PM',
      thursday: '7:00 AM - 3:30 PM',
      friday: '7:00 AM - 3:30 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  },
  {
    id: 'twentyeight-dessert-bar',
    name: 'TwentyEight Dessert Bar',
    address: '18 Witcombe St, Adelaide SA 5000',
    lat: -34.929936112791786,
    lng: 138.59459868523524,
    location: 'cbd',
    specialty: 'Desserts & matcha drinks',
    description: 'Asian-inspired dessert bar featuring matcha drinks and delightful sweet treats.',
    openingHours: {
      monday: '6:30 PM - 10:30 PM',
      tuesday: '6:30 PM - 10:30 PM',
      wednesday: 'Closed',
      thursday: '6:30 PM - 10:30 PM',
      friday: '6:30 PM - 10:30 PM',
      saturday: '1:00 PM - 10:30 PM',
      sunday: '1:00 PM - 10:30 PM'
    }
  },
  {
    id: 'a-place-coffee',
    name: 'A PLACE coffee',
    address: '37 Second St, Bowden SA 5007',
    lat: -34.90559937019589,
    lng: 138.57546509800667,
    location: 'outside',
    specialty: 'Specialty coffee & matcha',
    description: 'Bowden café serving quality matcha drinks and specialty coffee.',
    openingHours: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: '7:00 AM - 3:00 PM',
      friday: '7:00 AM - 3:00 PM',
      saturday: '8:00 AM - 3:00 PM',
      sunday: '8:00 AM - 3:00 PM'
    }
  },
  {
    id: 'yuna-cafe',
    name: 'Yuna Cafe & Restaurant',
    address: 'Shop 7/34 Henley Beach Rd, Mile End SA 5031',
    lat: -34.92309116644041,
    lng: 138.57527272684322,
    location: 'outside',
    specialty: 'Korean cafe with matcha',
    description: 'Korean-style café and restaurant offering authentic matcha drinks.',
    openingHours: {
      monday: '8:00 AM - 9:00 PM',
      tuesday: '8:00 AM - 9:00 PM',
      wednesday: '8:00 AM - 9:00 PM',
      thursday: '8:00 AM - 9:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '8:00 AM - 9:00 PM',
      sunday: '8:00 AM - 9:00 PM'
    }
  },
  {
    id: 'fold',
    name: 'fold.',
    address: '124 Port Rd, Hindmarsh SA 5007',
    lat: -34.90677027139348,
    lng: 138.5733685268428,
    location: 'outside',
    specialty: 'Specialty coffee & matcha',
    description: 'Modern Hindmarsh café with quality matcha and specialty coffee.',
    openingHours: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: '7:00 AM - 3:00 PM',
      friday: '7:00 AM - 3:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: '8:00 AM - 2:00 PM'
    }
  },
  {
    id: 'two-sisters-cafe',
    name: 'Two Sisters Cafe Adelaide',
    address: '68B Woodville Rd, Woodville South SA 5011',
    lat: -34.87913157588014,
    lng: 138.53705979801722,
    location: 'outside',
    specialty: 'Vietnamese cafe with matcha',
    description: 'Vietnamese café in Woodville South serving matcha drinks and Vietnamese treats.',
    openingHours: {
      monday: 'Closed',
      tuesday: '8:00 AM - 4:00 PM',
      wednesday: '8:00 AM - 4:00 PM',
      thursday: '8:00 AM - 4:00 PM',
      friday: '8:00 AM - 4:00 PM',
      saturday: '8:00 AM - 4:00 PM',
      sunday: '8:00 AM - 4:00 PM'
    }
  },
  {
    id: 'one-2-go',
    name: 'ONE 2 GO',
    address: 'Shop 2/270 Hanson Rd, Mansfield Park SA 5012',
    lat: -34.85125087735795,
    lng: 138.54711162684146,
    location: 'outside',
    specialty: 'Asian cafe with matcha',
    description: 'Asian-inspired café in Mansfield Park offering matcha drinks.',
    openingHours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: '8:00 AM - 5:00 PM'
    }
  }
];
