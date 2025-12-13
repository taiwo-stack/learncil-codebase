"use client"

import { Calendar, MessageCircle, ArrowRight, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: "1",
    title: "The 8 best things about Touristy",
    excerpt: "Business is the activity of making on cing or buying and selling pro",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "TRAVELING",
    categoryColor: "bg-emerald-600",
    date: "02 Apr 2021",
    comments: 3,
    author: "Admin"
  },
  {
    id: "2",
    title: "The 8 best things about Touristy",
    excerpt: "Business is the activity of making on cing or buying and selling pro",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "BUSINESS",
    categoryColor: "bg-emerald-600",
    date: "02 Apr 2021",
    comments: 3,
    author: "Admin"
  },
  {
    id: "3",
    title: "The 8 best things about Touristy",
    excerpt: "Business is the activity of making on cing or buying and selling pro",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    category: "CAVESSE",
    categoryColor: "bg-emerald-600",
    date: "02 Apr 2021",
    comments: 3,
    author: "Admin"
  }
]

export function BlogSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-rose-50 via-slate-50/40 to-gray-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold mb-2 text-sm md:text-base">FROM THE BLOG</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest News & Articles
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with our latest insights, stories, and educational content.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`${post.categoryColor} text-white px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span>Comments({post.comments})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <Link 
                  href={`/blog/${post.id}`} // This now correctly links to the dynamic page
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="text-center mt-16">
          <Link href="/blog">
            <button className="group inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              VIEW ALL ARTICLES
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}