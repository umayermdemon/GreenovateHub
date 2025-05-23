"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { useUser } from "@/context/UserContext";
import BlogCard from "../blog/BlogCard";
import BlogCardSkeleton from "@/skeletons/BlogCardSkeleton";

const FeaturedBlog = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await getAllBlogs({ status: "approved" });
    if (res?.data) {
      setBlogs(res.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const { user } = useUser();

  return (
    <section className="bg-gray-100 py-16 lg:mx-3">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-8">
          Featured Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-10">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
            : blogs
              ?.slice(0, 3)
              .map((blog: TBlog) => (
                <BlogCard
                  key={blog.id}
                  data={blog}
                  refresh={fetchBlogs}
                  userId={user?.userId}
                />
              ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
