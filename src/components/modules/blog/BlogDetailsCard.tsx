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
import { usePathname, useRouter } from "next/navigation";
import { createVote, undoVote } from "@/services/vote";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { TComment } from "../Idea/IdeaDetailsCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
}: {
  blog: TBlog;
  user: TAuthor | null;
}) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const { user: currentUser } = useUser();
  const pathname = usePathname();
  const addVote = async (value: string) => {
    const voteData = {
      blogId: blog.id,
      value: value,
    };
    try {
      const res = await createVote(voteData);
      if (res.success) {
        console.log(res?.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // / Dummy: Add comment
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

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
        console.log(res.success);
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

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] p-2 sm:p-4 my-4 rounded-2xl border bg-background flex flex-row gap-4 shadow-lg">
      {/* Blog Header */}
      <div className="w-full md:w-2/3">
        {/* Images */}
        <div>
          {blog?.images && blog?.images?.length > 0 && (
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop
              className="rounded-xl mb-6 shadow-lg">
              {blog.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={img}
                    alt={`Blog Image ${idx + 1}`}
                    width={400}
                    height={800}
                    className="rounded-xl w-full h-[220px] sm:h-[350px] md:h-[500px] object-cover border-2 border-primary/10"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Top Row: Badge & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <Badge
            variant="outline"
            className={`capitalize text-primary-foreground p-2 ${getBadgeColor(
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
                  className="cursor-pointer hover:text-primary transition-colors">
                  <Edit className="text-primary" />
                </Link>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="cursor-pointer hover:text-destructive transition-colors">
                  <Trash className="text-destructive" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title and Meta */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
            {blog?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
            <span>
              Posted on{" "}
              {blog?.createdAt
                ? format(new Date(blog?.createdAt), "PPP")
                : "N/A"}
            </span>
            <span>•</span>
            <span className="text-primary font-medium">by {user?.name}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card p-4 sm:p-6 rounded-xl border border-border mb-6">
          <p className="text-base text-foreground text-justify">
            {blog?.description}
          </p>
        </div>

        {/* Voting */}
        <div className="flex justify-end mb-8">
          <div className="flex gap-2 bg-primary px-4 py-1 rounded-full shadow-lg border border-border">
            <div className="flex items-center gap-1 border-r border-white/30 pr-2 text-primary-foreground text-lg cursor-pointer hover:text-primary/80 transition-colors">
              {isUpvoted ? (
                <BiSolidLike onClick={removeVote} />
              ) : (
                <AiOutlineLike onClick={() => addVote("up")} />
              )}
              <span className="text-sm">{blog.up_votes}</span>
            </div>
            <div className="flex items-center text-primary-foreground text-lg cursor-pointer hover:text-primary/80 transition-colors">
              {isDownvoted ? (
                <AiFillDislike onClick={removeVote} />
              ) : (
                <AiOutlineDislike onClick={() => addVote("down")} />
              )}
              <span className="text-sm">{blog.down_votes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-card p-4 sm:p-6 rounded-xl border border-border w-full md:w-1/3">
        <h2 className="text-lg sm:text-xl font-semibold text-primary mb-6">
          Comments
        </h2>
        <div className="flex flex-col-reverse gap-8">
          {/* Comment Field */}
          <div className="w-full">
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-3">
              Write a Comment
            </h3>
            <div className="flex items-start gap-3 w-full">
              <Avatar className="w-[40px] h-[40px] border-primary border">
                <AvatarImage
                  src={user?.image || "https://i.pravatar.cc/40"}
                  alt={user?.name}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="flex-1  bg-background rounded-xl px-4 py-2 border border-border shadow-sm">
                <textarea
                  className="w-full resize-none bg-transparent outline-none text-sm placeholder-muted-foreground"
                  placeholder="Write a comment..."
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}></textarea>
                <div className="flex justify-end mt-1">
                  <button
                    onClick={handleAddComment}
                    className="bg-primary text-primary-foreground text-sm px-4 py-1.5 rounded-md hover:bg-primary/90 transition-all duration-300">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Comment List */}
          <div className="w-full">
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-3">
              All Comments
            </h3>
            <div className="h-[200px] sm:h-[300px] overflow-y-auto pr-2 space-y-4">
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No comments yet.
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-background rounded-xl shadow-sm p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8 border-primary border">
                        <AvatarImage
                          src={`https://i.pravatar.cc/40?u=${comment.author}`}
                          alt={comment.author}
                        />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {comment.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(comment.createdAt), "PPPp")}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground text-sm">{comment.content}</p>
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
