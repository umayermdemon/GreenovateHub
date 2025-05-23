"use client";
import { TBlog } from "@/types/blog.types";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { formatDistanceToNow } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Eye, Trash } from "lucide-react";
import { deleteMyBlog } from "@/services/blog";
import Swal from "sweetalert2";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { createVote, isUserVoted, undoVote } from "@/services/vote";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useEffect, useState } from "react";

interface IBlogCard {
  data: TBlog;
  userId: string | undefined;
  refresh: () => void;
}
export interface TIsVoted {
  value?: "up" | "down";
  isVoted: boolean;
}

const BlogCard = ({ data, userId, refresh }: IBlogCard) => {
  const [vote, setVote] = useState<TIsVoted>({} as TIsVoted);

  useEffect(() => {
    const fetchIsVoted = async () => {
      const blogData = {
        blogId: data.id,
      };
      try {
        const res = await isUserVoted(blogData);
        if (res) {
          setVote(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchIsVoted();
  }, [data.id, userId]);

  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  const { user } = useUser();

  const addVote = async (value: string) => {
    const voteData = {
      blogId: data.id,
      value,
    };
    try {
      const res = await createVote(voteData);
      if (res.success) {
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeVote = async () => {
    const voteData = {
      blogId: data.id,
    };
    try {
      const res = await undoVote(voteData);
      if (res.success) {
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id: string) => {
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
          const res = await deleteMyBlog(id);
          if (res.success) {
            refresh();
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="w-full sm:max-w-[500px] md:max-w-[600px] mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md border border-green-500 bg-green-50 overflow-hidden">
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

      <div className="flex justify-between items-center px-4 pt-3">
        <p className="bg-green-500 text-white text-sm px-2 py-0.5 rounded-full">
          {data.category}
        </p>
        <Popover>
          <PopoverTrigger className="hover:bg-green-500 rounded-sm hover:text-white">
            <SlOptions className="cursor-pointer w-[30px] h-[25px] px-0.5 py-1" />
          </PopoverTrigger>
          <PopoverContent className="w-[130px] border border-green-500 bg-amber-50 px-1 py-1">
            <ul className="divide-y divide-gray-200">
              <Link
                href={
                  user?.role === "member"
                    ? `/member/dashboard/my-blogs/details/${data.id}`
                    : `/admin/dashboard/all-blogs/details/${data.id}`
                }>
                <li className="cursor-pointer hover:bg-green-500 flex gap-1 hover:text-white px-1 text-green-500 pb-0.5">
                  <Eye className="relative top-1" size={17} />
                  View
                </li>
              </Link>
              {userId === data.authorId && (
                <>
                  <Link href={`/member/dashboard/my-blogs/update/${data.id}`}>
                    <li className="cursor-pointer flex gap-1 hover:bg-green-500 hover:text-white px-1 pt-0.5 border-t border-green-500 text-green-500">
                      <Edit className="relative top-1" size={17} />
                      Update
                    </li>
                  </Link>
                  <li
                    onClick={() => deleteBlog(data.id)}
                    className="cursor-pointer flex gap-1 hover:bg-red-500 hover:text-white px-1 border-t border-green-500 text-red-500 pt-0.5">
                    <Trash className="relative top-1" size={17} />
                    Delete
                  </li>
                </>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-4 pb-4 pt-2">
        <h1 className="text-xl font-semibold">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <p className="border-b border-green-900 pb-2 text-gray-700">
          {data.description.split(" ").slice(0, 10).join(" ")}...
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
          <p className="text-sm text-green-500 italic">
            {timeAgo.split(" ").slice(1, 3).join(" ")} ago
          </p>

          <div className="flex gap-4">
            <div className="flex gap-2 bg-green-500 px-3 py-1 rounded-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
