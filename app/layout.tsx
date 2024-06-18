import "app/globals.css"

import { Providers } from "components/Providers"
import { Toaster } from "components/ui/sonner"
import { HOST } from "constants/urls"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { cn } from "lib/utils"
import type { Metadata } from "next"
import { useTheme } from "next-themes"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Template"
  const description = "A Next.js template"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${HOST}`,
      siteName: title,
    },
  }
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={cn(GeistMono.variable, GeistSans.variable)}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="antialiased">
        <main
          vaul-drawer-wrapper=""
          className="mx-auto max-w-screen-sm bg-background"
        >
          <Providers>{children}</Providers>
        </main>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
