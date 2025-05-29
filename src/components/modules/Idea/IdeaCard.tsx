"use client";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineDislike, AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { createVote, isUserVoted, undoVote } from "@/services/vote";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Eye, MessageSquareMore, Trash2, Lightbulb } from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea.types";
import { deleteMyIdea } from "@/services/idea";
import { TIsVoted } from "../blog/BlogCard";
import { useEffect, useState } from "react";

interface IIdeaCard {
  data: TIdea;
  userId: string | undefined;
}

const IdeaCard = ({ data, userId }: IIdeaCard) => {
  console.log(data?.images[0]);
  const [vote, setVote] = useState<TIsVoted>({} as TIsVoted);
  const { user } = useUser();

  useEffect(() => {
    const fetchIsVoted = async () => {
      try {
        const res = await isUserVoted({ ideaId: data.id });
        if (res) setVote(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIsVoted();
  }, [data, userId]);

  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  const addVote = async (value: string) => {
    try {
      const res = await createVote({ ideaId: data.id, value });
      if (res.success) {
        setVote({ isVoted: true });
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
      const res = await undoVote({ ideaId: data.id });
      if (res.success) {
        setVote({ isVoted: false });
        data.up_votes = (data.up_votes || 0) - (vote.isVoted ? 1 : 0);
        data.down_votes = (data.down_votes || 0) - (vote.isVoted ? 1 : 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIdea = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMyIdea(id);
          if (res.success)
            Swal.fire("Deleted!", "Your Idea has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="w-full sm:w-[95%] mx-auto mb-8 shadow-lg hover:shadow-green-400/60  duration-300 rounded-xl border-2 border-green-600 bg-green-50 overflow-hidden relative hover:-translate-y-1 transition-all">
      {/* Idea badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full shadow text-xs font-bold z-10">
        <Lightbulb size={16} /> IDEA
      </div>

      <Link
        href={
          user?.role === "member"
            ? `/member/dashboard/my-ideas/details/${data.id}`
            : `/admin/dashboard/all-ideas/details/${data.id}`
        }>
        <div className="relative w-full h-[220px] border-b-2 border-green-200">
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
      </Link>

      <div className="flex justify-between items-center px-4 pt-3">
        <p className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow">
          {data.category}
        </p>
        <Popover>
          <PopoverTrigger className="hover:bg-green-600 rounded-sm hover:text-white">
            <SlOptions className="cursor-pointer w-[30px] h-[25px] px-0.5 py-1" />
          </PopoverTrigger>
          <PopoverContent className="w-[130px] border border-green-600 bg-white px-1 py-1">
            <ul className="divide-y divide-gray-200">
              <Link
                href={
                  user?.role === "member"
                    ? `/member/dashboard/my-ideas/details/${data.id}`
                    : `/admin/dashboard/all-ideas/details/${data.id}`
                }
                passHref>
                <li className="cursor-pointer hover:bg-green-600 flex gap-1 hover:text-white px-1 text-green-600 pb-0.5">
                  <Eye size={17} className="relative top-1" />
                  View
                </li>
              </Link>

              {userId === data.authorId && (
                <>
                  <Link href={`/member/dashboard/my-ideas/update/${data.id}`}>
                    <li className="cursor-pointer hover:bg-green-600 hover:text-white flex gap-1 px-1 text-green-600 pt-0.5 border-t border-green-600">
                      <Edit size={17} className="relative top-1" />
                      Update
                    </li>
                  </Link>
                  <li
                    onClick={() => deleteIdea(data.id)}
                    className="cursor-pointer hover:bg-red-500 hover:text-white flex gap-1 px-1 text-red-500 pt-0.5 border-t border-green-600">
                    <Trash2 size={17} className="relative top-1" />
                    Delete
                  </li>
                </>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-4 pb-4 pt-2">
        <h1 className="text-lg font-bold text-green-700 mb-1 truncate">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <p className="border-b border-green-200 pb-2 text-gray-700 italic truncate">
          {data.description.split(" ").slice(0, 12).join(" ")}...
        </p>

        <div className="flex flex-row justify-between items-center gap-2 pt-2">
          <p className="text-xs text-green-600 italic">
            {timeAgo.split(" ").slice(1, 3).join(" ")} ago
          </p>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-green-600 px-3 py-1 rounded-full">
              <div className="flex items-center gap-1 border-r border-white pr-2 text-white text-lg cursor-pointer">
                {vote?.isVoted && vote?.value === "up" ? (
                  <BiSolidLike onClick={removeVote} />
                ) : (
                  <AiOutlineLike onClick={() => addVote("up")} />
                )}
                <span className="text-sm">{data.up_votes || 0}</span>
              </div>
              <div className="flex items-center text-white text-lg cursor-pointer">
                {vote?.isVoted && vote?.value === "down" ? (
                  <AiFillDislike onClick={removeVote} />
                ) : (
                  <AiOutlineDislike onClick={() => addVote("down")} />
                )}
              </div>
            </div>
            <Link
              href={
                user?.role === "member"
                  ? `/member/dashboard/my-ideas/details/${data.id}`
                  : `/admin/dashboard/all-ideas/details/${data.id}`
              }>
              <MessageSquareMore size={22} className="text-green-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
