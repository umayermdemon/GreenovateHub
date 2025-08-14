"use client";
import BlogCard from "@/components/modules/blog/BlogCard";
import { PageHeader } from "@/components/singles/PageHeader";
import { useUser } from "@/context/UserContext";
import { getMyBlogs } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { useEffect, useState } from "react";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);

  const fetchBlogs = async () => {
    const res = await getMyBlogs();
    if (res?.data) {
      setBlogs(res?.data);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const { user } = useUser();
  return (
    <div className="">
      <div className="flex items-center justify-between mx-8 mt-5">
        <PageHeader
          title="Explore Inspiring Blogs"
          description="Browse through a collection of personal stories, unique ideas, and thoughtful opinions shared by our community. Get inspired or share your own!"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mx-5 ">
        {blogs?.map((blog: TBlog) => (
          <BlogCard key={blog.id} data={blog} userId={user?.userId} />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
