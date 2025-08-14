"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { PageHeader } from "@/components/singles/PageHeader";
import { getAllIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { useEffect, useState } from "react";

const DraftIdeas = () => {
  const [ideas, setIdeas] = useState<TIdea[]>([]);
  const fetchIdeas = async () => {
    const res = await getAllIdeas({ status: "draft" });
    if (res?.data) {
      setIdeas(res.data);
    }
  };
  useEffect(() => {
    fetchIdeas();
  }, []);
  return (
    <div className="">
      <div className="flex items-center justify-between mx-8 mt-5">
        <PageHeader
          title="Your Draft Ideas Workspace"
          description="Here you’ll find all your saved drafts — unfinished thoughts, rough concepts, and early sparks of creativity. Review, refine, or continue where you left off and turn your ideas into something remarkable."
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mx-5 ">
        {ideas?.map((idea: TIdea) => (
          <IdeaCard key={idea.id} data={idea} />
        ))}
      </div>
    </div>
  );
};

export default DraftIdeas;
