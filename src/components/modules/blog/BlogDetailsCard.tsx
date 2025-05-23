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

const BlogDetailsCard = ({
  blog,
  user,
  refresh,
}: {
  blog: TBlog;
  user: TAuthor;
  refresh: () => void;
}) => {
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
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg rounded-md bg-green-50 border border-green-500">
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
                className="rounded-xl w-full h-[500px] object-fill border-2 "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={`mb-4 capitalize text-white p-2 ${
            blog?.category === "waste"
              ? "bg-yellow-700"
              : blog.category === "energy"
              ? "bg-red-700"
              : "bg-green-700"
          }`}>
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
                <Edit className="text-green-600" />{" "}
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-1">
            {blog?.title}
          </h1>
          <p className="text-muted-foreground mb-2 text-xs ">
            Posted on{" "}
            {blog?.createdAt ? format(new Date(blog?.createdAt), "PPP") : "N/A"}{" "}
            by <span className="text-green-700 font-medium">{user?.name}</span>
          </p>
        </div>
        <div className="flex gap-4 mt-1">
          <div className="flex gap-2 bg-green-500 px-2 py-1 rounded-full">
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
      <p className="text-base text-gray-700 mt-4 text-justify">
        {blog?.description}
      </p>
    </div>
  );
};

export default BlogDetailsCard;
