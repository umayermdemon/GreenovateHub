"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TIdea } from "@/types/idea.types";
import IdeaCard from "../Idea/IdeaCard";
import IdeaCardSkeleton from "@/skeletons/IdeaCardSkeleton";

const FeaturedIdea = ({ ideas }: { ideas: TIdea[] }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [ideas]);

  return (
    <section className="py-16 bg-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-2">
          <span className="text-secondary">Featured Ideas</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
          Innovative ideas driving business and sustainability forward.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <IdeaCardSkeleton key={i} />
              ))
            : ideas
                ?.slice(0, 3)
                .map((idea: TIdea) => <IdeaCard key={idea.id} data={idea} />)}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/ideas"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition-all duration-200">
            View All Ideas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIdea;
