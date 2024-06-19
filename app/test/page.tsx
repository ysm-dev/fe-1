"use client"

import { PostCard } from "app/(auth)/posts/_components/PostCard"

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <PostCard postId={`pzzhci`} />
    </div>
  )
}
