"use client";

import IdeaDetailsCard from "@/components/modules/Idea/IdeaDetailsCard";
import { getSingleIdea } from "@/services/idea";
import IdeaDetailsSkeleton from "@/skeletons/IdeaDetailsSkeleton";
import { TIdea } from "@/types/idea.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState<TIdea | null>(null);
  const [loading, setLoading] = useState(true);
  const user = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleIdea(id);
        if (res?.data) {
          setIdea(res?.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (loading || !idea) {
    return <IdeaDetailsSkeleton />;
  }

  return (
    <div className="mt-12 md:mt-0">
      <IdeaDetailsCard idea={idea} user={user} />
    </div>
  );
};

export default IdeaDetails;
