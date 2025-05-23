"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { getAllBlogs } from "@/services/blog";
import BlogCard from "@/components/modules/blog/BlogCard";
import { TBlog } from "@/types/blog.types";

const tabOrder = ["all", "energy", "waste", "transportation"];

const BlogPage = () => {
  interface TMeta {
    page: number,
    limit: number,
    total: number,
    totalPage: number
  }
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [meta, setMeta] = useState<TMeta>({} as TMeta);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const fetchBlogs = useCallback(async () => {
    const res = await getAllBlogs({
      category: selectedTab === "all" ? "" : selectedTab,
      searchTerm: searchTerm,
      page: currentPage.toString(),
      status: "approved"
    });
    if (res.success) {
      setBlogs(res.data);
      setMeta(res.meta);
    }
  }, [selectedTab, searchTerm, currentPage]);
  useEffect(() => {
    fetchBlogs()
  }, [searchTerm, selectedTab, currentPage, fetchBlogs]);
  const { user } = useUser();
  console.log(blogs);

  return (

    <div className="lg:mx-8 my-6">
      <div className="lg:flex lg:flex-row-reverse gap-3 lg:mx-4 mx-1">
        <div className="flex flex-1 lg:mb-0 mb-1 lg:mx-0 mx-0.5">
          <Input
            placeholder="Search Idea..."
            className="lg:w-full border-green-500 rounded-r-none focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="rounded-l-none rounded-r-full cursor-pointer bg-green-500"
            size="icon"
          >
            <Search size={18} />
          </Button>
        </div>
        <div className="flex-1 lg:mt-0 mt-2">
          <Tabs
            value={selectedTab}
            onValueChange={(val) => {
              setSelectedTab(val);
            }}
            className="mb-5">
            <TabsList className="w-full">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="w-full data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-2 mx-5 grid-cols-1 ">
        {
          blogs?.map((blog) => (<BlogCard key={blog.id} refresh={fetchBlogs} data={blog} userId={user?.userId} />))
        }
      </div>
      <div className="mt-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button disabled={currentPage === 1} className="text-green-500 bg-white border border-green-500" onClick={() => setCurrentPage(currentPage + 1)}><BiLeftArrow />Previous</Button>
            </PaginationItem>
            <PaginationItem>
              <div className="flex gap-2">
                {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => setCurrentPage(index + 1)} className={`border text-green-500 border-green-500 hover:bg-amber-500 hover:border-amber-500 hover:text-white ${index === (Number(meta?.page) - 1) ? "bg-green-500 text-white" : ""}`} href="#">{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}
              </div>
            </PaginationItem>
            <PaginationItem>
              <Button disabled={currentPage === meta?.totalPage} className="bg-green-500 text-white" onClick={() => setCurrentPage(currentPage + 1)}>Next <BiRightArrow /></Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
    </div>
  );
};

export default BlogPage;
