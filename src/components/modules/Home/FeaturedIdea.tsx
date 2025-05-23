"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea.types";
import { getAllIdeas } from "@/services/idea";
import IdeaCard from "../Idea/IdeaCard";
import IdeaCardSkeleton from "@/skeletons/IdeaCardSkeleton";

const FeaturedIdea = () => {
  const [idea, setIdeas] = useState<TIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIdeas = async () => {
    const res = await getAllIdeas({ status: "approved" });
    if (res?.data) {
      setIdeas(res.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchIdeas();
  }, []);
  const { user } = useUser();

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-sky-500 mb-8">
          Featured Ideas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
              <IdeaCardSkeleton key={i} />
            ))
            : idea
              ?.slice(0, 3)
              .map((idea: TIdea) => (
                <IdeaCard
                  key={idea.id}
                  data={idea}
                  refresh={fetchIdeas}
                  userId={user?.userId}
                />
              ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/ideas"
            className="inline-block bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
            View All Ideas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIdea;
