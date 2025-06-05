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
import { Edit, Eye, Trash, BookOpen } from "lucide-react";
import { deleteMyBlog } from "@/services/blog";
import Swal from "sweetalert2";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { createVote, isUserVoted, undoVote } from "@/services/vote";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      const blogData = {
        blogId: data?.id,
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
  }, [data?.id, userId]);

  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  const { user } = useUser();

  const addVote = async (value: string) => {
    try {
      const res = await createVote({ ideaId: data?.id, value });
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
      const res = await undoVote({ ideaId: data?.id });
      if (res.success) {
        setVote({ isVoted: false });
        data.up_votes = (data.up_votes || 0) - (vote.isVoted ? 1 : 0);
        data.down_votes = (data.down_votes || 0) - (vote.isVoted ? 1 : 0);
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
          if (res?.success) {
            toast.success(res?.message);
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="w-full sm:w-[95%] mx-auto mb-8 rounded-2xl border border-amber-300 bg-amber-50 shadow-[0_4px_24px_0_rgba(255,191,71,0.10)] overflow-hidden relative transition-all duration-300 hover:shadow-amber-400/50 hover:-translate-y-1">
      {/* Blog badge */}
      <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full shadow text-xs font-bold z-10 backdrop-blur bg-amber-500/90 text-white border border-amber-300">
        <BookOpen size={16} /> BLOG
      </div>

      <Link
        href={
          user?.role === "member"
            ? `/member/dashboard/my-blogs/details/${data?.id}`
            : user?.role === "admin"
            ? `/admin/dashboard/all-blogs/details/${data?.id}`
            : `/blogs/${data?.id}`
        }>
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

      <div className="flex justify-between items-center px-5 pt-4">
        <p className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow">
          {data.category}
        </p>
        <Popover>
          <PopoverTrigger className="hover:bg-amber-100 rounded-md hover:text-amber-700 transition-colors">
            <SlOptions className="cursor-pointer w-[30px] h-[25px] px-0.5 py-1" />
          </PopoverTrigger>
          <PopoverContent className="w-[140px] border border-amber-300 bg-white px-1 py-1 rounded-lg shadow">
            <ul className="divide-y divide-amber-100">
              <Link
                href={
                  user?.role === "member"
                    ? `/member/dashboard/my-blogs/details/${data?.id}`
                    : user?.role === "admin"
                    ? `/admin/dashboard/all-blogs/details/${data?.id}`
                    : `/blogs/${data?.id}`
                }>
                <li className="cursor-pointer hover:bg-amber-100 flex gap-1 hover:text-amber-700 px-1 text-amber-600 pb-0.5 rounded transition-colors">
                  <Eye className="relative top-1" size={17} />
                  View
                </li>
              </Link>
              {userId === data.authorId && (
                <>
                  <Link href={`/member/dashboard/my-blogs/update/${data?.id}`}>
                    <li className="cursor-pointer flex gap-1 hover:bg-amber-100 hover:text-amber-700 px-1 pt-0.5 border-t border-amber-100 text-amber-600 rounded transition-colors">
                      <Edit className="relative top-1" size={17} />
                      Update
                    </li>
                  </Link>
                  <li
                    onClick={() => deleteBlog(data?.id)}
                    className="cursor-pointer flex gap-1 hover:bg-red-100 hover:text-red-600 px-1 border-t border-amber-100 text-red-500 pt-0.5 rounded transition-colors">
                    <Trash className="relative top-1" size={17} />
                    Delete
                  </li>
                </>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-5 pb-5 pt-3">
        <h1 className="text-xl font-bold text-amber-700 mb-1 truncate">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <p className="border-b border-amber-200 pb-2 text-gray-700 italic line-clamp-2">
          {data.description.split(" ").slice(0, 12).join(" ")}...
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-3">
          <p className="text-xs text-amber-600 italic">
            {timeAgo.split(" ").slice(1, 3).join(" ")} ago
          </p>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-amber-500 px-3 py-1 rounded-full shadow border border-amber-200">
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
