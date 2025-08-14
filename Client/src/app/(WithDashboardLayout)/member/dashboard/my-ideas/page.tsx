"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { PageHeader } from "@/components/singles/PageHeader";
import { getMyIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { Suspense, useEffect, useState } from "react";

const MyIdeas = () => {
  const [ideas, setIdeas] = useState<TIdea[]>([]);

  const fetchIdeas = async () => {
    const res = await getMyIdeas();
    if (res?.data) {
      setIdeas(res?.data);
    }
  };
  useEffect(() => {
    fetchIdeas();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <div className="flex items-center justify-between mx-8 mt-5">
          <PageHeader
            title="Explore Inspiring Ideas"
            description="Browse through a collection of personal stories, unique ideas, and thoughtful opinions shared by our community. Get inspired or share your own!"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mx-5 ">
          {ideas?.map((idea: TIdea) => (
            <IdeaCard key={idea.id} data={idea} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default MyIdeas;
