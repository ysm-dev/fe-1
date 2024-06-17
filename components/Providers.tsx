import { QueryProvider } from "components/QueryProvider"
import { ThemeProvider } from "components/ThemeProvider"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}
