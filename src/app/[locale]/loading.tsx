export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 animate-pulse rounded-xl bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
        </div>
      </header>

      {/* Content Skeleton */}
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 h-8 w-48 animate-pulse rounded-full bg-muted" />
              <div className="mx-auto mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
              <div className="mx-auto mb-8 h-6 w-2/3 animate-pulse rounded bg-muted" />
              <div className="flex justify-center gap-4">
                <div className="h-12 w-32 animate-pulse rounded-full bg-muted" />
                <div className="h-12 w-32 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </section>

        {/* Grid Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-card p-5"
                >
                  <div className="mb-4 h-32 animate-pulse rounded-xl bg-muted" />
                  <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Loading Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-3 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          Loading...
        </div>
      </div>
    </div>
  );
}
