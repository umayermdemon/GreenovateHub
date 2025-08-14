"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { verifyPayment } from "@/services/order";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface TOrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function OrderVerification() {
  const [data, setData] = useState<TOrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");

  useEffect(() => {
    const verifyData = async () => {
      const res = await verifyPayment(order_id!);
      if (res?.success) {
        setData(res?.data[0]);
        setLoading(false);
      }
    };

    verifyData();
  }, [order_id]);

  return loading ? (
    <Skeleton />
  ) : (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Payment Verification
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8">
        {/* Payment Details */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <dt className="font-semibold">Order ID:</dt>
              <dd className="break-words">{data?.order_id || "N/A"}</dd>
              <dt className="font-semibold">Amount:</dt>
              <dd>
                {data?.currency || "N/A"} {data?.amount?.toFixed(2) || "0.00"}
              </dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <Badge
                  variant={
                    data?.bank_status === "Success" ? "default" : "destructive"
                  }>
                  {data?.bank_status}
                </Badge>
              </dd>
              <dt className="font-semibold">Date:</dt>
              <dd>
                {data?.date_time
                  ? new Date(data.date_time).toLocaleString()
                  : "N/A"}
              </dd>
            </dl>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <dt className="font-semibold">Method:</dt>
              <dd>{data?.method}</dd>
              <dt className="font-semibold">Transaction ID:</dt>
              <dd className="break-words">{data?.bank_trx_id}</dd>
              <dt className="font-semibold">Invoice No:</dt>
              <dd>{data?.invoice_no}</dd>
              <dt className="font-semibold">SP Code:</dt>
              <dd>{data?.sp_code}</dd>
              <dt className="font-semibold">SP Message:</dt>
              <dd>{data?.sp_message}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{data?.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd className="break-words">{data?.email}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{data?.phone_no}</dd>
              <dt className="font-semibold">Address:</dt>
              <dd className="break-words">{data?.address}</dd>
              <dt className="font-semibold">City:</dt>
              <dd>{data?.city}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href="/member/dashboard/my-orders" className="w-full">
              <Button className="w-full cursor-pointer">View Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
