import { cn } from "lib/utils"
import { Loader as L } from "lucide-react"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof L>

export const Loader = (props: Props) => {
  return <L className={cn("size-5 animate-spin", props.className)} {...props} />
}
