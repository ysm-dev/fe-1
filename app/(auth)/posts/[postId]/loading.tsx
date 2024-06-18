"use client"

export default function Loading() {
  return (
    <article className="flex animate-pulse flex-col gap-8 py-4">
      <div className="aspect-[8/5] w-full bg-foreground/15" />
      <div className="flex flex-col gap-8 px-4">
        <div className="mx-auto h-7 w-[60%] break-all rounded-full bg-foreground/15 text-center" />
        <div className="flex items-center justify-end gap-2">
          <div className="h-5 w-24 rounded-full bg-foreground/15 text-lg" />
        </div>
      </div>
    </article>
  )
}
