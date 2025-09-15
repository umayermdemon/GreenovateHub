/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Search, Trash2 } from "lucide-react";

import PaginationComponent from "@/components/shared/Pagination/PaginationComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteMyBlog, getAllBlogs } from "@/services/blog";
import BlogListSkeleton from "@/skeletons/BlogListSkeleton";
import { TBlog, TMeta } from "@/types";

const LIMIT_OPTIONS = [2, 5, 10, 15];
const STATUS_OPTIONS = ["all", "underReview", "approved", "rejected"];
const CATEGORY_OPTIONS = ["all", "transportation", "energy", "waste"];

const AllBlogPage = () => {
  const [limit, setLimit] = useState(7);
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [meta, setMeta] = useState<TMeta>({} as TMeta);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const res = await getAllBlogs({
      page: currentPage.toString(),
      limit: limit.toString(),
      searchTerm,
      status,
      category,
    });
    setBlogs(res?.data || []);
    setMeta(res?.meta || {});
    setLoading(false);
  }, [currentPage, limit, searchTerm, status, category]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Delete blog handler
  const handleDeleteBlog = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMyBlog(id);
          if (res.success) {
            fetchBlogs();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Pagination handler
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/dashboard/all-blogs?${params.toString()}`);
    setCurrentPage(page);
  };

  // Blog status badge
  const renderStatusBadge = (status: string) => {
    let badgeClass = "";
    let dotClass = "";
    if (status === "approved") {
      badgeClass = "bg-primary/10 text-primary";
      dotClass = "bg-primary";
    } else if (status === "rejected") {
      badgeClass = "bg-destructive/10 text-destructive";
      dotClass = "bg-destructive";
    } else if (status === "underReview") {
      badgeClass = "bg-warning/10 text-warning";
      dotClass = "bg-warning";
    }
    return (
      <span
        className={`px-2 py-1 w-[100px] md:w-[130px] text-center truncate flex items-center justify-center gap-2 rounded-lg text-sm font-medium ${badgeClass}`}>
        <span className={`w-[7px] h-[7px] rounded-full ${dotClass}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Blog category badge
  const renderCategoryBadge = (category: string) => (
    <span className="bg-secondary/10 text-secondary px-2 py-1 w-[110px] md:w-[120px] text-center text-sm truncate font-semibold rounded-lg">
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );

  return (
    <div className="lg:mb-10">
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        <div className="flex gap-3 flex-1">
          <Select onValueChange={(val) => setLimit(Number(val))}>
            <SelectTrigger className="border-primary text-primary flex-1">
              <SelectValue placeholder="Set limit" />
            </SelectTrigger>
            <SelectContent>
              {LIMIT_OPTIONS.map((val) => (
                <SelectItem
                  key={val}
                  value={val.toString()}
                  className="hover:cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => setStatus(val === "all" ? "" : val)}>
            <SelectTrigger className="border-primary text-primary flex-1">
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((val) => (
                <SelectItem
                  key={val}
                  value={val}
                  className="hover:cursor-pointer">
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => setCategory(val === "all" ? "" : val)}>
            <SelectTrigger className="border-primary text-primary flex-1">
              <SelectValue placeholder="Set Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((val) => (
                <SelectItem
                  key={val}
                  value={val}
                  className="hover:cursor-pointer">
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-1">
          <Input
            placeholder="Search blog..."
            className="border-primary rounded-r-none rounded-l-full w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="rounded-r-full bg-primary text-primary-foreground"
            size="icon">
            <Search size={18} />
          </Button>
        </div>
      </div>

      {/* Blog List */}
      <Card>
        <CardContent className="space-y-5 divide-y divide-primary/30">
          {loading ? (
            <BlogListSkeleton />
          ) : blogs.length ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col lg:flex-row justify-between pb-5 gap-4">
                {/* Blog Info */}
                <div className="flex items-center gap-3 lg:w-[40%]">
                  <Avatar className="border border-primary">
                    <AvatarImage src={blog.images[0]} />
                    <AvatarFallback />
                  </Avatar>
                  <div>
                    <p className="font-medium text-card-foreground truncate">
                      {blog.title.split(" ").slice(0, 6).join(" ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      by{" "}
                      <span className="italic text-primary">
                        {blog.author.name}
                      </span>{" "}
                      |{" "}
                      <span className="italic text-secondary">
                        {formatDistanceToNow(new Date(blog.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Blog Actions */}
                <div className="flex flex-row md:flex-col lg:flex-row lg:items-center justify-between lg:justify-end lg:w-[60%] gap-2 lg:gap-8">
                  <div className="flex gap-1 md:gap-3 justify-between">
                    {renderStatusBadge(blog.status)}
                    {renderCategoryBadge(blog.category)}
                  </div>
                  <div className="flex gap-2 lg:gap-4 justify-evenly">
                    <Link
                      href={`/admin/dashboard/all-blogs/details/${blog.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-primary text-primary-foreground h-8 w-8 p-0 cursor-pointer hover:bg-foreground hover:text-primary-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:text-warning-foreground h-8 w-8 p-0 cursor-pointer">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteBlog(blog.id)}
                      size="sm"
                      className="bg-destructive text-primary-foreground hover:bg-red-500 cursor-pointer h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="font-semibold text-destructive">No data Found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        meta={meta}
      />
    </div>
  );
};

export default AllBlogPage;
