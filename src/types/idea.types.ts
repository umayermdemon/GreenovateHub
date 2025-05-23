import { TAuthor, TVote } from "./blog.types";


export type TIdea = {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
    authorId: string;
    problem_statement: string;
    proposed_solution: string;
    isPremium: boolean;
    price: string;
    status: "underReview" | "approved" | "rejected" | "draft";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    Vote: TVote;
    author: TAuthor;
    up_votes: number;
    down_votes: number;
    total_votes: number;
};
