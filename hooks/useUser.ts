import { useSuspenseQuery } from "@tanstack/react-query"
import { db } from "lib/supabase/db"
import { redirect, useParams, useRouter } from "next/navigation"
import { useLocalStorage } from "react-use"
import { isServer } from "utils/isServer"

export const useUser = (paramId?: string) => {
  const [localId] = useLocalStorage("app:id", "")
  const { userId } = useParams()
  const id = paramId || localId || (userId as string)
  const { replace } = useRouter()

  if (!id && !isServer()) {
    redirect("/")
  }

  const { data: user, ...rest } = useSuspenseQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const user = await db.getItem<{ id: string; username: string }>(
        `user:${id}`,
      )

      if (!user) {
        replace("/")
        return
      }

      const { username } = user

      const data = await fetch(`https://ungh.cc/users/${username}`).then<R>(
        (res) => res.json(),
      )

      return {
        ...data.user,
        id,
      }
    },
  })

  return { user: user!, ...rest }
}

export interface R {
  user: User
}

export interface User {
  id: number
  name: string
  twitter: string | null
  username: string
  avatar: string
}
