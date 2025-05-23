"use server";

import { revalidateTag } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBlog = async (blogData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/write-blog`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(blogData),
      }
    );
    revalidateTag("Blogs");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
interface BlogFilterType {
  category?: string,
  searchTerm?: string,
  status?: string,
  page?: string,
  limit?: string
}
export const getAllBlogs = async (options?: BlogFilterType) => {
  try {
    const params = new URLSearchParams();
    if (options?.searchTerm) {
      params.append("searchTerm", options.searchTerm);
    }
    console.log(options?.searchTerm);
    if (options?.category) {
      params.append("category", options.category);
    }
    if (options?.status) {
      params.append("status", options.status);
    }
    if (options?.limit) {
      params.append("limit", options.limit.toString());
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-all-blogs${query}`,
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getMyBlogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-my-blogs`,
      {
        method: "GET",
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
export const getSingleBlog = async (id: ParamValue) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-single-blog/${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};

export const removeBlogImage = async (data: { id: string; image: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/remove-image/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ image: data.image }),
      }
    );
    revalidateTag("Blogs");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const updateBlog = async (blogData: {
  id: string;
  data: FieldValues;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/update-blog/${blogData.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(blogData.data),
      }
    );
    revalidateTag("Blogs");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const deleteMyBlog = async (blogId: string) => {
  console.log(blogId, "blogId");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/delete-blog/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("Blogs");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
