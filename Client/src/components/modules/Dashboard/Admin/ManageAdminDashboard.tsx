"use client";

import { FaBlog, FaComment, FaEye, FaLightbulb } from "react-icons/fa";
import StatCard from "../Member/StatCard";
import PendingIdea from "../../Idea/PendingIdea";
import PendingBlog from "../../blog/PendingBlog";
import { TBlog, TIdea, TUserProfile } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const viewsTrend = [
  { day: "Mon", views: 80 },
  { day: "Tue", views: 120 },
  { day: "Wed", views: 90 },
  { day: "Thu", views: 150 },
  { day: "Fri", views: 110 },
  { day: "Sat", views: 130 },
  { day: "Sun", views: 100 },
];

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

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Welcome, <span className="text-amber-500">{user?.name}</span>
      </h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
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
        <StatCard title="Total Comments" value={34} icon={<FaComment />} />
        <StatCard title="Views" value={560} icon={<FaEye />} />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Blogs per Month Bar Chart */}
        <div className="w-full min-h-[250px] rounded-xl bg-gray-100 flex flex-col items-center justify-center p-2 overflow-x-auto">
          <div className="min-w-[360px] sm:min-w-[450px]">
            <ResponsiveContainer width="100%" height={220}>
              {blogsPerMonth.every((item) => item.blogs === 0) ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <FaBlog className="text-4xl mb-2" />
                  <span>No blogs found for the last 6 months</span>
                </div>
              ) : (
                <BarChart data={blogsPerMonth}>
                  <XAxis
                    dataKey="month"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="blogs" fill="#34d399" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          <h1 className="font-semibold text-green-500 text-center mt-2">
            Total Approved Blogs By Month
          </h1>
        </div>
        {/* Ideas per Month Pie Chart */}
        <div className="w-full min-h-[250px] rounded-xl bg-gray-100 flex flex-col items-center justify-center p-2 overflow-x-auto">
          <ResponsiveContainer width="100%" height={220}>
            {ideasPerMonth.every((item) => item.value === 0) ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <FaLightbulb className="text-4xl mb-2" />
                <span>No ideas found for the last 6 months</span>
              </div>
            ) : (
              <PieChart>
                <Pie
                  data={ideasPerMonth}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#10b981"
                  label>
                  {ideasPerMonth.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#10b981", "#34d399", "#6ee7b7"][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
          <h1 className="font-semibold text-green-500 text-center mt-2">
            Total Approved Ideas By Month
          </h1>
        </div>
        {/* Views Trend Line Chart */}
        <div className="w-full min-h-[250px] rounded-xl bg-gray-100 flex flex-col items-center justify-center p-2 overflow-x-auto">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={viewsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#059669" />
            </LineChart>
          </ResponsiveContainer>
          <h1 className="font-semibold text-green-500 text-center mt-2">
            View State
          </h1>
        </div>
      </div>
      {/* Pending Requests */}
      <div>
        <h1 className="text-center text-2xl font-bold text-green-500">
          Pending Requests
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <PendingIdea data={ideasUnderReview} />
        <PendingBlog data={blogsUnderReview} />
      </div>
    </div>
  );
};

export default ManageAdminDashboard;
