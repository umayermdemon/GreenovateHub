"use client";

import { TAuthor, TBlog } from "@/types/blog.types";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { format } from "date-fns";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteMyBlog } from "@/services/blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createVote, undoVote } from "@/services/vote";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { TComment } from "../Idea/IdeaDetailsCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Color mapping based on blog card color logic
const getCategoryColor = (category: string) => {
  switch (category) {
    case "waste":
      return "bg-amber-100 border-amber-400";
    case "energy":
      return "bg-amber-200 border-amber-500";
    case "transportation":
      return "bg-amber-50 border-amber-300";
    default:
      return "bg-amber-50 border-amber-400";
  }
};

const getBadgeColor = (category: string) => {
  switch (category) {
    case "waste":
      return "bg-amber-600";
    case "energy":
      return "bg-amber-700";
    case "transportation":
      return "bg-amber-500";
    default:
      return "bg-amber-600";
  }
};

const BlogDetailsCard = ({
  blog,
  user,
  refresh,
}: {
  blog: TBlog;
  user: TAuthor;
  refresh: () => void;
}) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const { user: currentUser } = useUser();
  const addVote = async (value: string) => {
    const voteData = {
      blogId: blog.id,
      value: value,
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
  // / Dummy: Add comment
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment: TComment = {
      id: user?.id,
      author: user?.name || "Anonymous",
      content: commentText,
      createdAt: new Date().toISOString(),
      blogId: "",
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };
  const removeVote = async () => {
    const voteData = {
      blogId: blog.id,
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
          if (res?.success) {
            toast.success("Blog deleted successfully");
            router.push(`/${user?.role}/dashboard/my-blogs`);
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const isUpvoted = blog.up_votes > 0;
  const isDownvoted = blog.down_votes > 0;
  if (!blog) {
    return (
      <div className="text-center py-10 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div
      className={`max-w-5xl lg:container mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg rounded-2xl border ${getCategoryColor(
        blog?.category
      )} bg-gradient-to-br from-amber-50 via-white to-amber-50`}>
      {/* Images */}
      {blog?.images && blog?.images?.length > 0 && (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="rounded-xl mb-6">
          {blog.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Blog Image ${idx + 1}`}
                width={800}
                height={800}
                className="rounded-xl w-full h-[500px] object-fill border-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Top Row: Badge & Actions */}
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={`mb-4 capitalize text-white p-2 ${getBadgeColor(
            blog?.category
          )}`}>
          {blog?.category}
        </Badge>
        <div>
          {user && (
            <div className="flex items-center gap-4">
              <Link
                href={
                  currentUser?.role === "member"
                    ? `/member/dashboard/my-blogs/update/${blog?.id}`
                    : `/admin/dashboard/all-blogs/update/${blog?.id}`
                }
                className="cursor-pointer">
                <Edit className="text-amber-600" />{" "}
              </Link>
              <h2
                onClick={() => deleteBlog(blog.id)}
                className="cursor-pointer">
                <Trash className="text-red-600" />
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* Title, Author, Date */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-amber-800 mb-1">
            {blog?.title}
          </h1>
          <p className="text-muted-foreground mb-2 text-xs ">
            Posted on{" "}
            {blog?.createdAt ? format(new Date(blog?.createdAt), "PPP") : "N/A"}{" "}
            by <span className="text-amber-700 font-medium">{user?.name}</span>
          </p>
        </div>
        {/* Voting */}
        <div className="flex gap-4 mt-1">
          <div className="flex gap-2 bg-amber-500 px-2 py-1 rounded-full">
            <div className="flex gap-0.5 border-r cursor-pointer pr-1 text-white text-[19px]">
              <p>
                {isUpvoted ? (
                  <BiSolidLike onClick={removeVote} />
                ) : (
                  <AiOutlineLike onClick={() => addVote("up")} />
                )}
              </p>
              <p className="text-sm">{blog.up_votes}</p>
            </div>
            <div className="flex gap-0.5 cursor-pointer pr-1 text-white text-[19px]">
              <p>
                {isDownvoted ? (
                  <AiFillDislike onClick={removeVote} />
                ) : (
                  <AiOutlineDislike onClick={() => addVote("down")} />
                )}
              </p>
              <p className="text-sm">{blog.down_votes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-gray-700 mt-4 text-justify">
        {blog?.description}
      </p>

      {/* --- Comment Section (like IdeaDetailsCard) --- */}
      <div className="mt-10 border-t pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-amber-700 mb-4">
          Comments
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Comment Field */}
          <div className="w-full md:w-1/2">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3">
              Write a Comment
            </h3>
            <div className="flex items-start gap-3">
              <Avatar className="w-[40px] h-[40px] border-amber-500 border">
                <AvatarImage
                  src={user?.image || "https://i.pravatar.cc/40"}
                  alt={user?.name}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-gray-100 rounded-xl px-4 py-2 border border-gray-300">
                <textarea
                  className="w-full resize-none bg-transparent outline-none text-sm placeholder-gray-500"
                  placeholder="Write a comment..."
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}></textarea>
                <div className="flex justify-end mt-1">
                  <button
                    onClick={handleAddComment}
                    className="bg-amber-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-amber-700 transition">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Comment List */}
          <div className="w-full md:w-1/2">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
              All Comments
            </h3>
            <div className="h-[200px] overflow-y-auto pr-2 space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-md shadow-sm p-3 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold text-amber-700">
                        {comment.author}
                      </span>{" "}
                      • {format(new Date(comment.createdAt), "PPPp")}
                    </p>
                    <p className="text-gray-800">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsCard;
