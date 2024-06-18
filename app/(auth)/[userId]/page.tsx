"use client"

import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"
import { Button } from "components/ui/button"
import { useUser } from "hooks/useUser"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function Page() {
  const { userId } = useParams()
  const { user } = useUser(userId as string)

  const { id, avatar, name, twitter, username } = user

  return (
    <section className="flex flex-col items-center gap-6 py-6">
      <Image
        priority
        src={avatar}
        width={400}
        height={400}
        alt={username}
        className="size-64 rounded-3xl"
      />
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-semibold text-3xl">{name}</h2>
        <div className="">@{username}</div>
      </div>
      <div className="flex gap-4">
        {twitter && (
          <Button asChild variant="ghost" size="icon" className="aspect-square">
            <a
              href={`https://x.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandTwitter className="stroke-[1.5]" />
            </a>
          </Button>
        )}
        <Button asChild variant="ghost" size="icon" className="aspect-square">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="stroke-[1.5]" />
          </a>
        </Button>
      </div>
    </section>
  )
}
