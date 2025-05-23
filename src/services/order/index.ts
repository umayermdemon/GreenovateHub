"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const makePayment = async (paymentData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payments/make-payment`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(paymentData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const verifyPayment = async (order_id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payments/verify-payment/${order_id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getMyOrder = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payments/my-order`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getSingleOrder = async (ideaId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payments/${ideaId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getAllOrder = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
