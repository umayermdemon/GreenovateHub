"use client";

import IdeaDetailsCard from "@/components/modules/Idea/IdeaDetailsCard";
import { useUser } from "@/context/UserContext";
import { getSingleIdea } from "@/services/idea";
import { getSingleUser } from "@/services/user";
import IdeaDetailsSkeleton from "@/skeletons/IdeaDetailsSkeleton";
import { TAuthor } from "@/types/blog.types";
import { TIdea } from "@/types/idea.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState<TIdea | null>(null);
  const [user, setUser] = useState<TAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleIdea(id);
        if (res?.data) {
          setIdea(res?.data);
          const userRes = await getSingleUser(currentUser?.userId as string);
          if (userRes?.data) {
            setUser(userRes.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, currentUser?.userId]);

  if (loading || !idea || !user) {
    return <IdeaDetailsSkeleton />;
  }

  return <IdeaDetailsCard idea={idea} user={user} />;
};

export default IdeaDetails;
