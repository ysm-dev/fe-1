"use client"

export default function Loading() {
  return (
    <section className="flex animate-pulse flex-col items-center gap-6 py-6">
      <div className="size-64 rounded-3xl bg-foreground/15" />
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-32 rounded-full bg-foreground/15" />
        <div className="h-5 w-16 rounded-full bg-foreground/15" />
      </div>
    </section>
  )
}
