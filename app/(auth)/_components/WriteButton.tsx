"use client"

import { WriteDrawer } from "app/(auth)/_components/WriteDrawer"
import { Button } from "components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "components/ui/drawer"
import { Pencil } from "lucide-react"
import { useToggle } from "react-use"

export const WriteButton = () => {
  const [open, toggle] = useToggle(false)

  return (
    <Drawer
      shouldScaleBackground
      setBackgroundColorOnScale={false}
      scrollLockTimeout={300}
      open={open}
      onOpenChange={toggle}
    >
      <DrawerTrigger asChild>
        <Button size="sm" className="gap-2">
          <Pencil className="size-4" />
          Write
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-screen-sm">
        <WriteDrawer toggle={toggle} />
      </DrawerContent>
    </Drawer>
  )
}
