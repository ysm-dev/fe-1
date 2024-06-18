"use client"

import { PostCard } from "app/(auth)/posts/_components/PostCard"
import { usePosts } from "app/(auth)/posts/_hooks/usePosts"

export default function Page() {
  const { posts } = usePosts()

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} postId={post.id} />
      ))}
    </div>
  )
}
