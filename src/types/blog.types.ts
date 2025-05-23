export type TAuthor = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
  password: string;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  image: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export type TVote = {
  id: string;
  voterId: string;
  value: "up" | "down";
  ideaId: string | null;
  blogId: string | null;
  isDeleted: boolean;
};

export type TBlog = {
  id: string;
  title: string;
  images: string[];
  author: TAuthor;
  description: string;
  authorId: string;
  category: string;
  status: "underReview" | "approved" | "rejected" | "draft";
  createdAt: string;
  updatedAt: string;
  categoryId: null;
  Vote: TVote[];
  up_votes: number;
  down_votes: number;
};
