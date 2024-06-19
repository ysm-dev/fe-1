import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"
import { AsyncBoundary } from "components/AsyncBoundary"
import { Button } from "components/ui/button"
import { useUser } from "hooks/useUser"
import { cn } from "lib/utils"
import Image from "next/image"
import Link from "next/link"

type Props = {
  userId: string
}

export function UserCard(props: Props) {
  return (
    <AsyncBoundary pending={<Pending />} rejected={() => <Rejected />}>
      <Resolved {...props} />
    </AsyncBoundary>
  )
}

export function Pending() {
  return (
    <a
      href="#"
      className="flex h-fit animate-pulse flex-col items-center gap-2 overflow-hidden rounded-2xl border"
    >
      <div className="aspect-square w-full bg-foreground/15" />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <h2 className={cn("h-5 w-2/3 rounded-full bg-foreground/15 py-1")} />
        <div className="size-7" />
      </div>
    </a>
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

function Rejected() {
  return (
    <article className="flex h-fit flex-col items-center gap-2 overflow-hidden rounded-2xl border">
      <Image
        priority
        unoptimized
        src={`https://em-content.zobj.net/source/microsoft-teams/363/thinking-face_1f914.png`}
        width={256}
        height={256}
        alt="error"
        className="aspect-square w-full"
      />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <h2 className="">{`일시적인 오류가 있습니다`}</h2>
        <div className="size-7" />
      </div>
    </article>
  )
}
