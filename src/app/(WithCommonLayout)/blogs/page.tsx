/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogPage from "@/components/modules/blog/Open/BlogPage";
import { getAllBlogs } from "@/services/blog";

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
    <div className="max-w-7xl mx-auto">
      <BlogPage
        initialBlogs={res?.data}
        initialMeta={res?.meta}
        initialCategory={categoryName}
        initialSearch={searchTerm}
        initialPage={parseInt(currentPage, 10)}
      />
    </div>
  );
};

export default Blogs;
