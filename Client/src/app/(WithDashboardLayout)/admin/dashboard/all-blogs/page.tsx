import AllBlogPage from "@/components/modules/Idea/AllBlogPage";
import React from "react";

const AllBlogs = () => {
  return (
    <div className=" lg:mx-6">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-3xl font-bold  text-primary mt-2">All Blogs</h1>
        <p className="text-muted-foreground text-base">
          Browse, search, and manage all submitted blogs. Use filters and search
          to find what you need.
        </p>
      </div>
      <AllBlogPage />
    </div>
  );
};

export default AllBlogs;
