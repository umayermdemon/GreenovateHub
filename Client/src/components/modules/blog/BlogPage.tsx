"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

import BlogCard from "@/components/modules/blog/BlogCard";
import { TBlog, TBlogProps, TMeta } from "@/types/blog.types";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaginationComponent from "@/components/shared/Pagination/PaginationComponent";

const tabOrder = ["all", "energy", "waste", "transportation"];

const BlogPage = ({
  initialBlogs,
  initialMeta,
  initialCategory,
  initialPage,
}: TBlogProps) => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [blogs, setBlogs] = useState<TBlog[]>(initialBlogs);
  const [meta, setMeta] = useState<TMeta>(initialMeta);
  const [selectedTab, setSelectedTab] = useState<string>(
    initialCategory || "all"
  );
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    setSelectedTab(urlCategory);
    setCurrentPage(urlPage);
    setBlogs(initialBlogs);
    setMeta(initialMeta);
  }, [searchParams, initialBlogs, initialMeta]);

  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    params.set("page", "1");
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <div className="py-1 md:py-4 max-w-7xl mx-auto h-full px-2 sm:px-4">
      {/* tab section */}
      <div className="flex flex-col md:flex-row  gap-3 mx-2 md:mx-0">
        <h3 className="text-center md:text-left">By Category</h3>
        <div className="lg:mt-0 mt-2">
          <Tabs
            value={selectedTab}
            onValueChange={handleTabChange}
            className="mb-5">
            <TabsList className="w-full md:w-1/2 bg-background flex relative">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`
                    relative w-52 px-2 pb-3 transition-colors duration-200 group bg-background cursor-pointer
                    ${
                      selectedTab === tab
                        ? "font-semibold"
                        : "text-muted-foreground"
                    }
                  `}
                  style={{ background: "transparent" }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] w-full
                      bg-secondary
                      transition-transform duration-300
                      origin-left
                      ${
                        selectedTab === tab
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                      block
                    `}
                    style={{ transformOrigin: "left" }}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* blog grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {blogs?.length ? (
          blogs?.map((blog) => (
            <div key={blog.id}>
              <BlogCard data={blog} userId={user?.userId} />
            </div>
          ))
        ) : (
          <div>
            <p className="text-red-500 text-center">No blogs found</p>
          </div>
        )}
      </div>

      {/* pagination section */}
      <PaginationComponent
        currentPage={currentPage}
        meta={meta}
        setCurrentPage={setCurrentPage}
        pageUrl="/blogs"
      />
    </div>
  );
};

export default BlogPage;
