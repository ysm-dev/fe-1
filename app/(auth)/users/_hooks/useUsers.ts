import {
  concurrent,
  filter,
  identity,
  map,
  pipe,
  reverse,
  sortBy,
  tap,
  toArray,
  toAsync,
} from "@fxts/core"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import type { User } from "hooks/useUser"
import { db } from "lib/supabase/db"
import { assert } from "utils/assert"

export const useUsers = () => {
  const client = useQueryClient()

  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () =>
      pipe(
        db.getKeys(`user`),
        toAsync,
        map(async (k) => {
          console.log({ k })
          const [user, meta] = await Promise.all([
            db.getItem<User>(k),
            db.getMeta(k),
          ])

          assert(user, `User not found: ${k}`)

          return { ...user, createdAt: meta.created_at! }
        }),
        concurrent(10),
        sortBy((u) => u.createdAt),
        reverse,
        tap(
          map((u) => {
            client.setQueryData(["user", u.id], u)
          }),
        ),
        toArray,
      ),
  })

  return { users: data!, ...rest }
}
