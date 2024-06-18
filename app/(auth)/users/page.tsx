"use client"

import { UserCard } from "app/(auth)/users/_components/UserCard"
import { useUsers } from "app/(auth)/users/_hooks/useUsers"

export default function Page() {
  const { users } = useUsers()

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} userId={user.id} />
      ))}
    </div>
  )
}
