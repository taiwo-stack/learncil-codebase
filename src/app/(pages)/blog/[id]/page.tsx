import BlogPostPage from "@/components/blog/blog-post"
import { notFound } from "next/navigation"

const validBlogIds = ["1", "2", "3", "4", "5", "6"]

interface PageProps {
  params: {
    id: string
  }
}

export default function BlogPost({ params }: PageProps) {
  if (!validBlogIds.includes(params.id)) {
    notFound()
  }

  return <BlogPostPage postId={params.id} />
}

export async function generateStaticParams() {
  return validBlogIds.map((id) => ({
    id: id,
  }))
}