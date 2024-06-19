"use client"

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { getQueryClient } from "components/getQueryClient"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type ComponentProps, useState } from "react"

type Props = {} & Omit<ComponentProps<typeof QueryClientProvider>, "client">

export const QueryProvider = ({ children, ...props }: Props) => {
  const client = getQueryClient()
  // const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider {...props} client={client}>
      {/* <HydrationBoundary state={dehydrate(client)}> */}
      {/* <ReactQueryStreamedHydration> */}
      {/*  */}
      {children}
      {/* </ReactQueryStreamedHydration> */}
      {/* </HydrationBoundary> */}
      {/* {!isProd() && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}
