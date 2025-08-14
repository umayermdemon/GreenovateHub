"use client";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea.types";

const IdeaCard = ({ data }: { data: TIdea }) => {
  const { user } = useUser();

  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  const ideaDetailsLink =
    user?.role === "member"
      ? `/member/dashboard/my-ideas/details/${data.id}`
      : user?.role === "admin"
      ? `/admin/dashboard/all-ideas/details/${data.id}`
      : `/ideas/${data.id}`;

  return (
    <div className="rounded-xl shadow-md w-full max-w-sm mx-auto mb-6 flex flex-col items-center bg-background">
      <div className="w-full h-56 rounded-t-xl overflow-hidden relative">
        <Image
          className="object-cover w-full h-full"
          src={
            data?.images[0] ||
            "https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"
          }
          alt="idea image"
          width={400}
          height={224}
        />
        {/* Idea badge */}
        <div className="absolute top-3 right-0 z-10 px-2">
          <p className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow">
            {data.category === "waste"
              ? "Waste"
              : data.category === "energy"
              ? "Energy"
              : "Transportation"}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold mb-2 ">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h3>
        <p className="text-gray-500 mb-4">
          {data.description?.slice(0, 70) || "No description provided."}
        </p>
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          <span className="text-xs text-secondary/80">{timeAgo}</span>
          <Link
            href={ideaDetailsLink}
            className="bg-primary-foreground p-3 rounded-full border group">
            <MoveUpRight
              size={20}
              className="group-hover:text-primary text-secondary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
