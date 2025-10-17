"use client"

import { Calendar, MessageCircle, ArrowRight, Search, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Extended blog posts data
const allBlogPosts = [
  {
    id: "1",
    title: "The 8 best things about Touristy",
    excerpt: "Business is the activity of making on cing or buying and selling pro. Discover the amazing world of travel and tourism with our comprehensive guide.",
    content: "Full blog content here...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "02 Apr 2021",
    comments: 3,
    author: "Admin",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Top 10 Travel Destinations for 2024",
    excerpt: "Explore the most breathtaking destinations that should be on your bucket list this year. From tropical paradises to historic cities.",
    content: "Full blog content here...",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    category: "BUSINESS",
    categoryColor: "bg-blue-600",
    date: "28 Mar 2021",
    comments: 12,
    author: "Sarah Johnson",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "Hidden Caves Worth Exploring",
    excerpt: "Discover underground wonders and mysterious cave systems around the world. Adventure awaits beneath the surface.",
    content: "Full blog content here...",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    category: "ADVENTURE",
    categoryColor: "bg-orange-600",
    date: "25 Mar 2021",
    comments: 8,
    author: "Mike Chen",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Budget Travel Tips for Beginners",
    excerpt: "Learn how to travel the world without breaking the bank. Money-saving tips and tricks for budget-conscious travelers.",
    content: "Full blog content here...",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "20 Mar 2021",
    comments: 15,
    author: "Emma Wilson",
    readTime: "7 min read"
  },
  {
    id: "5",
    title: "Cultural Experiences You Can't Miss",
    excerpt: "Immerse yourself in local cultures and traditions. A guide to authentic cultural experiences around the globe.",
    content: "Full blog content here...",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
    category: "CULTURE",
    categoryColor: "bg-purple-600",
    date: "15 Mar 2021",
    comments: 6,
    author: "David Park",
    readTime: "9 min read"
  },
  {
    id: "6",
    title: "Solo Travel Safety Guide",
    excerpt: "Essential safety tips for solo travelers. Stay safe while exploring the world on your own terms.",
    content: "Full blog content here...",
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&h=600&fit=crop",
    category: "TIPS",
    categoryColor: "bg-red-600",
    date: "10 Mar 2021",
    comments: 20,
    author: "Lisa Anderson",
    readTime: "10 min read"
  }
]

const categories = ["All", "TRAVELING", "BUSINESS", "ADVENTURE", "CULTURE", "TIPS"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Travel Blog & Stories
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto">
            Discover inspiring travel stories, tips, and guides from around the world
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`${post.categoryColor} text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1`}>
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author and Read More */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}