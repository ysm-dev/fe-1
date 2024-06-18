"use client"

import { usePost } from "app/(auth)/posts/_hooks/usePost"
import { useUser } from "hooks/useUser"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  const { post } = usePost()

  const { author, content, title, image } = post

  const { user } = useUser(author)

  const { id, name, avatar, username } = user

  return (
    <article className="flex flex-col gap-8 py-4">
      <Image
        priority
        width={800}
        height={500}
        src={image}
        alt={`${title} image`}
        className=""
      />

      <div className="flex flex-col gap-8 px-4">
        <h1 className="break-all text-center font-semibold text-5xl">
          {title}
        </h1>
        <Link
          href={`/${id}`}
          className="flex cursor-pointer items-center justify-end gap-2 hover:opacity-80"
        >
          <Image
            priority
            width={100}
            height={100}
            src={avatar}
            alt={username}
            className="size-6 rounded-full"
          />
          <h2 className="text-lg">{name}</h2>
        </Link>
        <p className="break-all text-lg">{content}</p>
      </div>
    </article>
  )
}
