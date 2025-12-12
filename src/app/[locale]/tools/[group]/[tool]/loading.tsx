export default function ToolLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
        <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
        <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
      </div>

      {/* Tool card skeleton */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          {/* Icon skeleton */}
          <div className="h-16 w-16 animate-pulse rounded-full bg-muted"></div>

          {/* Title skeleton */}
          <div className="mt-4 h-8 w-64 animate-pulse rounded bg-muted"></div>

          {/* Badge skeleton */}
          <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-muted"></div>

          {/* Description skeleton */}
          <div className="mt-4 h-4 w-80 animate-pulse rounded bg-muted"></div>

          {/* Implementation skeleton */}
          <div className="mt-6 h-4 w-48 animate-pulse rounded bg-muted"></div>

          {/* Button skeleton */}
          <div className="mt-6 h-10 w-36 animate-pulse rounded-lg bg-muted"></div>
        </div>
      </div>
    </div>
  );
}
