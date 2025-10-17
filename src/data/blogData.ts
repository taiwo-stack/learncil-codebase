// src/data/blogData.ts

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  categoryColor: string
  date: string
  author: string
  readTime: string
  comments: number
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The 8 Best Things About Touristy",
    excerpt: "Business is the activity of making on cing or buying and selling pro. Discover the amazing world of travel and tourism with our comprehensive guide.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=700&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "02 Apr 2021",
    author: "Admin",
    readTime: "5 min read",
    comments: 3,
    tags: ["Travel", "Tourism", "Adventure", "Tips"],
    content: `
      <p>Business is the activity of making one's living or making money by producing or buying and selling products. Simply put, it is "any activity or enterprise entered into for profit."</p>
      
      <h2>Understanding Tourism Industry</h2>
      <p>Having a business name does not separate the business entity from the owner, which means that the owner of the business is responsible and liable for debts incurred by the business. If the business acquires debts, the creditors can go after the owner's personal possessions.</p>
      
      <p>A business structure does not allow for corporate tax rates. The proprietor is personally taxed on all income from the business. The term is also often used colloquially to refer to a company, such as a corporation or cooperative.</p>
      
      <h2>Key Benefits of Tourism</h2>
      <ul>
        <li>Economic growth and development</li>
        <li>Cultural exchange and understanding</li>
        <li>Job creation and employment opportunities</li>
        <li>Infrastructure development</li>
        <li>Preservation of heritage and traditions</li>
      </ul>
      
      <blockquote>
        "Travel is the only thing you buy that makes you richer." - Anonymous
      </blockquote>
      
      <p>Corporations, in contrast with sole proprietors and partnerships, are separate legal entities with a corporate tax regime. They provide limited liability for shareholders who can only be liable for the amount they invested in the company.</p>
      
      <h2>The Future of Travel</h2>
      <p>As we move forward, sustainable tourism practices are becoming increasingly important. Travelers are now more conscious about their environmental impact and seek authentic experiences that benefit local communities.</p>
      
      <p>The tourism industry continues to evolve with technology, offering new ways to explore and experience destinations. From virtual tours to AI-powered travel planning, the future looks exciting and promising.</p>
    `
  },
  {
    id: "2",
    title: "Top 10 Travel Destinations for 2024",
    excerpt: "Explore the most breathtaking destinations that should be on your bucket list this year. From tropical paradises to historic cities.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=700&fit=crop",
    category: "BUSINESS",
    categoryColor: "bg-blue-600",
    date: "28 Mar 2021",
    author: "Sarah Johnson",
    readTime: "8 min read",
    comments: 12,
    tags: ["Destinations", "Travel Guide", "2024", "Bucket List"],
    content: `
      <p>Planning your next adventure? Here are the top destinations that should be on your travel radar for 2024. Each offers unique experiences and unforgettable memories.</p>
      
      <h2>1. Iceland - Land of Fire and Ice</h2>
      <p>Experience the Northern Lights, geothermal hot springs, and dramatic volcanic landscapes. Iceland offers a unique blend of natural wonders that you won't find anywhere else.</p>
      
      <h2>2. Japan - Modern Meets Traditional</h2>
      <p>From ancient temples to futuristic cities, Japan offers a perfect blend of old and new. Experience cherry blossoms, traditional tea ceremonies, and cutting-edge technology.</p>
      
      <h2>3. New Zealand - Adventure Paradise</h2>
      <p>Known for its stunning landscapes, from pristine beaches to snow-capped mountains. Perfect destination for outdoor enthusiasts and Lord of the Rings fans.</p>
      
      <blockquote>
        "The world is a book, and those who do not travel read only one page." - Saint Augustine
      </blockquote>
      
      <h2>4. Portugal - European Charm</h2>
      <p>Discover charming coastal towns, historic cities, and delicious cuisine. Portugal offers incredible value and authentic European experiences.</p>
      
      <h2>5. Costa Rica - Eco-Tourism Haven</h2>
      <p>Experience diverse ecosystems, from rainforests to beaches. Perfect for nature lovers and adventure seekers looking for sustainable travel options.</p>
    `
  },
  {
    id: "3",
    title: "Hidden Caves Worth Exploring",
    excerpt: "Discover underground wonders and mysterious cave systems around the world. Adventure awaits beneath the surface.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=700&fit=crop",
    category: "ADVENTURE",
    categoryColor: "bg-orange-600",
    date: "25 Mar 2021",
    author: "Mike Chen",
    readTime: "6 min read",
    comments: 8,
    tags: ["Caves", "Adventure", "Exploration", "Nature"],
    content: `
      <p>The world beneath our feet holds incredible wonders waiting to be discovered. From glowing caves to massive underground chambers, these hidden gems offer unique adventures for the bold traveler.</p>
      
      <h2>Waitomo Glowworm Caves, New Zealand</h2>
      <p>Experience the magical sight of thousands of glowworms creating a starry night underground. These bioluminescent creatures create an otherworldly atmosphere that must be seen to be believed.</p>
      
      <h2>Son Doong Cave, Vietnam</h2>
      <p>The world's largest cave system features its own ecosystem, including a jungle and river. This massive underground world is so large it has its own weather system.</p>
      
      <h2>Safety Tips for Cave Exploration</h2>
      <ul>
        <li>Always go with experienced guides</li>
        <li>Bring proper equipment and lighting</li>
        <li>Check weather conditions beforehand</li>
        <li>Never explore alone</li>
        <li>Respect the natural environment</li>
      </ul>
      
      <blockquote>
        "In every walk with nature, one receives far more than he seeks." - John Muir
      </blockquote>
    `
  },
  {
    id: "4",
    title: "Budget Travel Tips for Beginners",
    excerpt: "Learn how to travel the world without breaking the bank. Money-saving tips and tricks for budget-conscious travelers.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=700&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "20 Mar 2021",
    author: "Emma Wilson",
    readTime: "7 min read",
    comments: 15,
    tags: ["Budget Travel", "Tips", "Money Saving", "Backpacking"],
    content: `
      <p>Traveling doesn't have to drain your bank account. With smart planning and these budget-friendly tips, you can explore the world without breaking the bank.</p>
      
      <h2>Accommodation on a Budget</h2>
      <p>Consider hostels, homestays, or budget hotels. Platforms like Airbnb offer affordable private rooms, while hostels provide great opportunities to meet fellow travelers.</p>
      
      <h2>Transportation Hacks</h2>
      <ul>
        <li>Book flights in advance or look for last-minute deals</li>
        <li>Use budget airlines for short distances</li>
        <li>Take overnight buses or trains to save on accommodation</li>
        <li>Walk or use public transportation instead of taxis</li>
      </ul>
      
      <h2>Food and Dining</h2>
      <p>Eat where locals eat, cook your own meals when possible, and try street food for authentic and affordable experiences. Avoid touristy restaurants near major attractions.</p>
      
      <blockquote>
        "Travel is the only thing you buy that makes you richer." - Unknown
      </blockquote>
    `
  },
  {
    id: "5",
    title: "Cultural Experiences You Can't Miss",
    excerpt: "Immerse yourself in local cultures and traditions. A guide to authentic cultural experiences around the globe.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=700&fit=crop",
    category: "CULTURE",
    categoryColor: "bg-purple-600",
    date: "15 Mar 2021",
    author: "David Park",
    readTime: "9 min read",
    comments: 6,
    tags: ["Culture", "Local Experiences", "Traditions", "Authentic Travel"],
    content: `
      <p>True travel is about connecting with people and experiencing cultures different from your own. Here are some unforgettable cultural experiences that will enrich your journey.</p>
      
      <h2>Traditional Festivals</h2>
      <p>Participate in local festivals to witness traditions passed down through generations. From Diwali in India to Oktoberfest in Germany, festivals offer incredible insights into local culture.</p>
      
      <h2>Homestay Experiences</h2>
      <p>Stay with local families to truly understand daily life and customs. Share meals, stories, and create meaningful connections that last a lifetime.</p>
      
      <h2>Learning Local Crafts</h2>
      <p>Take workshops to learn traditional arts and crafts. Whether it's pottery in Morocco or weaving in Peru, hands-on experiences create lasting memories.</p>
      
      <blockquote>
        "Travel makes one modest. You see what a tiny place you occupy in the world." - Gustave Flaubert
      </blockquote>
    `
  },
  {
    id: "6",
    title: "Solo Travel Safety Guide",
    excerpt: "Essential safety tips for solo travelers. Stay safe while exploring the world on your own terms.",
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=700&fit=crop",
    category: "TIPS",
    categoryColor: "bg-red-600",
    date: "10 Mar 2021",
    author: "Lisa Anderson",
    readTime: "10 min read",
    comments: 20,
    tags: ["Solo Travel", "Safety", "Tips", "Independent Travel"],
    content: `
      <p>Solo travel is one of the most rewarding experiences, offering freedom and self-discovery. However, safety should always be your top priority. Here's how to stay safe while traveling alone.</p>
      
      <h2>Pre-Trip Preparation</h2>
      <ul>
        <li>Research your destination thoroughly</li>
        <li>Share your itinerary with family or friends</li>
        <li>Register with your embassy</li>
        <li>Get comprehensive travel insurance</li>
        <li>Make copies of important documents</li>
      </ul>
      
      <h2>On-the-Ground Safety</h2>
      <p>Trust your instincts, avoid walking alone at night in unfamiliar areas, and keep your valuables secure. Stay connected with regular check-ins and maintain situational awareness.</p>
      
      <h2>Accommodation Safety</h2>
      <p>Choose well-reviewed accommodations in safe neighborhoods. Always lock your doors and windows, use hotel safes for valuables, and be cautious about sharing your room number.</p>
      
      <blockquote>
        "Life begins at the end of your comfort zone." - Neale Donald Walsch
      </blockquote>
      
      <p>Remember, millions of people travel solo successfully every year. With proper preparation and common sense, you can have an amazing and safe adventure.</p>
    `
  }
]

// Helper function to get a single blog post
export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
}

// Helper function to get related posts
export function getRelatedPosts(currentPostId: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit)
}