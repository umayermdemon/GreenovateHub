"use client";

import { PaymentModal } from "@/components/modules/Idea/PaymentModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSingleUser } from "@/services/user";
import { IUser, TOrder } from "@/types";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

const OrderPageDetails = ({
  orders,
  user,
}: {
  orders: TOrder[];
  user: IUser;
}) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await getSingleUser(user?.userId);

      setCurrentUser(res?.data);
    };
    getUser();
  }, [user?.userId]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Order List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Idea Name</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>TransactionId</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.ideaTitle}</TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {order.status === "paid" ? order.transactionId : "N/A"}
              </TableCell>
              <TableCell>৳{order.amount}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 cursor-pointer"
                      : "bg-red-100 text-red-700 cursor-pointer"
                  }`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(order.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {order.status === "pending" ? (
                  <PaymentModal
                    idea={{
                      id: order?.ideaId,
                      price: order?.amount.toLocaleString(),
                    }}
                    user={currentUser!}
                  />
                ) : (
                  <p>
                    <Trash color="red" />
                  </p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderPageDetails;
