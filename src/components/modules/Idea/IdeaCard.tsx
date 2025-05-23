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
import { Edit, Eye, MessageSquareMore, Trash2 } from "lucide-react";
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
  refresh: () => void;
}

const IdeaCard = ({ data, userId, refresh }: IIdeaCard) => {
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
      if (res.success) refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const removeVote = async () => {
    try {
      const res = await undoVote({ ideaId: data.id });
      if (res.success) refresh();
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
          if (res.success) refresh();
          Swal.fire("Deleted!", "Your Idea has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="w-full sm:w-[95%] mx-auto mb-6">
      <div className="flex flex-col bg-sky-50 relative border-sky-500 border rounded-md">
        <Link
          href={
            user?.role === "member"
              ? `/member/dashboard/my-ideas/details/${data.id}`
              : `/admin/dashboard/all-ideas/details/${data.id}`
          }>
          <div className="relative">
            <Image
              className="w-full h-[200px] sm:h-[250px] object-cover rounded-t-md"
              src={
                data?.images[0] ||
                "https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"
              }
              alt="image"
              height={200}
              width={410}
            />
          </div>
        </Link>

        <div className="flex justify-between px-4 mt-3">
          <p className="bg-sky-500 text-white text-sm px-2 py-0.5 rounded-full">
            {data.category}
          </p>
          <Popover>
            <PopoverTrigger className="hover:bg-sky-500 rounded-sm hover:text-white">
              <SlOptions className="cursor-pointer w-[30px] h-[25px] px-0.5 py-1" />
            </PopoverTrigger>
            <PopoverContent className="w-[130px] border border-sky-500 bg-sky-50 px-1 py-1">
              <ul className="divide-y divide-gray-200">
                <Link
                  href={
                    user?.role === "member"
                      ? `/member/dashboard/my-ideas/details/${data.id}`
                      : `/admin/dashboard/all-ideas/details/${data.id}`
                  }
                  passHref>
                  <li className="cursor-pointer hover:bg-sky-500 hover:text-white flex gap-1 px-1 text-sky-600 pb-0.5">
                    <Eye size={17} className="relative top-1" />
                    View
                  </li>
                </Link>

                {userId === data.authorId && (
                  <>
                    <Link href={`/member/dashboard/my-ideas/update/${data.id}`}>
                      <li className="cursor-pointer hover:bg-sky-500 hover:text-white flex gap-1 px-1 text-sky-600 pt-0.5 border-t border-sky-500">
                        <Edit size={17} className="relative top-1" />
                        Update
                      </li>
                    </Link>
                    <li
                      onClick={() => deleteIdea(data.id)}
                      className="cursor-pointer hover:bg-red-500 hover:text-white flex gap-1 px-1 text-red-500 pt-0.5 border-t border-sky-500">
                      <Trash2 size={17} className="relative top-1" />
                      Delete
                    </li>
                  </>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold mb-1 truncate">
            {data.title.split(" ").slice(0, 4).join(" ")}
          </h1>
          <p className="text-sm text-gray-700 border-b border-sky-500 pb-2 mb-2 truncate">
            {data.description.split(" ").slice(0, 10).join(" ")}
          </p>

          <div className="flex justify-between items-center text-sm">
            <p className="text-sky-600 italic">
              {timeAgo.split(" ").slice(1, 3).join(" ")} ago
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-sky-500 px-2 py-1 rounded-full">
                <div className="flex items-center gap-1 border-r pr-2 text-white text-[18px]">
                  {vote?.isVoted && vote?.value === "up" ? (
                    <BiSolidLike
                      onClick={removeVote}
                      className="cursor-pointer"
                    />
                  ) : (
                    <AiOutlineLike
                      onClick={() => addVote("up")}
                      className="cursor-pointer"
                    />
                  )}
                  <span className="text-sm">{data.up_votes || 0}</span>
                </div>
                {vote?.isVoted && vote?.value === "down" ? (
                  <AiFillDislike
                    onClick={removeVote}
                    className="text-white text-[18px] cursor-pointer"
                  />
                ) : (
                  <AiOutlineDislike
                    onClick={() => addVote("down")}
                    className="text-white text-[18px] cursor-pointer"
                  />
                )}
              </div>
              <Link
                href={
                  user?.role === "member"
                    ? `/member/dashboard/my-ideas/details/${data.id}`
                    : `/admin/dashboard/all-ideas/details/${data.id}`
                }>
                <MessageSquareMore size={22} className="text-sky-500 " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;