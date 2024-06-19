"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import type { Post } from "app/(auth)/posts/_hooks/usePost"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "components/ui/drawer"
import { Input } from "components/ui/input"
import { Textarea } from "components/ui/textarea"
import { useUser } from "hooks/useUser"
import { db } from "lib/supabase/db"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { nanoid } from "utils/nanoid"
import { z } from "zod"

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

type Form = z.input<typeof schema>

type Props = {
  toggle: (v: boolean) => void
}

export const WriteDrawer = ({ toggle }: Props) => {
  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<Form>({
    mode: "onChange",
    resolver: zodResolver(schema),
  })
  const { user } = useUser()

  const { push } = useRouter()

  const client = useQueryClient()

  const onSubmit = handleSubmit(async ({ title, content }) => {
    const id = nanoid(6)

    await db.setItem(`post:${id}`, {
      id,
      image: `https://picsum.photos/id/${Math.floor(
        Math.random() * 1085,
      )}/800/500`,
      title,
      content,
      author: user.id,
    } satisfies Post)

    toast.success("Post created!")

    push(`/posts/${id}`)

    toggle(false)

    client.invalidateQueries({ queryKey: ["posts"] })
  })

  return (
    <form className="mx-auto w-full" onSubmit={onSubmit}>
      <fieldset disabled={isSubmitting}>
        <DrawerHeader>
          <DrawerTitle>Write Post</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          <Input
            {...register("title")}
            className="border-none px-1 text-3xl focus-visible:ring-0"
            placeholder="Title"
          />
          <Textarea
            {...register("content")}
            className="min-h-64 resize-none"
            placeholder="Content"
          />
        </div>
        <DrawerFooter>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="text-lg"
            size="lg"
          >
            {isSubmitting ? <Loader /> : "Submit"}
          </Button>
        </DrawerFooter>
      </fieldset>
    </form>
  )
}
