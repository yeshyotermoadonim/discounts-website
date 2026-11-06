// Skeleton loading grid matching the brand card grid layout
export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/80 backdrop-blur-md rounded-3xl border border-zinc-200/80 p-6 animate-pulse space-y-5"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-zinc-200 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-2.5">
              <div className="h-5 bg-zinc-200 rounded-xl w-3/4" />
              <div className="h-3.5 bg-zinc-200 rounded-lg w-1/2" />
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="h-10 bg-zinc-100 rounded-2xl" />
            <div className="h-10 bg-zinc-100 rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
