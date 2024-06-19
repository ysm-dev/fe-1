"use client"

import { PostCard } from "app/(auth)/posts/_components/PostCard"
import { usePosts } from "app/(auth)/posts/_hooks/usePosts"
import { cn } from "lib/utils"

export default function Page() {
  const { posts } = usePosts()

  const hasPosts = posts.length > 0

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2",
        !hasPosts && "grid-cols-1 sm:grid-cols-1",
      )}
    >
      {hasPosts ? (
        posts.map((post) => <PostCard key={post.id} postId={post.id} />)
      ) : (
        <div className="text-center">No posts found</div>
      )}
    </div>
  )
}
