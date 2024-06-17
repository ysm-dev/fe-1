"use client"

import {
  IconBrandGithub,
  IconBrandTwitter,
  IconLogout,
} from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { useLogout } from "hooks/useLogout"
import { useUser } from "hooks/useUser"
import { UserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export function Profile() {
  return (
    <Suspense fallback={<Pending />}>
      <Resolved />
    </Suspense>
  )
}

function Pending() {
  return <div className="size-10 animate-pulse rounded-full bg-foreground/15" />
}

function Resolved() {
  const { logout } = useLogout()
  const { user } = useUser()

  const { avatar, id, name, twitter, username } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          priority
          src={avatar}
          width={100}
          height={100}
          alt={username}
          className="size-10 cursor-pointer rounded-full hover:opacity-80"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={4}>
        <DropdownMenuItem className="gap-2" asChild>
          <Link href={`/${id}`}>
            <UserRound className="size-5 stroke-[1.5]" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" asChild>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="size-5 stroke-[1.5]" />
            {username}
          </a>
        </DropdownMenuItem>
        {twitter && (
          <DropdownMenuItem className="gap-2" asChild>
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandTwitter className="size-5 stroke-[1.5]" />
              {twitter}
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="gap-2" asChild onClick={logout}>
          <Link href="/">
            <IconLogout className="size-5 stroke-[1.5]" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
