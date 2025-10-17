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
    <section className="py-16 sm:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">Explore the world</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Latest News & Articles
          </h2>
          <h3 className="text-3xl md:text-4xl font-light text-blue-300 italic">
            From The Blog
          </h3>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
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
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Coments({post.comments})</span>
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
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all group"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700/30 rounded-full blur-2xl"></div>
          
          {/* Plane Icon */}
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-1">
                  Ready To Adventure And Enjoy Natural
                </h3>
                <p className="text-emerald-50 text-sm md:text-base">
                  Lorem Ipsum Dolor Sit Amet, Consectetur Notted Adipisicin
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="relative z-10">
            <Link href="/tours">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap">
                LET&apos;S GET STARTED
              </button>
            </Link>
          </div>

          {/* Decorative Plane Trail */}
          <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
            <svg className="w-32 h-32 text-white/10" viewBox="0 0 100 100" fill="none">
              <path d="M10 50 Q 30 30, 50 50 T 90 50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}