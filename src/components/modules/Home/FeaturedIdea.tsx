"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea.types";
import IdeaCard from "../Idea/IdeaCard";
import IdeaCardSkeleton from "@/skeletons/IdeaCardSkeleton";

const FeaturedIdea = ({ ideas }: { ideas: TIdea[] }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [ideas]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">
          <span className="text-green-700">Featured</span>{" "}
          <span className="text-green-500">Ideas</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <IdeaCardSkeleton key={i} />
              ))
            : ideas
                ?.slice(0, 4)
                .map((idea: TIdea) => (
                  <IdeaCard key={idea.id} data={idea} userId={user?.userId} />
                ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/ideas"
            className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:from-green-600 hover:to-green-800 transition-all duration-200">
            View All Ideas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIdea;
