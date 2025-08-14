"use client";

import { TAuthor, TBlog } from "@/types/blog.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { format } from "date-fns";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Edit, SendHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteMyBlog } from "@/services/blog";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { createVote, undoVote } from "@/services/vote";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { TComment } from "../Idea/IdeaDetailsCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSingleUser } from "@/services/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogDetailsCard = ({
  blog,
  user,
}: {
  blog: TBlog;
  user: TAuthor | null;
}) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [getCurrentUser, setGetCurrentUser] = useState<TAuthor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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
  console.log(pathname);
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!currentUser) return;
      const user = await getSingleUser(currentUser?.userId);
      setGetCurrentUser(user.data);
    };
    getCurrentUser();
  }, [currentUser]);
  // / Dummy: Add comment
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    const newComment: TComment = {
      id: getCurrentUser?.id || "temp-id",
      author: getCurrentUser?.name || "Anonymous",
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

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(`/blogs?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] mt-4  bg-background flex flex-col md:flex-row gap-4">
      {/* Blog Left side */}
      <div className="w-full md:w-3/4 rounded-xl border border-border bg-card p-6">
        {/* Title and Meta */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-medium mb-2 text-foreground">
            {blog?.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground text-sm">
            <div>
              <span>
                Posted on{" "}
                {blog?.createdAt
                  ? format(new Date(blog?.createdAt), "PPP")
                  : "N/A"}
              </span>
              <span>•</span>
              <span className="text-primary font-medium">by {user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div>
                {user &&
                  (currentUser?.userId === user?.id ||
                    currentUser?.role === "admin") && (
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
              <Badge className={`capitalize text-white p-2 bg-primary`}>
                {blog?.category}
              </Badge>
            </div>
          </div>
        </div>
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

        {/* Description */}
        <div className="bg-card rounded-xl">
          <p className="text-base text-foreground text-justify">
            {blog?.description}
          </p>
        </div>

        {/* Voting */}
        <div className="flex justify-end">
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

        {/* Comments Section */}
        <div className="bg-card p-4 md:p-6 rounded-xl border border-border mt-4">
          <h2 className="text-lg sm:text-xl font-semibold text-primary">
            Comments
          </h2>
          <div className="flex flex-col gap-8">
            {/* Comment Field */}
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-3">
                Write a Comment
              </h3>
              <div className="flex items-start gap-3 w-full">
                <Avatar className="w-[40px] h-[40px] border-primary border">
                  <AvatarImage
                    src={
                      getCurrentUser?.image ||
                      "https://res.cloudinary.com/duagqnvpw/image/upload/v1752406954/young-bearded-man-with-striped-shirt_1_b9fdtl.jpg"
                    }
                    alt={getCurrentUser?.name}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-background rounded-xl px-4 py-2 border border-border shadow-sm relative">
                  <textarea
                    className="w-full resize-none bg-transparent outline-none text-sm placeholder-muted-foreground "
                    placeholder="Write a comment..."
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}></textarea>
                  <div className="absolute bottom-2 right-2">
                    {currentUser ? (
                      <SendHorizontal
                        onClick={
                          commentText.trim() ? handleAddComment : undefined
                        }
                        className={`transition-opacity ${
                          commentText.trim()
                            ? "text-primary opacity-100 cursor-pointer"
                            : "text-muted-foreground opacity-50 pointer-events-none"
                        }`}
                        aria-disabled={!commentText.trim()}
                      />
                    ) : (
                      <Button
                        onClick={() =>
                          router.push(`/login?redirectPath=${pathname}`)
                        }
                        className="bg-primary text-white hover:bg-primary/90 transition-colors rounded-full cursor-pointer">
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Comment List */}
            {comments.length > 0 && (
              <div className="w-full">
                <h3 className="text-base sm:text-lg font-medium text-foreground mb-3">
                  All Comments
                </h3>
                <div
                  className={`${
                    comments.length > 2 && "h-[200px] md:h-[300px]"
                  } overflow-y-auto pr-2 space-y-4`}>
                  {comments.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No comments yet.
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex items-start gap-3 border-l-2 border-muted-foreground/20 pl-4 pb-4">
                        <Avatar className="w-8 h-8 mt-1 border border-border">
                          <AvatarImage
                            src={`https://i.pravatar.cc/40?u=${comment.author}`}
                            alt={comment.author}
                          />
                          <AvatarFallback />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground text-sm">
                              {comment.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(comment.createdAt), "Pp")}
                            </span>
                          </div>
                          <div className="mt-1 mb-1 border-l-2 border-muted-foreground/20 p-2">
                            {comment.content.split("\n").map((line, idx) => (
                              <p
                                key={idx}
                                className="text-foreground text-sm text-justify">
                                {line}
                              </p>
                            ))}
                          </div>
                          <button
                            className="text-primary text-xs font-medium hover:underline cursor-pointer"
                            // onClick={() => handleReply(comment.id)} // Implement reply logic if needed
                            type="button">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Right side */}
      <div className="w-full md:w-1/4">
        {/* Search Bar */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h1 className="text-foreground font-bold text-center text-2xl">
            Search Blog
          </h1>
          <div className="flex items-center gap-2 my-2">
            <Input
              type="text"
              className="flex-1 p-2 border border-border rounded-none focus:border-primary focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              onClick={handleSearch}
              size={"lg"}
              className="bg-primary/90 text-white hover:bg-primary transition-colors rounded-none cursor-pointer">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsCard;
