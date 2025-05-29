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
    <section className="pb-16 lg:mx-3">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">
          <span className="text-green-700">Featured</span>
          <span className="text-amber-500"> Blog</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))
            : blogs
                ?.slice(0, 4)
                .map((blog: TBlog) => (
                  <BlogCard key={blog.id} data={blog} userId={user?.userId} />
                ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blogs"
            className="inline-block bg-gradient-to-r from-amber-400 to-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:from-amber-500 hover:to-green-700 transition-all duration-200">
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
