const IdeaDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] p-3 sm:p-4 md:p-6 my-6 rounded-2xl border border-border bg-card shadow-lg overflow-hidden relative animate-pulse space-y-6">
      {/* Glassy Category Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1 rounded-full shadow text-xs sm:text-sm font-bold z-10 backdrop-blur bg-primary/80 text-primary-foreground border border-primary">
        <div className="h-4 w-20 bg-primary/40 rounded-full" />
      </div>

      {/* Images */}
      <div className="rounded-xl mb-8 overflow-hidden border-2 border-muted">
        <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-muted-foreground/10 rounded-xl" />
      </div>

      {/* Top Row: Premium & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-3">
        <div className="h-7 w-28 bg-muted-foreground/20 rounded-full" />
        <div className="flex items-center gap-4 flex-wrap">
          <div className="h-7 w-20 bg-muted-foreground/20 rounded-lg" />
          <div className="h-7 w-7 bg-muted-foreground/20 rounded" />
          <div className="h-7 w-7 bg-muted-foreground/20 rounded" />
        </div>
      </div>

      {/* Title, Author, Date */}
      <div className="mb-2 space-y-2">
        <div className="h-8 w-3/4 bg-muted-foreground/20 rounded" />
        <div className="h-4 w-1/2 bg-muted-foreground/10 rounded" />
      </div>

      {/* Description */}
      <div className="space-y-2 mt-2">
        <div className="h-4 w-full bg-muted-foreground/10 rounded" />
        <div className="h-4 w-5/6 bg-muted-foreground/10 rounded" />
      </div>

      {/* Problem & Solution */}
      <div className="mt-4 space-y-4">
        <div>
          <div className="h-5 w-40 bg-primary/20 rounded" />
          <div className="h-4 w-full bg-muted-foreground/10 rounded mt-2" />
          <div className="h-4 w-3/4 bg-muted-foreground/10 rounded mt-1" />
        </div>
        <div>
          <div className="h-5 w-40 bg-primary/20 rounded" />
          <div className="h-4 w-full bg-muted-foreground/10 rounded mt-2" />
          <div className="h-4 w-3/4 bg-muted-foreground/10 rounded mt-1" />
        </div>
      </div>

      {/* Status and Voting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap mt-6">
        <div className="h-7 w-32 bg-primary/10 rounded-full" />
        <div className="flex gap-4">
          <div className="flex gap-2 bg-primary/10 px-4 py-1 rounded-full border border-primary/10">
            <div className="h-6 w-10 bg-muted-foreground/20 rounded-full" />
            <div className="h-6 w-10 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10 border-t border-border pt-8">
        <div className="h-7 w-32 bg-muted-foreground/20 rounded mb-4" />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Comment Field */}
          <div className="w-full md:w-1/2 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-[40px] h-[40px] bg-muted-foreground/20 rounded-full" />
              <div className="flex-1 bg-muted rounded-xl px-4 py-2 border border-border">
                <div className="h-4 w-full bg-muted-foreground/10 rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted-foreground/10 rounded mb-2" />
                <div className="flex justify-end">
                  <div className="h-7 w-16 bg-primary/20 rounded" />
                </div>
              </div>
            </div>
          </div>
          {/* Comment List */}
          <div className="w-full md:w-1/2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-md shadow-sm p-3 border border-border space-y-2">
                <div className="h-4 w-1/3 bg-muted-foreground/10 rounded" />
                <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsSkeleton;
