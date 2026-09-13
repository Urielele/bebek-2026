export default function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[18px] border border-hairline bg-white p-6"
        >
          <div className="flex items-center gap-5">
            <div className="size-20 rounded-lg bg-ink-48/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-ink-48/10" />
              <div className="h-7 w-1/2 rounded-full bg-ink-48/10" />
            </div>
          </div>
          <div className="mt-5 h-5 w-2/3 rounded bg-ink-48/10" />
        </div>
      ))}
    </div>
  )
}