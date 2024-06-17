import {
  concurrent,
  filter,
  identity,
  map,
  pipe,
  reverse,
  sortBy,
  toArray,
  toAsync,
} from "@fxts/core"
import { useSuspenseQuery } from "@tanstack/react-query"
import { db } from "lib/supabase/db"
import { assert } from "utils/assert"

export const useUsers = () => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () =>
      pipe(
        db.getKeys(`user`),
        toAsync,
        map(async (k) => {
          const [user, meta] = await Promise.all([
            db.getItem<{ id: string; username: string }>(k),
            db.getMeta(k),
          ])

          assert(user, `User not found: ${k}`)

          return { ...user, createdAt: meta.created_at! }
        }),
        concurrent(10),
        sortBy((u) => u.createdAt),
        reverse,
        toArray,
      ),
  })

  return { users: data!, ...rest }
}
