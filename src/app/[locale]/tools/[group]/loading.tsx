export default function GroupLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
        <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
      </div>

      {/* Header skeleton */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-muted"></div>
        <div>
          <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted"></div>
        </div>
      </div>

      {/* Tool count skeleton */}
      <div className="mb-6">
        <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
      </div>

      {/* Tools grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="h-10 w-10 animate-pulse rounded bg-muted"></div>
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-muted"></div>
            <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted"></div>
            <div className="mt-1 h-4 w-2/3 animate-pulse rounded bg-muted"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
