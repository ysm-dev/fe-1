"use client"

import { Pending } from "app/(auth)/posts/_components/PostCard"

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <Pending key={i} />
      ))}
    </div>
  )
}
