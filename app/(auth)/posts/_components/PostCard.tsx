import { usePost } from "app/(auth)/posts/_hooks/usePost"
import { AsyncBoundary } from "components/AsyncBoundary"
import { useUser } from "hooks/useUser"
import { cn } from "lib/utils"
import Image from "next/image"
import Link from "next/link"

type Props = {
  postId: string
}

export function PostCard(props: Props) {
  return (
    <AsyncBoundary pending={<Pending />} rejected={() => <Rejected />}>
      <Resolved {...props} />
    </AsyncBoundary>
  )
}

export function Pending() {
  return (
    <article className="flex h-fit animate-pulse flex-col items-center gap-2 overflow-hidden rounded-2xl border">
      <div className="aspect-[8/5] w-full bg-foreground/15" />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <div className={cn("h-5 w-2/3 rounded-full bg-foreground/15 py-1")} />
        <div className="size-7" />
      </div>
    </article>
  )
}

function Resolved({ postId }: Props) {
  const { post } = usePost(postId)

  const { id, author, content, title, image } = post

  const {
    user: { name, avatar },
  } = useUser(author)

  return (
    <Link
      href={`/posts/${id}`}
      className="flex h-fit flex-col items-center overflow-hidden rounded-2xl border hover:opacity-80"
    >
      <Image
        priority
        src={image}
        width={800}
        height={500}
        alt={title}
        className="aspect-[8/5] w-full"
      />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <h2 className="truncate text-2xl">{title}</h2>
        <Link href={`/${author}`}>
          <div className="flex items-center justify-end gap-2">
            <Image
              priority
              src={avatar}
              width={32}
              height={32}
              alt={name}
              className="rounded-full"
            />
            <h3 className="text-lg">{name}</h3>
          </div>
        </Link>
      </div>
    </Link>
  )
}

function Rejected() {
  return (
    <article className="relative flex h-fit flex-col items-center gap-2 overflow-hidden rounded-2xl border">
      <Image
        priority
        unoptimized
        src={`https://em-content.zobj.net/source/microsoft-teams/363/thinking-face_1f914.png`}
        width={200}
        height={200}
        alt="error"
        className="mx-auto aspect-[8/5] w-full object-contain p-2"
      />
      <div className="flex w-full flex-col gap-2 p-3 text-left">
        <h2 className="">{`일시적인 오류가 있습니다`}</h2>
        <div className="size-7" />
      </div>
    </article>
  )
}
