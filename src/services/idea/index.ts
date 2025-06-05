"use server";

import { revalidateTag } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createIdea = async (ideaData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/create-idea`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(ideaData),
      }
    );
    revalidateTag("Ideas");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getMyIdeas = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/get-my-ideas`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Ideas"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
interface IdeaFilterType {
  category?: string;
  searchTerm?: string;
  status?: string;
  page?: string;
  limit?: string;
}
export const getAllIdeas = async (options?: IdeaFilterType) => {
  try {
    const params = new URLSearchParams();
    if (options?.searchTerm) {
      params.append("searchTerm", options.searchTerm);
    }
    if (options?.category) {
      params.append("category", options.category);
    }
    if (options?.status) {
      params.append("status", options.status);
    }
    if (options?.page) {
      params.append("page", options.page);
    }
    if (options?.limit) {
      params.append("limit", options.limit);
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/get-all-ideas${query}`,
      {
        method: "GET",
        next: {
          tags: ["ideas"],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getSingleIdea = async (id: ParamValue) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/get-idea/${id}`,
      {
        method: "GET",
        next: { tags: ["ideas"] },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const removeIdeaImage = async (data: { id: string; image: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/remove-image/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ image: data.image }),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const updateIdea = async (ideaData: {
  id: string;
  data: FieldValues;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/update-idea/${ideaData.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(ideaData.data),
      }
    );
    revalidateTag("ideas");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const deleteMyIdea = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/delete-idea/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("ideas");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
