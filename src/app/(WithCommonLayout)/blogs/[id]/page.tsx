"use client";

import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";
import { getSingleBlog } from "@/services/blog";
import BlogDetailsSkeleton from "@/skeletons/BlogDetailsSkeleton";
import { TBlog } from "@/types/blog.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<TBlog>({} as TBlog);
  const [loading, setLoading] = useState(true);
  const user = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleBlog(id);
        if (res?.data) {
          setBlog(res?.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (loading || !blog) {
    return <BlogDetailsSkeleton />;
  }

  return <BlogDetailsCard blog={blog} user={user} />;
};

export default BlogDetails;
