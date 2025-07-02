"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BlogCard from "@/components/modules/blog/BlogCard";
import { TBlog } from "@/types/blog.types";
import { useRouter, useSearchParams } from "next/navigation";

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
  initialSearch,
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
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch || "");
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    const urlSearch = searchParams.get("search") || "";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    setSelectedTab(urlCategory);
    setSearchTerm(urlSearch);
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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
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
    <div className="my-1 md:my-6">
      <div className="lg:flex lg:flex-row-reverse gap-3 lg:mx-4 mx-1">
        <div className="flex flex-1 lg:mb-0 mb-1 lg:mx-0 mx-0.5">
          <Input
            placeholder="Search Blog..."
            className="lg:w-full border-amber-500 rounded-r-none focus:border-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button
            className="rounded-l-none rounded-r-full cursor-pointer bg-amber-500"
            size="icon"
            onClick={handleSearch}>
            <Search size={18} />
          </Button>
        </div>
        <div className="flex-1 lg:mt-0 mt-2">
          <Tabs
            value={selectedTab}
            onValueChange={handleTabChange}
            className="mb-5">
            <TabsList className="w-full">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="w-full data-[state=active]:bg-amber-500 data-[state=active]:text-white cursor-pointer">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-2 mx-5 grid-cols-1 ">
        {blogs?.length ? (
          blogs?.map((blog) => (
            <BlogCard key={blog.id} data={blog} userId={user?.userId} />
          ))
        ) : (
          <div className="text-center w-full border">
            <p className="text-black text-center">No blogs found</p>
          </div>
        )}
      </div>
      {/* pagination section */}
      <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-md border transition-all duration-200 flex items-center gap-2
      ${
        currentPage === 1
          ? "bg-gray-400 text-black cursor-not-allowed"
          : "bg-white text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white"
      } cursor-pointer`}>
          <ChevronLeft className="text-lg" />
        </Button>

        {/* Page Number Buttons with Icons */}
        <div className="flex gap-1">
          {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 cursor-pointer rounded-md text-sm border transition-all duration-200 flex items-center gap-1
            ${
              isActive
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-amber-600 border-amber-500 hover:bg-amber-600 hover:text-white hover:border-amber-600"
            }`}>
                <span className="font-semibold">{page}</span>
              </button>
            );
          })}
        </div>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === meta?.totalPage}
          className={`px-4 py-2 rounded-md border transition-all duration-200 flex items-center gap-2 cursor-pointer
      ${
        currentPage === meta?.totalPage
          ? "bg-gray-400 text-black cursor-not-allowed"
          : "bg-amber-600 text-white hover:bg-amber-600 border-amber-600"
      }`}>
          <ChevronRight className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default BlogPage;
