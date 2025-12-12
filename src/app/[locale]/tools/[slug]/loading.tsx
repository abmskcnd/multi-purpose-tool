export default function ToolLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg bg-muted" />
          <div>
            <div className="h-8 w-48 rounded bg-muted" />
            <div className="mt-2 h-4 w-64 rounded bg-muted" />
          </div>
        </div>

        {/* Interface skeleton */}
        <div className="h-64 rounded-lg border bg-card p-6" />
      </div>
    </div>
  );
}
