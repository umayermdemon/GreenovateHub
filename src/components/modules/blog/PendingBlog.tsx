"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TBlog } from "@/types/blog.types";
import { Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { updateBlog } from "@/services/blog";
import Link from "next/link";

interface PBlog {
    data: TBlog[]
}
const PendingBlog = ({ data }: PBlog) => {
    const approveRequest = async (id: string) => {
        const statusData = {
            id,
            data: {
                status: "approved"
            }
        }
        try {
            const res = await updateBlog(statusData);
            if (res.success) {
                toast.success("Blog Approved")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const rejectRequest = async (id: string) => {
        const statusData = {
            id,
            data: {
                status: "rejected"
            }
        }
        try {
            const res = await updateBlog(statusData);
            if (res.success) {
                toast.error("Blog Rejected")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Blogs</CardTitle>
                    <CardDescription>You have {data?.length} pending Blogs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-5">
                        {
                            data?.map((blog: TBlog) => (<div key={blog.id} className="flex items-center justify-between ">
                                <div className="flex items-center gap-3">
                                    <Link href={`/member/dashboard/my-blogs/details/${blog.id}`}>
                                        <Avatar>
                                            <AvatarImage src={blog.images[0]} alt="" />
                                            <AvatarFallback>{blog.title.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div>
                                        <p className="font-medium">{blog.title.split(" ").slice(0, 5).join(" ")}</p>                                        <p className="text-sm text-muted-foreground">by
                                            <span className="italic ml-1 text-green-500">{blog.author.name}</span> | <span className="text-sky-500 italic">
                                                {formatDistanceToNow(new Date(blog.createdAt), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => rejectRequest(blog.id)} size="sm" variant="outline" className="h-8 w-8 p-0  !cursor-pointer hover:bg-red-500 hover:text-white">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Decline</span>
                                    </Button>
                                    <Button onClick={() => approveRequest(blog.id)} size="sm" className="h-8 w-8 p-0 cursor-pointer  bg-green-500">
                                        <Check className="h-4 w-4 " />
                                        <span className="sr-only">Accept</span>
                                    </Button>
                                </div>
                            </div>))
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PendingBlog;