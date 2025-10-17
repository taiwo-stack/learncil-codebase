// tours-data.ts - Centralized tour database

export interface Tour {
  id: string
  title: string
  description: string
  shortDescription: string
  price: number
  originalPrice: number
  duration: string
  category: string
  location: string
  badge?: string
  images: string[]
  maxParticipants: number
  minParticipants: number
  rating: number
  reviews: number
  availability: string
  departureDate: string
  departureTime: string
  returnTime: string
  included: string[]
  notIncluded: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
  }[]
  meetingPoint: string
  tourGuide: {
    name: string
    image: string
    rating: number
    tours: number
    languages: string[]
  }
}



export const toursDatabase: Tour[] = [
  {
    id: "abuja-adventure-7days",
    title: "7 Days and 6 Nights Adventure Tour From Abuja",
    description: "Experience the stunning coastal views and vibrant culture of Nigeria's capital city. This comprehensive tour takes you through historical landmarks, cultural centers, and breathtaking natural scenery. Discover hidden gems, taste authentic Nigerian cuisine, and immerse yourself in the rich heritage of Abuja.",
    shortDescription: "Discover the heart of Nigeria with our exclusive Abuja adventure tour",
    price: 169000,
    originalPrice: 199000,
    duration: "7 days",
    category: "Adventure",
    location: "Nigeria, Abuja",
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86a3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop"
    ],
    maxParticipants: 12,
    minParticipants: 4,
    rating: 5,
    reviews: 24,
    availability: "Available",
    departureDate: "Every Saturday",
    departureTime: "6:00 AM",
    returnTime: "8:00 PM (Day 7)",
    included: [
      "Professional tour guide",
      "All entrance fees to attractions",
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast and 3 dinners",
      "Private air-conditioned transportation",
      "Airport pickup and drop-off",
      "Travel insurance",
      "Bottled water during tours"
    ],
    notIncluded: [
      "International flights",
      "Personal expenses",
      "Lunch (except where specified)",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Travel visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Orientation",
        description: "Airport pickup, hotel check-in, and evening city orientation tour. Welcome dinner included.",
        activities: ["Airport pickup", "Hotel check-in", "City orientation", "Welcome dinner"]
      },
      {
        day: 2,
        title: "Abuja City Tour",
        description: "Visit Aso Rock, National Mosque, Nigerian National Museum, and Arts & Crafts Village.",
        activities: ["Aso Rock visit", "National Mosque", "National Museum", "Crafts Village shopping"]
      },
      {
        day: 3,
        title: "Zuma Rock & Gurara Falls",
        description: "Full day excursion to the iconic Zuma Rock and refreshing Gurara Falls.",
        activities: ["Zuma Rock photography", "Gurara Falls swimming", "Picnic lunch", "Nature walk"]
      },
      {
        day: 4,
        title: "Millennium Park & Jabi Lake",
        description: "Relaxing day at Millennium Park followed by boat cruise on Jabi Lake.",
        activities: ["Park exploration", "Boat cruise", "Lakeside lunch", "Shopping at Jabi Mall"]
      },
      {
        day: 5,
        title: "Cultural Experience",
        description: "Visit local villages, experience traditional dances, and authentic Nigerian cuisine.",
        activities: ["Village tour", "Traditional dance show", "Cooking class", "Market visit"]
      },
      {
        day: 6,
        title: "Leisure & Shopping",
        description: "Free morning, afternoon shopping at best local markets and malls.",
        activities: ["Leisure time", "Shopping tour", "Optional spa treatment", "Farewell dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Breakfast, final souvenir shopping, and airport transfer.",
        activities: ["Hotel checkout", "Last-minute shopping", "Airport transfer"]
      }
    ],
    meetingPoint: "Nnamdi Azikiwe International Airport, Abuja",
    tourGuide: {
      name: "Chidi Okonkwo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 4.9,
      tours: 156,
      languages: ["English", "Yoruba", "Igbo", "Hausa"]
    }
  },
  {
    id: "lagos-coastal-5days",
    title: "5 Days Lagos Coastal & Cultural Experience",
    description: "Explore the vibrant streets of Lagos, from the bustling markets of Balogun to the serene beaches of Lekki. Experience the nightlife, taste amazing street food, and discover why Lagos never sleeps!",
    shortDescription: "Discover the energy and culture of Nigeria's economic capital",
    price: 145000,
    originalPrice: 175000,
    duration: "5 days",
    category: "Cultural",
    location: "Nigeria, Lagos",
    badge: "Hot Sell",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
    ],
    maxParticipants: 15,
    minParticipants: 5,
    rating: 4.8,
    reviews: 42,
    availability: "Available",
    departureDate: "Every Friday",
    departureTime: "8:00 AM",
    returnTime: "6:00 PM (Day 5)",
    included: [
      "Expert local guide",
      "4 nights hotel accommodation",
      "Daily breakfast",
      "Transportation in Lagos",
      "Lekki Conservation Centre entry",
      "Nike Art Gallery visit",
      "Beach activities",
      "Welcome dinner"
    ],
    notIncluded: [
      "Flights to/from Lagos",
      "Lunch and dinner (except welcome dinner)",
      "Personal shopping",
      "Optional activities",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Island Tour",
        description: "Airport pickup, Victoria Island exploration, and welcome dinner at a rooftop restaurant.",
        activities: ["Airport pickup", "VI exploration", "Lekki Phase 1 tour", "Rooftop dinner"]
      },
      {
        day: 2,
        title: "Markets & Museums",
        description: "Visit Balogun Market, Nike Art Gallery, and National Museum Lagos.",
        activities: ["Balogun Market", "Nike Art Gallery", "National Museum", "Street food tasting"]
      },
      {
        day: 3,
        title: "Beach Day",
        description: "Full day at Elegushi Beach with water sports and beach volleyball.",
        activities: ["Beach relaxation", "Water sports", "Beachside lunch", "Sunset viewing"]
      },
      {
        day: 4,
        title: "Lekki Conservation & Nightlife",
        description: "Morning at Lekki Conservation Centre, evening Lagos nightlife experience.",
        activities: ["Canopy walk", "Wildlife viewing", "Dinner cruise", "Nightclub experience"]
      },
      {
        day: 5,
        title: "Shopping & Departure",
        description: "Last-minute shopping at Lekki Market and airport transfer.",
        activities: ["Lekki Market shopping", "Souvenir hunting", "Airport transfer"]
      }
    ],
    meetingPoint: "Murtala Muhammed International Airport, Lagos",
    tourGuide: {
      name: "Amina Bello",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 4.8,
      tours: 132,
      languages: ["English", "Yoruba", "French"]
    }
  },
  {
    id: "calabar-beach-6days",
    title: "6 Days Calabar Beach & Nature Retreat",
    description: "Escape to the pristine beaches of Calabar, explore the lush rainforests, and witness the famous Calabar Carnival atmosphere. Perfect for nature lovers and beach enthusiasts!",
    shortDescription: "Relax on beautiful beaches and explore rainforest wonders",
    price: 135000,
    originalPrice: 165000,
    duration: "6 days",
    category: "Relaxation",
    location: "Nigeria, Calabar",
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop"
    ],
    maxParticipants: 10,
    minParticipants: 4,
    rating: 4.9,
    reviews: 31,
    availability: "Available",
    departureDate: "Every Monday",
    departureTime: "9:00 AM",
    returnTime: "5:00 PM (Day 6)",
    included: [
      "Professional nature guide",
      "5 nights beachfront accommodation",
      "All meals included",
      "Obudu Mountain Resort visit",
      "Canopy walkway experience",
      "Boat rides",
      "Airport transfers"
    ],
    notIncluded: [
      "Flight tickets",
      "Alcoholic beverages",
      "Spa treatments",
      "Personal expenses",
      "Optional adventure activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Welcome",
        description: "Airport pickup, check-in at beachfront resort, and sunset beach walk.",
        activities: ["Airport pickup", "Resort check-in", "Beach orientation", "Seafood dinner"]
      },
      {
        day: 2,
        title: "Tinapa & Calabar Museum",
        description: "Visit Tinapa Business Resort and explore Calabar Museum.",
        activities: ["Tinapa shopping", "Museum tour", "Cultural center", "Local cuisine tasting"]
      },
      {
        day: 3,
        title: "Obudu Mountain Resort",
        description: "Full day trip to the famous Obudu Mountain Resort with cable car ride.",
        activities: ["Cable car ride", "Mountain hiking", "Resort exploration", "Mountain cuisine"]
      },
      {
        day: 4,
        title: "Canopy Walkway Adventure",
        description: "Experience the thrilling canopy walkway and rainforest exploration.",
        activities: ["Canopy walk", "Rainforest tour", "Bird watching", "Nature photography"]
      },
      {
        day: 5,
        title: "Beach Activities",
        description: "Full day of beach relaxation, water sports, and boat cruise.",
        activities: ["Beach games", "Snorkeling", "Boat cruise", "Beach BBQ"]
      },
      {
        day: 6,
        title: "Marina Resort & Departure",
        description: "Morning at Marina Resort, souvenir shopping, and airport transfer.",
        activities: ["Marina Resort visit", "Shopping", "Farewell lunch", "Airport transfer"]
      }
    ],
    meetingPoint: "Margaret Ekpo International Airport, Calabar",
    tourGuide: {
      name: "Emmanuel Okon",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 4.9,
      tours: 98,
      languages: ["English", "Efik", "Ibibio"]
    }
  },
  {
    id: "enugu-historical-4days",
    title: "4 Days Enugu Historical & Coal City Tour",
    description: "Journey through Nigeria's coal city, explore ancient caves, visit historical sites, and experience the cool climate of the Eastern heartland.",
    shortDescription: "Discover the historical gems and natural wonders of Enugu",
    price: 95000,
    originalPrice: 120000,
    duration: "4 days",
    category: "Historical",
    location: "Nigeria, Enugu",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1200&h=800&fit=crop"
    ],
    maxParticipants: 12,
    minParticipants: 4,
    rating: 4.7,
    reviews: 18,
    availability: "Available",
    departureDate: "Every Thursday",
    departureTime: "7:00 AM",
    returnTime: "7:00 PM (Day 4)",
    included: [
      "Knowledgeable history guide",
      "3 nights hotel accommodation",
      "Daily breakfast and 2 dinners",
      "All site entrance fees",
      "Transportation",
      "Awhum Waterfall visit",
      "Ngwo Pine Forest exploration"
    ],
    notIncluded: [
      "Flight tickets",
      "Lunch (except where stated)",
      "Personal purchases",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Tour",
        description: "Airport pickup, hotel check-in, and Enugu city orientation tour.",
        activities: ["Airport pickup", "Hotel check-in", "City tour", "Coal Mine visit"]
      },
      {
        day: 2,
        title: "Awhum Waterfall & Cave",
        description: "Visit the stunning Awhum Waterfall and explore the monastery cave.",
        activities: ["Waterfall hiking", "Cave exploration", "Monastery visit", "Nature walk"]
      },
      {
        day: 3,
        title: "Ngwo Pine Forest & Ezeagu",
        description: "Explore Ngwo Pine Forest and visit Ezeagu Tourist Complex.",
        activities: ["Pine forest walk", "Ezeagu caves", "Lake viewing", "Cultural displays"]
      },
      {
        day: 4,
        title: "Markets & Departure",
        description: "Visit Ogbete Main Market, last-minute shopping, and airport transfer.",
        activities: ["Market shopping", "Craft centers", "Souvenir hunting", "Airport transfer"]
      }
    ],
    meetingPoint: "Akanu Ibiam International Airport, Enugu",
    tourGuide: {
      name: "Chioma Nwankwo",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 4.7,
      tours: 87,
      languages: ["English", "Igbo"]
    }
  },
  {
    id: "jos-plateau-5days",
    title: "5 Days Jos Plateau & Wildlife Safari",
    description: "Experience the cool climate of Jos, visit wildlife parks, explore rock formations, and enjoy the scenic beauty of the Plateau State.",
    shortDescription: "Cool climate adventure with wildlife and scenic plateaus",
    price: 125000,
    originalPrice: 155000,
    duration: "5 days",
    category: "Adventure",
    location: "Nigeria, Jos",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86a3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&h=800&fit=crop"
    ],
    maxParticipants: 14,
    minParticipants: 5,
    rating: 4.6,
    reviews: 22,
    availability: "Available",
    departureDate: "Every Wednesday",
    departureTime: "8:30 AM",
    returnTime: "6:30 PM (Day 5)",
    included: [
      "Wildlife expert guide",
      "4 nights accommodation",
      "All meals included",
      "Jos Wildlife Park entry",
      "Shere Hills hiking",
      "Riyom Rock Formation visit",
      "Transportation"
    ],
    notIncluded: [
      "Flights",
      "Personal expenses",
      "Photography permits",
      "Optional horseback riding",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Jos Museum",
        description: "Airport pickup, city tour, and visit to Jos Museum and Zoo.",
        activities: ["Airport pickup", "City orientation", "Jos Museum", "Zoo visit"]
      },
      {
        day: 2,
        title: "Wildlife Park Safari",
        description: "Full day safari at Jos Wildlife Park.",
        activities: ["Morning safari", "Wildlife photography", "Picnic lunch", "Afternoon game drive"]
      },
      {
        day: 3,
        title: "Shere Hills Adventure",
        description: "Hiking expedition to Shere Hills with panoramic views.",
        activities: ["Hill hiking", "Rock climbing", "Scenic photography", "Cultural village visit"]
      },
      {
        day: 4,
        title: "Riyom Rock Formation",
        description: "Explore the unique Riyom Rock Formations and local pottery.",
        activities: ["Rock exploration", "Pottery workshop", "Local market", "Sunset viewing"]
      },
      {
        day: 5,
        title: "Rayfield Resort & Departure",
        description: "Morning at Rayfield Resort, shopping, and airport transfer.",
        activities: ["Resort activities", "Craft shopping", "Lunch", "Airport transfer"]
      }
    ],
    meetingPoint: "Yakubu Gowon Airport, Jos",
    tourGuide: {
      name: "David Gyang",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 4.6,
      tours: 76,
      languages: ["English", "Hausa", "Berom"]
    }
  },
  {
    id: "port-harcourt-riverine-4days",
    title: "4 Days Port Harcourt Riverine & Garden City Tour",
    description: "Discover the Garden City, cruise through rivers, visit parks and enjoy the vibrant nightlife of Nigeria's oil city.",
    shortDescription: "Experience the riverside beauty and urban charm of Port Harcourt",
    price: 115000,
    originalPrice: 140000,
    duration: "4 days",
    category: "City Tour",
    location: "Nigeria, Port Harcourt",
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop"
    ],
    maxParticipants: 12,
    minParticipants: 4,
    rating: 4.5,
    reviews: 15,
    availability: "Available",
    departureDate: "Every Sunday",
    departureTime: "10:00 AM",
    returnTime: "8:00 PM (Day 4)",
    included: [
      "City expert guide",
      "3 nights hotel stay",
      "Daily breakfast",
      "River cruise",
      "Isaac Boro Park visit",
      "Transportation",
      "Welcome dinner"
    ],
    notIncluded: [
      "Flight tickets",
      "Lunch and dinner (except welcome)",
      "Personal shopping",
      "Optional boat tours",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Lights",
        description: "Airport pickup, hotel check-in, evening city tour and welcome dinner.",
        activities: ["Airport pickup", "Hotel check-in", "City tour", "Pleasure Park visit"]
      },
      {
        day: 2,
        title: "Rivers & Parks",
        description: "River cruise and visit to Isaac Boro Park and Port Harcourt Zoo.",
        activities: ["Morning river cruise", "Isaac Boro Park", "Zoo visit", "Garden tour"]
      },
      {
        day: 3,
        title: "Cultural & Shopping",
        description: "Visit cultural centers, markets, and shopping malls.",
        activities: ["Cultural center", "Mile 3 Market", "Shopping mall", "Nightlife experience"]
      },
      {
        day: 4,
        title: "Leisure & Departure",
        description: "Free morning, last-minute shopping, and airport transfer.",
        activities: ["Hotel leisure", "Souvenir shopping", "Lunch", "Airport transfer"]
      }
    ],
    meetingPoint: "Port Harcourt International Airport",
    tourGuide: {
      name: "Blessing Amadi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 4.5,
      tours: 64,
      languages: ["English", "Igbo", "Ikwerre"]
    }
  }
]

// Helper function to get tour by ID
export const getTourById = (id: string): Tour | undefined => {
  return toursDatabase.find(tour => tour.id === id)
}

// Helper function to get tours by category
export const getToursByCategory = (category: string): Tour[] => {
  if (category === "All" || !category) return toursDatabase
  return toursDatabase.filter(tour => tour.category === category)
}

// Helper function to get featured tours (for homepage)
export const getFeaturedTours = (limit: number = 4): Tour[] => {
  return toursDatabase.slice(0, limit)
}

// Get all unique categories
export const getCategories = (): string[] => {
  const categories = toursDatabase.map(tour => tour.category)
  return ["All", ...Array.from(new Set(categories))]
}