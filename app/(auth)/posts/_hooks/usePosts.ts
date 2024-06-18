import {
  concurrent,
  map,
  pipe,
  reverse,
  sortBy,
  tap,
  toArray,
  toAsync,
} from "@fxts/core"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import type { Post } from "app/(auth)/posts/_hooks/usePost"
import { db } from "lib/supabase/db"
import { assert } from "utils/assert"

export const usePosts = () => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: () =>
      pipe(
        db.getKeys(`post`),
        toAsync,
        map(async (k) => {
          const [post, meta] = await Promise.all([
            db.getItem<Post>(k),
            db.getMeta(k),
          ])

          assert(post, `Post not found: ${k}`)

          return { ...post, createdAt: meta.created_at! }
        }),
        concurrent(10),
        sortBy((u) => u.createdAt),
        reverse,
        toArray,
      ),
  })

  return { posts: data!, ...rest }
}
