// /app/blog/[id]/page.tsx
import BlogPostPage from "@/components/blog/blog-post"
import { notFound } from "next/navigation"

const validBlogIds = ["1", "2", "3", "4", "5", "6"]

interface PageProps {
  params: {
    id: string
  }
}

// Server Component
export default function BlogPost({ params }: PageProps) {
  if (!validBlogIds.includes(params.id)) {
    notFound()
  }

  return <BlogPostPage postId={params.id} />
}

