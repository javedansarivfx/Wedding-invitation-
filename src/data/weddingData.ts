export interface WeddingEvent {
  id: string;
  name: string;
  arabicName: string;
  dateStr: string;
  timingDetails: {
    label: string;
    time: string;
    sublabel?: string;
  }[];
  venueTitle: string;
  address: string;
  dressCode: string;
  dressColorPalette: string[];
  description: string;
  highlights: string[];
}

export interface StoryMilestone {
  id: string;
  title: string;
  arabicSubtitle: string;
  caption: string;
  description: string;
  image: string;
}

export const WEDDING_DATA = {
  groom: {
    name: 'JAVED ANSARI',
    parentLine: 'SON OF FAROOK ANSARI',
    brothers: ['Shadab Ahmad', 'Danish Ansari'],
    paternalFamily: [
      'Idris Ahmad',
      'Khurshid Ahmad',
      'Alimuddin (Marhoom)',
      'Badruddin — Ex-Pradhan',
    ],
    residence: {
      title: "GROOM'S RESIDENCE",
      village: 'NEHTOUR VILLAGE',
      locality: 'SIKANDERPUR',
      district: 'DISTRICT BIJNOUR',
      houseNo: 'HOUSE NO. 101',
    },
  },
  bride: {
    name: 'ROSHAN ANSARI',
    parentLine: 'DAUGHTER OF HAZI RAESUDDIN',
    father: 'HAZI RAESUDDIN',
    brother: 'TANVEER AHMAD',
    village: 'VILLAGE BAIRAM NAGAR',
    city: 'NEHTOUR',
  },
  invitationMessage:
    "With the blessings of Allah Subhanahu wa Ta'ala and with the love and blessings of our families, we cordially invite you to grace the auspicious occasion of the Nikah and wedding celebrations of Javed Ansari and Roshan Ansari.",
  monogram: 'J & R',
  venue: {
    name: 'THE ROYAL IMPERIAL PALACE',
    address: 'Near Noorpur Road, Nehtour, Bijnor, Uttar Pradesh',
    shortAddress: 'NEHTOUR, BIJNOR, UTTAR PRADESH',
    mapImage: '/src/assets/images/illustrated_map_1790681453574.jpg',
  },
  countdownTarget: '2026-12-05T12:00:00',
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'haldi',
    name: 'HALDI CEREMONY',
    arabicName: 'مراسم الحناء والصفاء',
    dateStr: '04 DECEMBER',
    timingDetails: [
      {
        label: 'STARTS',
        time: '6:00 PM',
        sublabel: 'EVENING',
      },
    ],
    venueTitle: 'SIKANDERPUR',
    address: 'SIKANDERPUR, NEHTOUR',
    dressCode: 'Warm Festive Yellow, Mustard & Ivory',
    dressColorPalette: ['#E5A93B', '#D97706', '#FAF7F2', '#2D241E'],
    description:
      'A blessed evening bathed in turmeric glow, joyful family laughter, traditional songs, and fragrant jasmine garlands celebrating the prelude to the sacred union.',
    highlights: [
      'Ubtan & Fragrant Turmeric Ritual',
      'Traditional Awadhi Folk Melodies',
      'Gourmet Festive Delicacies',
    ],
  },
  {
    id: 'nikah',
    name: 'BARAAT & NIKAH',
    arabicName: 'عقد القران والبرات الملكي',
    dateStr: '05 DECEMBER',
    timingDetails: [
      {
        label: 'BARAAT',
        time: '12:00 PM',
        sublabel: 'NOON',
      },
      {
        label: 'NIKAH',
        time: '4:00 PM',
        sublabel: 'EVENING',
      },
    ],
    venueTitle: 'THE ROYAL IMPERIAL PALACE',
    address: 'NEHTOUR',
    dressCode: 'Royal Sherwani & Traditional Elegance',
    dressColorPalette: ['#C59A3F', '#FAF7F2', '#1B4D3E', '#8C6D3B'],
    description:
      'The solemn solemnization of holy matrimony under the grace of Allah (SWT), followed by the grand Baraat reception with royal Mughal feasts and timeless prayers.',
    highlights: [
      'Khutbah an-Nikah & Sacred Vows',
      'Solemn Nikahnama Signing',
      'Dedicated Prayer Halls (Asr & Maghrib)',
      'Grand Royal Shahi Dawat Feast',
    ],
  },
  {
    id: 'walima',
    name: 'WALIMA',
    arabicName: 'وليمة العرس المباركة',
    dateStr: '06 DECEMBER',
    timingDetails: [
      {
        label: 'TIME',
        time: '12:00 PM',
        sublabel: 'NOON',
      },
    ],
    venueTitle: 'GRAND BANQUET PAVILION',
    address: 'NEHTOUR',
    dressCode: 'Formal Luxury Attire',
    dressColorPalette: ['#2A2118', '#C59A3F', '#9E7A38', '#FFFDF9'],
    description:
      'The Sunnah feast of thanksgiving, welcoming esteemed elders, family, and loved ones to dine together and bestow their sincere du’as upon Javed and Roshan.',
    highlights: [
      'Sunnah Walima Feast of Gratitude',
      'Commemorative Family Portraits',
      'Traditional Awadhi & Mughlai Cuisine',
    ],
  },
];

export const COUPLE_GALLERY_ITEMS: StoryMilestone[] = [
  {
    id: '1',
    title: 'The Divine Harmony',
    arabicSubtitle: 'تَقْدِيرُ اللَّهِ وَبَرَكَتُهُ',
    caption: 'Two souls brought together with family blessing and shared faith',
    description:
      'A sacred union rooted in mutual devotion, deep respect, and the cherished traditions of our families across Nehtour.',
    image: '/src/assets/images/couple_portrait_art_1790680993480.jpg',
  },
  {
    id: '2',
    title: 'Prelude of Joy & Colors',
    arabicSubtitle: 'مَرَاسِمُ الْفَرَحِ وَالنُّورِ',
    caption: 'Celebrating the fragrant beginnings of the Haldi and Mehndi ceremonies',
    description:
      'Adorned in heirloom heritage and the fragrance of roses, awaiting the blessed vows of Nikah.',
    image: '/src/assets/images/couple_haldi_nikah_1790681471080.jpg',
  },
  {
    id: '3',
    title: 'An Eternal Covenant',
    arabicSubtitle: 'مِيثَاقاً غَلِيظاً',
    caption: 'Walking together toward a life illuminated by Mawaddah and Rahmah',
    description:
      'Stepping into this new chapter with hearts full of gratitude, seeking the prayers and love of all our elders and friends.',
    image: '/src/assets/images/mughal_floral_arch_1790680981761.jpg',
  },
];
