import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { db } from "lib/supabase/db"
import ms from "ms"
import { useParams } from "next/navigation"
import { assert } from "utils/assert"

export type Post = {
  id: string
  image: string
  title: string
  content: string
  author: string
}

export const usePost = (paramId?: string) => {
  const { postId } = useParams()
  const id = paramId || (postId as string)

  assert(id, "No post ID provided")

  const client = useQueryClient()

  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const post = await db.getItem<Post>(`post:${id}`)

      assert(post, "Post not found")

      return post
    },
    initialData: client.getQueryData<Post>(["posts", id]),
    staleTime: ms("10m"),
  })

  return { post: data!, ...rest }
}
