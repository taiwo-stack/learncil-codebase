// src/components/blog/blog-post.tsx
"use client"

import { Calendar, MessageCircle, User, Tag, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface BlogPostData {
  id: string
  title: string
  image: string
  category: string
  categoryColor: string
  date: string
  author: string
  readTime: string
  comments: number
  content: string
  tags: string[]
}

interface BlogPostPageProps {
  postId: string
}

const blogPostsData: Record<string, BlogPostData> = {
  "1": {
    id: "1",
    title: "The 8 Best Things About Touristy",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=700&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "02 Apr 2021",
    author: "Admin",
    readTime: "5 min read",
    comments: 3,
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
    `,
    tags: ["Travel", "Tourism", "Adventure", "Tips"]
  },
  "2": {
    id: "2",
    title: "Top 10 Travel Destinations for 2024",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=700&fit=crop",
    category: "BUSINESS",
    categoryColor: "bg-blue-600",
    date: "28 Mar 2021",
    author: "Sarah Johnson",
    readTime: "8 min read",
    comments: 12,
    content: `
      <p>Planning your next adventure? Here are the top destinations that should be on your travel radar for 2024. Each offers unique experiences and unforgettable memories.</p>
      
      <h2>1. Iceland - Land of Fire and Ice</h2>
      <p>Experience the Northern Lights, geothermal hot springs, and dramatic volcanic landscapes. Iceland offers a unique blend of natural wonders that you won't find anywhere else on Earth.</p>
      
      <h2>2. Japan - Modern Meets Traditional</h2>
      <p>From ancient temples in Kyoto to futuristic cities like Tokyo, Japan offers a perfect blend of old and new. Experience cherry blossoms, traditional tea ceremonies, and cutting-edge technology all in one incredible journey.</p>
      
      <h2>3. New Zealand - Adventure Paradise</h2>
      <p>Known for its stunning landscapes, from pristine beaches to snow-capped mountains. Perfect destination for outdoor enthusiasts and Lord of the Rings fans alike.</p>
      
      <blockquote>
        "The world is a book, and those who do not travel read only one page." - Saint Augustine
      </blockquote>
      
      <p>Continue exploring these amazing destinations and plan your perfect getaway for 2024!</p>
    `,
    tags: ["Destinations", "Travel Guide", "2024", "Bucket List"]
  },
  "3": {
    id: "3",
    title: "Hidden Caves Worth Exploring",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=700&fit=crop",
    category: "ADVENTURE",
    categoryColor: "bg-orange-600",
    date: "25 Mar 2021",
    author: "Mike Chen",
    readTime: "6 min read",
    comments: 8,
    content: `
      <p>The world beneath our feet holds incredible wonders waiting to be discovered. From glowing caves to massive underground chambers, these hidden gems offer unique adventures for the bold traveler.</p>
      
      <h2>Waitomo Glowworm Caves, New Zealand</h2>
      <p>Experience the magical sight of thousands of glowworms creating a starry night underground. These bioluminescent creatures illuminate the cave ceiling, creating an otherworldly atmosphere that must be seen to be believed.</p>
      
      <h2>Son Doong Cave, Vietnam</h2>
      <p>The world's largest cave system features its own ecosystem, including a jungle and river. This massive underground world is so large it has its own weather system and could fit a 40-story skyscraper inside.</p>
      
      <h2>Mammoth Cave, USA</h2>
      <p>The longest known cave system in the world with over 400 miles of explored passageways. A UNESCO World Heritage Site offering various tours for different experience levels.</p>
      
      <blockquote>
        "In every walk with nature, one receives far more than he seeks." - John Muir
      </blockquote>
    `,
    tags: ["Caves", "Adventure", "Exploration", "Nature"]
  },
  "4": {
    id: "4",
    title: "Budget Travel Tips for Beginners",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=700&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "20 Mar 2021",
    author: "Emma Wilson",
    readTime: "7 min read",
    comments: 15,
    content: `
      <p>Traveling doesn't have to drain your bank account. With smart planning and these budget-friendly tips, you can explore the world without breaking the bank.</p>
      
      <h2>Accommodation on a Budget</h2>
      <p>Consider hostels, homestays, or budget hotels. Platforms like Airbnb offer affordable private rooms, while hostels provide great opportunities to meet fellow travelers. Look for accommodations with kitchen facilities to save on meals.</p>
      
      <h2>Transportation Hacks</h2>
      <ul>
        <li>Book flights in advance or look for last-minute deals</li>
        <li>Use budget airlines for short distances</li>
        <li>Take overnight buses or trains to save on accommodation</li>
        <li>Walk or use public transportation instead of taxis</li>
        <li>Consider travel passes for unlimited transport</li>
      </ul>
      
      <h2>Food and Dining</h2>
      <p>Eat where locals eat, cook your own meals when possible, and try street food for authentic and affordable experiences. Avoid touristy restaurants near major attractions - they're usually overpriced.</p>
      
      <blockquote>
        "Travel is the only thing you buy that makes you richer." - Unknown
      </blockquote>
    `,
    tags: ["Budget Travel", "Tips", "Money Saving", "Backpacking"]
  },
  "5": {
    id: "5",
    title: "Cultural Experiences You Can't Miss",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=700&fit=crop",
    category: "CULTURE",
    categoryColor: "bg-purple-600",
    date: "15 Mar 2021",
    author: "David Park",
    readTime: "9 min read",
    comments: 6,
    content: `
      <p>True travel is about connecting with people and experiencing cultures different from your own. Here are some unforgettable cultural experiences that will enrich your journey and create lasting memories.</p>
      
      <h2>Traditional Festivals</h2>
      <p>Participate in local festivals to witness traditions passed down through generations. From Diwali in India to Oktoberfest in Germany, festivals offer incredible insights into local culture, music, dance, and cuisine.</p>
      
      <h2>Homestay Experiences</h2>
      <p>Stay with local families to truly understand daily life and customs. Share meals, stories, and create meaningful connections that last a lifetime. This immersive experience offers perspectives you can't get from hotels.</p>
      
      <h2>Learning Local Crafts</h2>
      <p>Take workshops to learn traditional arts and crafts. Whether it's pottery in Morocco, weaving in Peru, or calligraphy in Japan, hands-on experiences create lasting memories and appreciation for local artisans.</p>
      
      <blockquote>
        "Travel makes one modest. You see what a tiny place you occupy in the world." - Gustave Flaubert
      </blockquote>
    `,
    tags: ["Culture", "Local Experiences", "Traditions", "Authentic Travel"]
  },
  "6": {
    id: "6",
    title: "Solo Travel Safety Guide",
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=700&fit=crop",
    category: "TIPS",
    categoryColor: "bg-red-600",
    date: "10 Mar 2021",
    author: "Lisa Anderson",
    readTime: "10 min read",
    comments: 20,
    content: `
      <p>Solo travel is one of the most rewarding experiences, offering freedom, self-discovery, and personal growth. However, safety should always be your top priority. Here's your comprehensive guide to staying safe while traveling alone.</p>
      
      <h2>Pre-Trip Preparation</h2>
      <ul>
        <li>Research your destination thoroughly - know the safe areas and places to avoid</li>
        <li>Share your itinerary with family or friends back home</li>
        <li>Register with your embassy or consulate</li>
        <li>Get comprehensive travel insurance that covers medical emergencies</li>
        <li>Make copies of important documents (passport, insurance, credit cards)</li>
        <li>Learn basic phrases in the local language</li>
      </ul>
      
      <h2>On-the-Ground Safety</h2>
      <p>Trust your instincts - if something feels wrong, it probably is. Avoid walking alone at night in unfamiliar areas, and keep your valuables secure. Stay connected with regular check-ins and maintain situational awareness at all times.</p>
      
      <h2>Accommodation Safety</h2>
      <p>Choose well-reviewed accommodations in safe neighborhoods. Always lock your doors and windows, use hotel safes for valuables, and be cautious about sharing your room number with strangers.</p>
      
      <blockquote>
        "Life begins at the end of your comfort zone." - Neale Donald Walsch
      </blockquote>
      
      <p>Remember, millions of people travel solo successfully every year. With proper preparation, common sense, and these safety tips, you can have an amazing and safe solo adventure.</p>
    `,
    tags: ["Solo Travel", "Safety", "Tips", "Independent Travel"]
  }
}

const relatedPosts = [
  {
    id: "3",
    title: "Hidden Caves Worth Exploring",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    category: "ADVENTURE"
  },
  {
    id: "4",
    title: "Budget Travel Tips for Beginners",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop",
    category: "TRAVELING"
  },
  {
    id: "5",
    title: "Cultural Experiences You Can't Miss",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop",
    category: "CULTURE"
  }
]

export default function BlogPostPage({ postId }: BlogPostPageProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const post = blogPostsData[postId]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-emerald-600 hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Link 
          href="/blog"
          className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Blog
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <span className={`${post.categoryColor} text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4`}>
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments} Comments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl p-4 flex gap-3 z-10">
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8'
              }}
            />

            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{post.author}</h4>
                  <p className="text-gray-600">Travel Blogger & Adventure Enthusiast</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {relatedPost.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Comments ({post.comments})</h3>
            
            <div className="mb-8">
              <textarea
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
              <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Post Comment
              </button>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-bold text-gray-900">John Doe</h5>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great article! Really helpful information for planning my next trip. Thank you for sharing!
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-bold text-gray-900">Jane Smith</h5>
                      <span className="text-sm text-gray-500">5 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      I've been to some of these places and they're absolutely amazing! Can't wait to explore more destinations from your recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          color: #4b5563;
        }
        
        .prose ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #4b5563;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  )
}