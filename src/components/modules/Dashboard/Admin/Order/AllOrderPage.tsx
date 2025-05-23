"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOrder } from "@/types";
import { Trash } from "lucide-react";
import Link from "next/link";

const AllOrderPage = ({ orders }: { orders: TOrder[] }) => {
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
              <Link
                href={`/admin/dashboard/all-orders/details/${order?.id}`}
                className="hover:underline">
                <TableCell>{order.ideaTitle}</TableCell>
              </Link>
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
                <p>
                  <Trash color="red" />
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllOrderPage;
