"use client"

import { Pending } from "app/(auth)/users/_components/UserCard"

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Pending key={i} />
      ))}
    </div>
  )
}
