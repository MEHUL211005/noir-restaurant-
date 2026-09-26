export const restaurant = {
  name: 'NOIR',
  tagline: 'Tradition, Reimagined.',
  phone: '+1 (212) 555-0148',
  email: 'reservations@noirrestaurant.com',
  address: '128 Crosby Street, SoHo, New York, NY 10012',
  map: {
    lat: 40.7243,
    lng: -73.9973,
    label: 'NOIR — 128 Crosby St, SoHo',
  },
  hours: {
    monday: 'Closed',
    tuesday: '5:00 PM — 11:00 PM',
    wednesday: '5:00 PM — 11:00 PM',
    thursday: '5:00 PM — 11:00 PM',
    friday: '5:00 PM — 12:00 AM',
    saturday: '5:00 PM — 12:00 AM',
    sunday: '5:00 PM — 10:00 PM',
  },
  hoursList: [
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday', time: '5:00 PM — 11:00 PM' },
    { day: 'Wednesday', time: '5:00 PM — 11:00 PM' },
    { day: 'Thursday', time: '5:00 PM — 11:00 PM' },
    { day: 'Friday', time: '5:00 PM — 12:00 AM' },
    { day: 'Saturday', time: '5:00 PM — 12:00 AM' },
    { day: 'Sunday', time: '5:00 PM — 10:00 PM' },
  ],
  chef: {
    name: 'Chef Aarav Kapoor',
    role: 'Founder & Executive Chef',
    resume:
      'Aarav trained at The Oberoi in Mumbai and spent a decade across Michelin kitchens in London and Copenhagen before returning home to reimagine the flavours of his grandmother’s kitchen.',
    quote: 'I don’t modernise Indian food. I simply listen to it more closely.',
  },
  story: [
    {
      title: 'The Beginning',
      body: 'NOIR began as a seventeen-seat room above a spice shop in SoHo, where Chef Aarav cooked tasting menus for a dozen guests a night. The menu changed with the moon. The promise never did: cook the flavours of home with the rigour of a laboratory and the soul of a festival.',
    },
    {
      title: 'The Philosophy',
      body: 'We believe Indian food does not need a disclaimer. It needs precision, patience and theatre. Our sauces simmer for a day. Our spices are stone-ground in small batches. Our kitchen moves to the rhythm of an open fire — and a quiet dedication to the ingredient.',
    },
  ],
  philosophy: [
    {
      title: 'Fire first',
      body: 'Every serious plate passes through flame — charcoal, tandoor, or ember. Smoke is not an accent here; it is a foundation.',
    },
    {
      title: 'Spice with intention',
      body: 'Heat is a conversation, never a shout. We build layers of aroma, warmth and finish rather than a single note of chilli.',
    },
    {
      title: 'One market, every morning',
      body: 'Produce is chosen the way it has always been in India — by hand, by season, by smell. Our menu bows to what arrives.',
    },
  ],
  ingredients: [
    'Aged basmati from the Amritsar corridor',
    'Stone-ground chilli from Guntur',
    'Cold-pressed mustard oil from Bengal',
    'Saffron threaded from Pampore',
    'Black cardamom from the Sikkim foothills',
    'Mangoes from the Alphonso orchards of Ratnagiri',
  ],
  privateDining: [
    {
      type: 'Corporate Dining',
      title: 'The Boardroom',
      description: 'A private salon seating up to fourteen, with dedicated service, curated set menus and an AV-ready table for presentations that linger.',
      image: '/images/private-corporate.jpg',
      capacity: 'Up to 14 guests',
    },
    {
      type: 'Weddings',
      title: 'The Gallery',
      description: 'An intimate candle-lit floor for up to sixty guests — from the vidai roka to the sangeet — staged with gardenias, brass and baraat-level dancing.',
      image: '/images/private-wedding.jpg',
      capacity: 'Up to 60 guests',
    },
    {
      type: 'Celebrations',
      title: 'The Library',
      description: 'A velvet-walled room for birthdays, anniversaries and small victories, complete with a private bar and a dessert mehfil.',
      image: '/images/private-celebration.jpg',
      capacity: 'Up to 24 guests',
    },
    {
      type: `Chef's Table`,
      title: 'The Tandoor Kitchen',
      description: 'Twelve seats inside the fire kitchen. Watch Chef Aarav build a nine-course menu in front of you, course by course, flame by flame.',
      image: '/images/private-chef-table.jpg',
      capacity: '12 guests, one sitting',
    },
  ],
}

export const faqs = [
  {
    question: 'Do you accept reservations?',
    answer:
      'Yes. We recommend reserving two to three weeks in advance for weekend evenings. A small number of seats are held nightly for walk-ins at the bar.',
  },
  {
    question: 'Do you offer vegetarian dishes?',
    answer:
      'Over half of our menu is vegetarian and much of it vegan on request. Our dal makhani, paneer list and vegetable biryani are permanent members of the roster.',
  },
  {
    question: 'Do you accommodate allergies?',
    answer:
      'Absolutely. Tell us at booking and again on arrival. Our team handles nuts, gluten, dairy and shellfish with separate prep stations and clearly marked menus.',
  },
  {
    question: 'Do you offer private dining?',
    answer:
      'We have four private spaces — from the twelve-seat Chef’s Table to the Gallery, which hosts up to sixty guests for weddings and larger celebrations.',
  },
  {
    question: 'Do you offer takeaway?',
    answer:
      'Yes, we offer a pared-back takeaway menu nightly from 5 PM. Order through the checkout on this site or call the restaurant directly.',
  },
  {
    question: 'What is your dress code?',
    answer:
      'Smart casual. Velvet and linen are equally welcome. We ask only that you arrive hungry and a little curious.',
  },
]