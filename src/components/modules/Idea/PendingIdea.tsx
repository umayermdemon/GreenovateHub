"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TIdea } from "@/types/idea.types";
import { updateIdea } from "@/services/idea";
import { toast } from "sonner";

interface PIdea {
    data: TIdea[]
}
const PendingIdea = ({ data }: PIdea) => {
    const approveRequest = async (id: string) => {
        const statusData = {
            id,
            data: {
                status: "approved"
            }
        }
        try {
            const res = await updateIdea(statusData);
            if (res.success) {
                toast.success("Idea Approved")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const rejectRequest = async (id: string) => {
        const statusData = {
            id,
            data: {
                status: "reject"
            }
        }
        try {
            const res = await updateIdea(statusData);
            if (res.success) {
                toast.error("Idea Rejected")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div >
            <Card>
                <CardHeader>
                    <CardTitle>Pending Ideas</CardTitle>
                    <CardDescription>You have  pending Blogs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-5 ">
                        {
                            data?.map((idea: TIdea) => (<div key={idea.id} className="flex items-center justify-between ">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={idea.images[0]} alt="" />
                                        <AvatarFallback>{idea.title.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{idea.title.split(" ").slice(0, 5).join(" ")}</p>
                                        <p className="text-sm text-muted-foreground">by
                                            <span className="italic ml-1 text-amber-800">{idea.author.name}</span> | <span className="text-sky-800 italic">
                                                {formatDistanceToNow(new Date(idea.createdAt), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => rejectRequest(idea.id)} size="sm" variant="outline" className="h-8 w-8 p-0 cursor-pointer hover:bg-red-500 hover:text-white">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Decline</span>
                                    </Button>
                                    <Button onClick={() => approveRequest(idea.id)} size="sm" className="h-8 w-8 p-0 cursor-pointer bg-amber-500">
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

export default PendingIdea;