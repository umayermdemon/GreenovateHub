"use client";

import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";
import { getSingleBlog } from "@/services/blog";
import { getSingleUser } from "@/services/user";
import BlogDetailsSkeleton from "@/skeletons/BlogDetailsSkeleton";
import { TAuthor, TBlog } from "@/types/blog.types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<TBlog>({} as TBlog);
  const [user, setUser] = useState<TAuthor>({} as TAuthor);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const res = await getSingleBlog(id);
    if (res?.data) {
      setBlog(res.data);
    }
    const user = await getSingleUser(blog?.authorId);
    if (user?.data) {
      setUser(user.data);
      setLoading(false);
    }
  }, [id, blog?.authorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || !blog || !user) {
    return <BlogDetailsSkeleton />;
  }

  return <BlogDetailsCard blog={blog} user={user} refresh={fetchData} />;
};

export default BlogDetails;
