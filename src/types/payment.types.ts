export interface TOrder {
  id: string;
  amount: number;
  ideaTitle: string;
  authorId: string;
  ideaId: string;
  status: "unpaid" | "paid" | "pending";
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}
