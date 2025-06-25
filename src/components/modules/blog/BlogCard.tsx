"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { SlOptions } from "react-icons/sl";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { Edit, Eye, Trash, BookOpen, MessageSquareMore } from "lucide-react";

import { TBlog } from "@/types/blog.types";
import { useUser } from "@/context/UserContext";
import { createVote, isUserVoted, undoVote } from "@/services/vote";
import { deleteMyBlog } from "@/services/blog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const { user } = useUser();

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

  const blogDetailsLink =
    user?.role === "member"
      ? `/member/dashboard/my-blogs/details/${data?.id}`
      : user?.role === "admin"
      ? `/admin/dashboard/all-blogs/details/${data?.id}`
      : `/blogs/${data?.id}`;

  return (
    <div className="w-full sm:w-[95%] mx-auto mb-8 rounded-2xl border border-[var(--primary)] bg-card shadow-[0_4px_24px_0_var(--primary-light)] overflow-hidden relative transition-all duration-300 hover:shadow-[var(--primary-light)]/50 hover:-translate-y-1 flex flex-col">
      {/* Blog badge */}
      <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full shadow text-xs font-bold z-10 backdrop-blur bg-[var(--primary)]/90 text-[var(--on-primary)] border border-[var(--primary-light)]">
        <BookOpen size={16} /> BLOG
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

      <div className="flex justify-between items-center px-5 pt-4">
        <p className="bg-[var(--primary)] text-[var(--on-primary)] text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow">
          {data.category}
        </p>
        <Popover>
          <PopoverTrigger className="hover:bg-[var(--primary-light)] rounded-md hover:text-[var(--primary-dark)] transition-colors">
            <SlOptions className="cursor-pointer w-[30px] h-[25px] px-0.5 py-1" />
          </PopoverTrigger>
          <PopoverContent className="w-[140px] border border-[var(--primary-light)] bg-white px-1 py-1 rounded-lg shadow">
            <ul className="divide-y divide-[var(--primary-light)]">
              <Link href={blogDetailsLink}>
                <li className="cursor-pointer hover:bg-[var(--primary-light)] flex gap-1 hover:text-[var(--primary-dark)] px-1 text-[var(--primary)] pb-0.5 rounded transition-colors">
                  <Eye className="relative top-1" size={17} />
                  View
                </li>
              </Link>
              {userId === data.authorId && (
                <>
                  <Link href={`/member/dashboard/my-blogs/update/${data?.id}`}>
                    <li className="cursor-pointer flex gap-1 hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)] px-1 pt-0.5 border-t border-[var(--primary-light)] text-[var(--primary)] rounded transition-colors">
                      <Edit className="relative top-1" size={17} />
                      Update
                    </li>
                  </Link>
                  <li
                    onClick={() => deleteBlog(data?.id)}
                    className="cursor-pointer flex gap-1 hover:bg-red-100 hover:text-red-600 px-1 border-t border-[var(--primary-light)] text-red-500 pt-0.5 rounded transition-colors">
                    <Trash className="relative top-1" size={17} />
                    Delete
                  </li>
                </>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-5 pb-5 pt-3 flex flex-col flex-grow">
        <h1 className="text-xl font-bold text-[var(--primary-dark)] mb-1 truncate">
          {data.title.split(" ").slice(0, 4).join(" ")}
        </h1>
        <p className="border-b border-[var(--primary-light)] pb-2 text-[var(--text-primary)] italic line-clamp-2">
          {data.description.split(" ").slice(0, 12).join(" ")}...
        </p>

        <div className="flex flex-row justify-between items-center gap-2 pt-2 mt-auto">
          <p className="text-xs text-[var(--primary)] italic">{timeAgo}</p>
          <div className="flex gap-4">
            <div className="flex gap-2 bg-[var(--primary)] px-3 py-1 rounded-full">
              <div className="flex items-center gap-1 border-r border-[var(--on-primary)] pr-2 text-[var(--on-primary)] text-lg cursor-pointer">
                {vote?.isVoted && vote?.value === "up" ? (
                  <BiSolidLike onClick={removeVote} />
                ) : (
                  <AiOutlineLike onClick={() => addVote("up")} />
                )}
                <span className="text-sm">{data.up_votes || 0}</span>
              </div>
              <div className="flex items-center text-[var(--on-primary)] text-lg cursor-pointer">
                {vote?.isVoted && vote?.value === "down" ? (
                  <AiFillDislike onClick={removeVote} />
                ) : (
                  <AiOutlineDislike onClick={() => addVote("down")} />
                )}
              </div>
            </div>
            <Link href={blogDetailsLink}>
              <MessageSquareMore size={22} className="text-[var(--primary)]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
