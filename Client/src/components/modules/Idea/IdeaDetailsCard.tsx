"use client";

import { TAuthor } from "@/types/blog.types";
import { TIdea } from "@/types/idea.types";
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
import { PaymentModal } from "./PaymentModal";
import { useEffect, useState } from "react";
import { getSingleOrder } from "@/services/order";
import { TOrder } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TComment = {
  id: string;
  blogId: string;
  author: string;
  content: string;
  createdAt: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "underReview":
      return "bg-yellow-500";
    case "draft":
      return "bg-gray-500";
    case "approved":
      return "bg-green-600";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
};

const IdeaDetailsCard = ({
  idea,
  user,
}: {
  idea: TIdea;
  user: TAuthor | null;
}) => {
  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null);
  const [comments, setComments] = useState<TComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Dummy: Add comment
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    const newComment: TComment = {
      id: user.id,
      blogId: idea.id,
      author: user.name || "Anonymous",
      content: commentText,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  const isUpvoted = idea.up_votes > 0;
  const isDownvoted = idea.down_votes > 0;

  const addVote = async (value: string) => {
    try {
      const res = await createVote({ blogId: idea.id, value });
      if (res.success) {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeVote = async () => {
    try {
      const res = await undoVote({ blogId: idea.id });
      if (res.success) {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
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
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  useEffect(() => {
    const findIdea = async () => {};
    findIdea();
  }, []);
  useEffect(() => {
    const getPayment = async () => {
      const res = await getSingleOrder(idea?.id);
      if (res?.success) {
        setCurrentOrder(res?.data);
      }
    };
    getPayment();
  }, [idea?.id]);

  if (!idea) {
    return (
      <div className="text-center py-10 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] p-3 sm:p-4 md:p-6 my-6 rounded-2xl border border-green-300 bg-gradient-to-br from-amber-50 via-white to-green-50 shadow-[0_4px_24px_0_rgba(34,197,94,0.10)] overflow-hidden relative transition-all duration-300 hover:shadow-green-400/40">
      {/* Glassy Category Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1 rounded-full shadow text-xs sm:text-sm font-bold z-10 backdrop-blur bg-green-500/90 text-white border border-green-300">
        {idea.category}
      </div>

      {/* Images */}
      <div className="rounded-xl mb-8 overflow-hidden border-2 border-green-200 shadow-lg">
        {idea?.images?.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className="rounded-xl">
            {idea.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={
                    img ||
                    "https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"
                  }
                  alt={
                    idea.title
                      ? `${idea.title} Image ${idx + 1}`
                      : `Idea Image ${idx + 1}`
                  }
                  width={800}
                  height={400}
                  className="rounded-xl w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                  priority={idx === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src="https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"
            alt={
              idea.title ? `${idea.title} Default Image` : "Idea Default Image"
            }
            width={800}
            height={400}
            className="rounded-xl w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
            priority
          />
        )}
      </div>

      {/* Top Row: Premium & Actions */}
      <div className="flex flex-row justify-between items-center mb-4 gap-3">
        <div
          className={`px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow ${
            idea.isPremium
              ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}>
          {idea.isPremium ? `Premium - $${idea.price}` : "Free"}
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {currentOrder?.status === "paid" ? (
            <button className="bg-green-600 text-xs sm:text-sm text-white font-medium px-3 py-2 rounded-lg transition hover:bg-green-700">
              Paid ৳{idea.price}
            </button>
          ) : (
            idea.isPremium &&
            idea?.authorId !== user?.id &&
            user?.role === "member" && <PaymentModal idea={idea} user={user} />
          )}
          {user && (
            <>
              <Link
                href={`/member/dashboard/my-blogs/update/${idea.id}`}
                className="cursor-pointer hover:text-green-700 transition-colors">
                <Edit className="text-green-600" />
              </Link>
              <button
                onClick={() => deleteBlog(idea.id)}
                className="cursor-pointer hover:text-red-700 transition-colors">
                <Trash className="text-red-600" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Title, Author, Date */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2 break-words">
          {idea.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground mb-2 text-sm">
          <span>
            Posted on{" "}
            {idea.createdAt ? format(new Date(idea.createdAt), "PPP") : "N/A"}
          </span>
          <span>•</span>
          <span className="text-green-700 font-medium">by {user?.name}</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white/50 p-6 rounded-xl border border-green-100 mb-6">
        <p className="text-base sm:text-lg text-gray-700 text-justify break-words">
          {idea.description}
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/50 p-6 rounded-xl border border-green-100">
          <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-3">
            Problem Statement
          </h2>
          <p className="text-gray-800 text-justify break-words">
            {idea.problem_statement}
          </p>
        </div>
        <div className="bg-white/50 p-6 rounded-xl border border-green-100">
          <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-3">
            Proposed Solution
          </h2>
          <p className="text-gray-800 text-justify break-words">
            {idea.proposed_solution}
          </p>
        </div>
      </div>

      {/* Status and Voting */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div
          className={`px-4 py-1 rounded-full text-white text-xs sm:text-sm font-medium shadow ${getStatusColor(
            idea.status
          )}`}>
          Status: {idea.status}
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 bg-gradient-to-r from-green-500 to-green-600 px-4 py-1 rounded-full shadow-lg border border-green-200">
            {/* Upvote */}
            <div className="flex items-center gap-1 border-r border-white/30 pr-2 text-white text-lg cursor-pointer hover:text-green-100 transition-colors">
              {isUpvoted ? (
                <BiSolidLike onClick={removeVote} />
              ) : (
                <AiOutlineLike onClick={() => addVote("up")} />
              )}
              <span className="text-sm">{idea.up_votes}</span>
            </div>
            {/* Downvote */}
            <div className="flex items-center text-white text-lg cursor-pointer hover:text-green-100 transition-colors">
              {isDownvoted ? (
                <AiFillDislike onClick={removeVote} />
              ) : (
                <AiOutlineDislike onClick={() => addVote("down")} />
              )}
              <span className="text-sm">{idea.down_votes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white/50 p-6 rounded-xl border border-green-100">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-6">
          Comments
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Comment Field */}
          <div className="w-full md:w-1/2">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3">
              Write a Comment
            </h3>
            <div className="flex items-start gap-3">
              <Avatar className="w-[40px] h-[40px] border-green-500 border">
                <AvatarImage
                  src={user?.image || "https://i.pravatar.cc/40"}
                  alt={user?.name}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-white rounded-xl px-4 py-2 border border-green-200 shadow-sm">
                <textarea
                  className="w-full resize-none bg-transparent outline-none text-sm placeholder-gray-500"
                  placeholder="Write a comment..."
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}></textarea>
                <div className="flex justify-end mt-1">
                  <button
                    onClick={handleAddComment}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm px-4 py-1.5 rounded-md hover:from-green-600 hover:to-green-700 transition-all duration-300">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Comment List */}
          <div className="w-full md:w-1/2">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3">
              All Comments
            </h3>
            <div className="h-[300px] overflow-y-auto pr-2 space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-xl shadow-sm p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8 border-green-500 border">
                        <AvatarImage
                          src={`https://i.pravatar.cc/40?u=${comment.author}`}
                          alt={comment.author}
                        />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-green-700">
                          {comment.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(comment.createdAt), "PPPp")}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm">{comment.content}</p>
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

export default IdeaDetailsCard;
