"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { IconFingerprint } from "@tabler/icons-react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import type { R, User } from "hooks/useUser"
import { login } from "lib/passkeys/login"
import { signup } from "lib/passkeys/signup"
import { db } from "lib/supabase/db"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useLocalStorage } from "react-use"
import { toast } from "sonner"
import { z } from "zod"

const schema = z.object({
  username: z.string().min(2),
})

export type Form = z.infer<typeof schema>

export default function Page() {
  const [isRegistered, setIsRegistered] = useLocalStorage(
    "app:isRegistered",
    false,
  )
  const [id, setId] = useLocalStorage("app:id", "")

  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { push } = useRouter()

  const onSubmit = handleSubmit(async ({ username }) => {
    const id = await (isRegistered ? login() : signup({ username }))

    if (isRegistered) {
      const user = await db.getItem<User>(`user:${id}`)

      if (user) {
        setId(id)
      } else {
        toast.error("User not found")
        setIsRegistered(false)
        setId("")
      }
    } else {
      const {
        user: { avatar, twitter, name },
      } = await fetch(`https://ungh.cc/users/${username}`).then<R>((res) =>
        res.json(),
      )
      await db.setItem(`user:${id}`, {
        id,
        username,
        avatar,
        name,
        twitter,
      } satisfies User)
      setIsRegistered(true)
      setId(id)
    }

    push(`/${id}`)

    toast.success("Successfully logged in")
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-dvh flex-col items-center justify-center gap-4"
    >
      <Input
        {...register("username")}
        className="w-56 text-center"
        placeholder="GitHub Username"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-56 gap-2"
      >
        <IconFingerprint className="size-5" />
        Continue with Passkey
      </Button>
    </form>
  )
}
