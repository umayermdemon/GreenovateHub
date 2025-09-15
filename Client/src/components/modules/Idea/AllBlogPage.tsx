"use client";

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
import { TBlog, TMeta } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllBlogPage = () => {
  const [limit, setLimit] = useState(7);
  const [data, setData] = useState<TBlog[]>([]);
  const [meta, setMeta] = useState<TMeta>({} as TMeta);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const fetchBlogs = useCallback(async () => {
    const { data, meta } = await getAllBlogs({
      page: currentPage.toString(),
      limit: limit.toString(),
      searchTerm,
      status,
      category,
    });
    setData(data);
    setMeta(meta);
  }, [currentPage, limit, searchTerm, status, category]);
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  console.log(category);
  const deleteBlog = async (id: string) => {
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
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/dashboard/all-blogs?${params.toString()}`);
    setCurrentPage(page);
  };
  return (
    <div className="lg:mb-10">
      <div className="lg:flex gap-5 mb-5 space-y-2 lg:space-y-0">
        <div className="flex gap-3 flex-1">
          <Select onValueChange={(val) => setLimit(Number(val))}>
            <SelectTrigger className="border-primary text-primary flex-1">
              <SelectValue placeholder="Set limit" />
            </SelectTrigger>
            <SelectContent>
              {[2, 5, 10, 15].map((val) => (
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
              {["all", "underReview", "approved", "rejected"]?.map((val) => (
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
              {["all", "transportation", "energy", "waste"]?.map((val) => (
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

      <Card>
        <CardContent className="space-y-5 divide-y divide-primary/30">
          {data?.map((blog) => (
            <div key={blog.id} className="lg:flex justify-between pb-5">
              <div className="flex items-center gap-3 lg:w-[40%]">
                <Avatar className="border border-primary">
                  <AvatarImage src={blog.images[0]} />
                  <AvatarFallback />
                </Avatar>
                <div>
                  <p className="font-medium text-card-foreground">
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

              <div className="flex flex-col lg:gap-8 lg:flex-row lg:items-center lg:justify-end lg:w-[60%]">
                <div className="flex gap-5 justify-between lg:mt-0 mt-2.5">
                  <p
                    className={`
                     px-2 py-1 w-[130px] text-center truncate 
                     flex items-center justify-center gap-2
                     ${
                       blog.status === "approved"
                         ? "bg-primary/10 text-primary"
                         : ""
                     }
                     ${
                       blog.status === "rejected"
                         ? "bg-destructive/10 text-destructive"
                         : ""
                     }
                     ${
                       blog.status === "underReview"
                         ? "bg-warning/10 text-warning"
                         : ""
                     }`}>
                    <span
                      className={`w-[7px] h-[7px] rounded-full relative left-1 truncate
                        ${blog.status === "approved" ? "bg-primary" : ""}
                        ${blog.status === "rejected" ? "bg-destructive" : ""}
                        ${blog.status === "underReview" ? "bg-warning" : ""}`}
                    />
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </p>
                  <p className="bg-secondary/10 text-secondary px-2 py-1 w-[120px] text-center text-sm truncate font-semibold">
                    {blog.category.charAt(0).toUpperCase() +
                      blog.category.slice(1)}
                  </p>
                </div>
                <div className="flex lg:gap-8 justify-evenly lg:mt-0 mt-2">
                  <Link href={`/admin/dashboard/all-blogs/details/${blog.id}`}>
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
                    onClick={() => deleteBlog(blog.id)}
                    size="sm"
                    className="bg-destructive text-primary-foreground hover:bg-red-500 cursor-pointer h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* pagination section */}
      <PaginationComponent
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        meta={meta}
      />
    </div>
  );
};

export default AllBlogPage;
