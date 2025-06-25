"use client";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Lightbulb, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea.types";
import { Separator } from "@/components/ui/separator";

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
    <div className="w-full sm:w-[95%] mx-auto mb-8 shadow-lg hover:shadow-[var(--primary-light)]/60 duration-300 rounded-xl border-2 border-[var(--primary)] bg-card overflow-hidden relative hover:-translate-y-1 transition-all">
      {/* Idea badge */}
      <div className="absolute top-3 left-1 z-10 flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-1 bg-[var(--primary)] text-[var(--on-primary)] px-3 py-1 rounded-full shadow text-xs font-bold">
          <Lightbulb size={16} /> IDEA
        </div>
        <div>
          <p className="bg-[var(--primary)] text-[var(--on-primary)] text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow">
            {data.category === "waste"
              ? "Waste"
              : data.category === "energy"
              ? "Energy"
              : "Transportation"}
          </p>
        </div>
      </div>

      <div className="relative w-full h-[250px] ">
        <Image
          className="object-cover"
          src={
            data?.images[0] ||
            "https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"
          }
          alt="image"
          fill
        />
      </div>
      <div className="px-4 pb-4 pt-2">
        <h1 className="text-lg font-bold text-[var(--primary-dark)] mb-1 truncate">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <Separator />
        <div className="flex flex-row justify-between items-center gap-2 pt-2">
          <p className="text-xs text-[var(--primary)] italic font-bold">
            {timeAgo}
          </p>
          <Link
            href={ideaDetailsLink}
            className="border border-[var(--primary)] rounded-full px-3 py-2 text-[var(--primary)] font-bold">
            <MoveUpRight className="inline-block font-bold" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
