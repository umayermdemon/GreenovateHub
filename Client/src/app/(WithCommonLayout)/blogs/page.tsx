/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogPage from "@/components/modules/blog/Open/BlogPage";
import PageTopStyle from "@/components/shared/PageTopStyle";
import { getAllBlogs } from "@/services/blog";
import { Suspense } from "react";

const Blogs = async ({ searchParams }: any) => {
  const { category, page, search } = await searchParams;
  const categoryName = category || "all";
  const searchTerm = search || "";
  const currentPage = page || "1";

  const res = await getAllBlogs({
    category: categoryName === "all" ? "" : categoryName,
    searchTerm: searchTerm,
    page: currentPage,
    status: "approved",
    limit: "8",
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageTopStyle
        header="Blog Posts"
        description="Browse our latest blog posts below."
        footer="Blogs"
      />
      <div className="bg-background">
        <BlogPage
          initialBlogs={res?.data}
          initialMeta={res?.meta}
          initialCategory={categoryName}
          initialSearch={searchTerm}
          initialPage={parseInt(currentPage, 10)}
        />
      </div>
    </Suspense>
  );
};

export default Blogs;
