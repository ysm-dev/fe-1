import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { db } from "lib/supabase/db"
import { redirect, useParams, useRouter } from "next/navigation"
import { useLocalStorage } from "react-use"
import { isServer } from "utils/isServer"
import { wait } from "utils/wait"

export const useUser = (paramId?: string) => {
  const [localId] = useLocalStorage("app:id", "")
  const { userId } = useParams()
  const id = paramId || localId || (userId as string)
  const { replace } = useRouter()

  if (!id && !isServer()) {
    redirect("/")
  }

  const client = useQueryClient()

  const { data: user, ...rest } = useSuspenseQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const user = await db.getItem<User>(`user:${id}`)

      if (!user) {
        replace("/")
        return
      }

      return user
    },
    initialData: () =>
      client.getQueryData<User[]>(["users"])?.find((u) => u.id === id),
  })

  return { user: user!, ...rest }
}

export interface R {
  user: User
}

export interface User {
  id: string
  name: string
  twitter: string | null
  username: string
  avatar: string
}
