"use client";

import { FaBlog, FaComment, FaEye, FaLightbulb } from "react-icons/fa";
import StatCard from "@/components/modules/Dashboard/Member/StatCard";
import { GTable } from "@/components/shared/Form/GTable";
import { TBlog } from "@/types/blog.types";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { TIdea, TUserProfile } from "@/types";

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

const ManageMemberDashboard = ({
  blogs,
  user,
  ideas,
}: {
  blogs: TBlog[];
  user: TUserProfile;
  ideas: TIdea[];
}) => {
  const blogsPerMonth = getBlogsPerMonth(blogs);
  const ideasPerMonth = getIdeasPerMonth(ideas);
  const filteredBlogs = blogs
    ?.filter((blog) => {
      const createdAtDate = new Date(blog?.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return createdAtDate >= sevenDaysAgo;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const hasDraft = filteredBlogs.some((blog) => blog.status === "draft");
  const statusColorMap: Record<string, string> = {
    underReview: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    draft: "bg-blue-100 text-blue-700 border border-blue-400",
    approved: "bg-green-100 text-green-700 border border-green-400",
    rejected: "bg-red-100 text-red-700 border border-red-400",
  };

  const columns: ColumnDef<TBlog>[] = [
    {
      accessorKey: "name",
      header: () => <div>Blog Title</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.images[0]}
            alt={row?.original?.title}
            width={50}
            height={50}
            className="rounded-full w-24 h-24 object-cover"
          />
          <span className="truncate">{row?.original?.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div>Blog Created Time</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">
            {new Date(row?.original?.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: () => <div>Blog Updated Time</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">
            {new Date(row?.original?.updatedAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const status = row?.original?.status;
        const badgeColor =
          statusColorMap[status as keyof typeof statusColorMap] ||
          "bg-gray-300 text-gray-800";
        return (
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${badgeColor}`}>
              {status}
            </span>
          </div>
        );
      },
    },
    ...(hasDraft
      ? [
          {
            accessorKey: "postAction",
            header: () => <div>Post</div>,
            cell: ({ row }: { row: Row<TBlog> }) => {
              const status = row?.original?.status;
              if (status !== "draft") return null;
              return (
                <div className="flex items-center space-x-3">
                  <button
                    className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => {
                      // TODO: handle post action here
                      alert(`Posting blog: ${row?.original?.title}`);
                    }}>
                    Post
                  </button>
                </div>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Welcome, <span className="text-amber-500">{user?.name} </span>👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Blogs"
          value={blogs?.length || 0}
          icon={<FaBlog />}
        />
        <StatCard
          title="Total Ideas"
          value={ideas?.length || 0}
          icon={<FaLightbulb />}
        />
        <StatCard title="Comments" value={34} icon={<FaComment />} />
        <StatCard title="Views" value={560} icon={<FaEye />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Blogs per Month Bar Chart */}
        <div className="w-full min-h-[250px] rounded-xl bg-gray-100 flex flex-col items-center justify-center p-2 overflow-x-auto">
          <div className="min-w-[360px] md:min-w-[400px] lg:min-w-[460px]">
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
          <h1 className="font-semibold text-green-500 text-center mt-2 text-base">
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
          <h1 className="font-semibold text-green-500 text-center mt-2 text-base">
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
          <h1 className="font-semibold text-green-500 text-center mt-2 text-base">
            View State
          </h1>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="mt-6 rounded-xl bg-white p-2 sm:p-4 shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
        <GTable data={filteredBlogs} columns={columns} />
      </div>
    </div>
  );
};

export default ManageMemberDashboard;
