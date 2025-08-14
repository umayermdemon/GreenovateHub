export interface IVote {
    voterId: string;
    value: "up" | "down",
    ideaId: string | undefined,
    blogId: string | undefined,
    isDeleted?: boolean
}