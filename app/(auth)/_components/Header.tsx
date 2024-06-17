import { Profile } from "app/(auth)/_components/Profile"
import { ThemeToggle } from "app/(auth)/_components/ThemeToggle"
import { Button } from "components/ui/button"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="fixed top-0 mx-auto flex h-12 w-full max-w-screen-sm items-center gap-1 p-1">
      <Button asChild variant="ghost" className="font-mono">
        <Link href="/posts">{`/posts`}</Link>
      </Button>
      <Button asChild variant="ghost" className="font-mono">
        <Link href="/users">{`/users`}</Link>
      </Button>
      <div className="grow" />
      <ThemeToggle />
      <Profile />
    </header>
  )
}
