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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-2">
          <span className="text-secondary">Featured Blog</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
          Explore expert insights, practical tips, and inspiring stories from
          the world of sustainability and innovation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))
            : blogs
                ?.slice(0, 3)
                .map((blog: TBlog) => (
                  <BlogCard key={blog.id} data={blog} userId={user?.userId} />
                ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blogs"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition-all duration-200">
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
