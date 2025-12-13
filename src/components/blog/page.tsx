import BlogPostPage from "@/components/blog/blog-post";

interface PageProps {
    params: { id: string };
}

export default function Page({ params }: PageProps) {
    // The BlogPostPage component already contains the logic to find and display
    // the post based on the ID from the URL.
    return <BlogPostPage postId={params.id} />;
}