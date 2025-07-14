"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";

import { TBlog } from "@/types/blog.types";
import { createVote, isUserVoted, undoVote } from "@/services/vote";
import { BookOpen, MessageSquareMore } from "lucide-react";

interface IBlogCard {
  data: TBlog;
  userId: string | undefined;
}

export interface TIsVoted {
  value?: "up" | "down";
  isVoted: boolean;
}

const BlogCard = ({ data, userId }: IBlogCard) => {
  const [vote, setVote] = useState<TIsVoted>({} as TIsVoted);

  useEffect(() => {
    const fetchIsVoted = async () => {
      try {
        const res = await isUserVoted({ blogId: data?.id });
        if (res) setVote(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIsVoted();
  }, [data?.id, userId]);

  const timeAgo = formatDistanceToNow(new Date(data?.createdAt), {
    addSuffix: true,
  });

  const addVote = async (value: string) => {
    try {
      const res = await createVote({ ideaId: data?.id, value });
      if (res.success) {
        setVote({ isVoted: true, value: value as "up" | "down" });
        if (value === "up") {
          data.up_votes = (data.up_votes || 0) + 1;
        } else {
          data.down_votes = (data.down_votes || 0) + 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeVote = async () => {
    try {
      const res = await undoVote({ ideaId: data?.id });
      if (res.success) {
        setVote({ isVoted: false });
        if (vote.value === "up") {
          data.up_votes = (data.up_votes || 0) - 1;
        } else if (vote.value === "down") {
          data.down_votes = (data.down_votes || 0) - 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const blogDetailsLink = `/blogs/${data?.id}`;

  return (
    <div className="w-full sm:w-[95%] mx-auto mb-8 rounded-2xl border border-primary/30 hover:border-primary bg-card overflow-hidden relative transition-all duration-300 flex flex-col h-[550px]">
      {/* Blog badge */}
      <div className="absolute top-3 left-1 z-10 flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full shadow text-xs font-bold">
          <BookOpen size={16} /> Blog
        </div>
        <div>
          <p className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow">
            {data.category === "waste"
              ? "Waste"
              : data.category === "energy"
              ? "Energy"
              : "Transportation"}
          </p>
        </div>
      </div>

      <Link href={blogDetailsLink}>
        <div className="relative w-full h-[200px]">
          <Image
            src={
              data?.images[0] ||
              "https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"
            }
            alt="image"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="px-5 pb-5 pt-3 flex flex-col flex-grow">
        <h1 className="text-xl font-bold text-primary mb-1 truncate">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <p className="pb-2 text-muted-foreground italic text-justify">
          {data.description.split(" ").slice(0, 50).join(" ")}...
        </p>

        <div className="flex flex-row justify-between items-center gap-2 pt-2 mt-auto border-t border-primary/20">
          <p className="text-xs text-primary italic">{timeAgo}</p>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-primary/10 px-3 py-1 rounded-full">
              <div className="flex items-center gap-1 border-r border-primary pr-2 text-primary text-lg cursor-pointer">
                {vote?.isVoted && vote?.value === "up" ? (
                  <BiSolidLike onClick={removeVote} />
                ) : (
                  <AiOutlineLike onClick={() => addVote("up")} />
                )}
                <span className="text-sm">{data.up_votes || 0}</span>
              </div>
              <div className="flex items-center text-primary text-lg cursor-pointer">
                {vote?.isVoted && vote?.value === "down" ? (
                  <AiFillDislike onClick={removeVote} />
                ) : (
                  <AiOutlineDislike onClick={() => addVote("down")} />
                )}
              </div>
            </div>
            <Link href={blogDetailsLink}>
              <MessageSquareMore size={22} className="text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
