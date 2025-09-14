"use client";

import { FaBlog, FaComment, FaLightbulb } from "react-icons/fa";
import StatCard from "../Member/StatCard";
import PendingIdea from "../../Idea/PendingIdea";
import PendingBlog from "../../blog/PendingBlog";
import { TBlog, TIdea, TUserProfile } from "@/types";

import { Users } from "lucide-react";

const getBlogsPerMonth = (blogs: TBlog[]) => {
  const months: { month: string; date: Date }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: `${d.toLocaleString("default", { month: "short" })}-${String(
        d.getFullYear()
      ).slice(-2)}`,
      date: d,
    });
  }
  const counts: Record<string, number> = {};
  blogs.forEach((blog) => {
    const dateObj = new Date(blog.createdAt);
    const month = `${dateObj.toLocaleString("default", {
      month: "short",
    })}-${String(dateObj.getFullYear()).slice(-2)}`;
    counts[month] = (counts[month] || 0) + 1;
  });
  return months.map(({ month }) => ({
    month,
    blogs: counts[month] || 0,
  }));
};

const getIdeasPerMonth = (ideas: TIdea[]) => {
  const months: { month: string; date: Date }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: `${d.toLocaleString("default", { month: "short" })}-${String(
        d.getFullYear()
      ).slice(-2)}`,
      date: d,
    });
  }
  const counts: Record<string, number> = {};
  ideas.forEach((idea) => {
    const dateObj = new Date(idea.createdAt);
    const month = `${dateObj.toLocaleString("default", {
      month: "short",
    })}-${String(dateObj.getFullYear()).slice(-2)}`;
    counts[month] = (counts[month] || 0) + 1;
  });
  return months.map(({ month }) => ({
    name: month,
    value: counts[month] || 0,
  }));
};



const ManageAdminDashboard = ({
  user,
  blogsUnderReview,
  ideasUnderReview,
  blogsApproved,
  ideasApproved,
}: {
  user: TUserProfile;
  blogsUnderReview: TBlog[];
  ideasUnderReview: TIdea[];
  blogsApproved: TBlog[];
  ideasApproved: TIdea[];
}) => {
  const blogsPerMonth = getBlogsPerMonth(blogsApproved);
  const ideasPerMonth = getIdeasPerMonth(ideasApproved);

  console.log(blogsPerMonth, ideasPerMonth);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Welcome, <span className="text-amber-500">{user?.name}</span>
      </h1>
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Approved Blogs"
          value={blogsApproved?.length || 0}
          icon={<FaBlog />}
        />
        <StatCard
          title="Total Approved Ideas"
          value={ideasApproved?.length || 0}
          icon={<FaLightbulb />}
        />
        <StatCard title="Active Members" value={560} icon={<Users />} />
        <StatCard title="Total Comments" value={34} icon={<FaComment />} />
      </div>
     
      {/* Pending Requests */}
      <div>
        <h1 className="text-center text-2xl font-bold text-primary mb-4">
          Pending Requests
        </h1>
      </div>
      <div className="flex flex-col md:flex-row  gap-4">
        <div className="flex-1">
          <PendingIdea data={ideasUnderReview} />
        </div>
        <div className="flex-1">
        <PendingBlog data={blogsUnderReview} />
        </div>
      </div>
    </div>
  );
};

export default ManageAdminDashboard;
