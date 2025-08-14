"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import BlogCard from "@/components/modules/blog/BlogCard";
import { TBlog } from "@/types/blog.types";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabOrder = ["all", "energy", "waste", "transportation"];

interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
interface IBlogProps {
  initialBlogs: TBlog[];
  initialMeta: TMeta;
  initialCategory: string;
  initialSearch: string;
  initialPage: number;
}
const BlogPage = ({
  initialBlogs,
  initialMeta,
  initialCategory,
  initialPage,
}: IBlogProps) => {
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

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <div className="py-1 md:py-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row  gap-3">
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
        ${selectedTab === tab ? "font-semibold" : "text-muted-foreground"}
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

      <div>
        {blogs?.length ? (
          blogs?.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2">
              <BlogCard data={blog} userId={user?.userId} />
            </div>
          ))
        ) : (
          <div>
            <p className="text-red-500 text-center">No blogs found</p>
          </div>
        )}
        {/* pagination section */}
        <div className="mt-6 flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-md border transition-all duration-200 flex items-center gap-2
      ${
        currentPage === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-200"
          : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
      } cursor-pointer px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base`}>
            <ChevronLeft className="text-lg" />
          </Button>

          {/* Page Number Buttons with Icons */}
          <div className="flex gap-0.5 sm:gap-1">
            {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 sm:px-3 py-1 cursor-pointer rounded-md text-xs sm:text-sm border transition-all duration-200 flex items-center gap-1
            ${
              isActive
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
            }`}
                  style={{ minWidth: 32 }}>
                  <span className="font-semibold">{page}</span>
                </button>
              );
            })}
          </div>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta?.totalPage}
            className={`rounded-md border transition-all duration-200 flex items-center gap-2 cursor-pointer
      ${
        currentPage === meta?.totalPage
          ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-200"
          : "bg-primary text-white hover:bg-primary border-primary"
      } px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base`}>
            <ChevronRight className="text-lg" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
