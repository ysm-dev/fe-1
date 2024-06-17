import { Header } from "app/(auth)/_components/Header"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="pt-12">{children}</div>
    </>
  )
}
