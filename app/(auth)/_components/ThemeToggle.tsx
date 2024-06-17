"use client"

import { Button } from "components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme: theme } = useTheme()

  return (
    <Button
      variant="ghost"
      className="size-10"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-6 stroke-[1.5]" />
      ) : theme === "light" ? (
        <Moon className="size-6 stroke-[1.5]" />
      ) : null}
    </Button>
  )
}
