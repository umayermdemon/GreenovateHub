"use server"
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";

export const createVote = async (data: FieldValues) => {
    console.log(data);
    try {
        const token = (await cookies()).get("accessToken");
        if (!token) {
            throw new Error("Token is missing")
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/create-vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
            body: JSON.stringify(data),
        });
        // Check if response is OK
        if (!res.ok) {
            console.error("Response not OK:", res.status, res.statusText);
            return { success: false, status: res.status, message: res.statusText };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Vote submission failed:", error);
        return { success: false, message: "Network or server error." };
    }
};
export const undoVote = async (data: FieldValues) => {
    try {
        const token = (await cookies()).get("accessToken");
        if (!token) {
            throw new Error("Token is missing")
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/remove-vote`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
            body: JSON.stringify(data),
        });
        // Check if response is OK
        if (!res.ok) {
            console.error("Response not OK:", res.status, res.statusText);
            return { success: false, status: res.status, message: res.statusText };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Vote submission failed:", error);
        return { success: false, message: "Network or server error." };
    }
};
export const isUserVoted = async (data: FieldValues) => {
    try {
        const token = (await cookies()).get("accessToken");
        if (!token) {
            return { success: false, message: "Token is missing" };
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/isvoted`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
            body: JSON.stringify(data),
        });
        // Check if response is OK
        if (!res.ok) {
            console.error("Response not OK:", res.status, res.statusText);
            return { success: false, status: res.status, message: res.statusText };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Vote submission failed:", error);
        return { success: false, message: "Network or server error." };
    }
};
