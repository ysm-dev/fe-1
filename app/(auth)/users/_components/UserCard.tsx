import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"
import { Button } from "components/ui/button"
import { useUser } from "hooks/useUser"
import { cn } from "lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

type Props = {
  userId: string
}

export function UserCard(props: Props) {
  return (
    <Suspense fallback={<Pending />}>
      <Resolved {...props} />
    </Suspense>
  )
}

export function Pending() {
  return (
    <article className="flex h-fit animate-pulse flex-col items-center gap-2 overflow-hidden rounded-2xl border">
      <div className="aspect-square w-full bg-foreground/15" />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <div className={cn("h-5 w-2/3 rounded-full bg-foreground/15 py-1")} />
        <div className="size-7" />
      </div>
    </article>
  )
}

function Resolved({ userId }: Props) {
  const { user } = useUser(userId)

  const { avatar, id, name, twitter, username } = user

  return (
    <Link
      href={`/${id}`}
      className="flex h-fit flex-col items-center overflow-hidden rounded-2xl border hover:opacity-80"
    >
      <Image
        priority
        src={avatar}
        width={256}
        height={256}
        alt={username}
        className="aspect-square w-full"
      />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <h2 className="text-lg">{name}</h2>
        <div className="flex justify-end">
          {twitter && (
            <Button asChild variant="ghost" size="icon" className="size-7 p-1">
              <a
                href={`https://x.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <IconBrandTwitter className="stroke-[1.5]" />
              </a>
            </Button>
          )}
          <Button asChild variant="ghost" size="icon" className="size-7 p-1">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <IconBrandGithub className="stroke-[1.5]" />
            </a>
          </Button>
        </div>
      </div>
    </Link>
  )
}
