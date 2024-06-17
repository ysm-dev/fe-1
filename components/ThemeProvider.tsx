import { ThemeProvider as Theme } from "next-themes"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const ThemeProvider = ({ children }: Props) => {
  return (
    <Theme
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </Theme>
  )
}
