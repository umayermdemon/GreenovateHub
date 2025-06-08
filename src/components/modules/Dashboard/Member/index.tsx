"use client";

import { FaBlog, FaComment, FaEye, FaUserCircle } from "react-icons/fa";
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
import { TUserProfile } from "@/types";

const blogsPerDay = [
  { day: "Mon", blogs: 2 },
  { day: "Tue", blogs: 1 },
  { day: "Wed", blogs: 3 },
  { day: "Thu", blogs: 2 },
  { day: "Fri", blogs: 1 },
  { day: "Sat", blogs: 2 },
  { day: "Sun", blogs: 1 },
];

const commentsPerBlog = [
  { name: "Blog A", value: 10 },
  { name: "Blog B", value: 14 },
  { name: "Blog C", value: 10 },
  { name: "Blog D", value: 10 },
];

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
}: {
  blogs: TBlog[];
  user: TUserProfile;
}) => {
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
            className=" rounded-full w-24 h-24 object-cover"
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Welcome, <span className="text-amber-500">{user?.name} </span>👋
      </h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard title="Total Blogs" value={12} icon={<FaBlog />} />
        <StatCard title="Comments" value={34} icon={<FaComment />} />
        <StatCard title="Views" value={560} icon={<FaEye />} />
        <StatCard title="Profile" value="80%" icon={<FaUserCircle />} />
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Blogs per Day Bar Chart */}
        <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={blogsPerDay}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="blogs" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Comments per Blog Pie Chart */}
        <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center p-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={commentsPerBlog}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#10b981"
                label>
                {commentsPerBlog.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#10b981", "#34d399", "#6ee7b7"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Views Trend Line Chart */}
        <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={viewsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#059669" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="mt-6 rounded-xl bg-white p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
        <GTable data={filteredBlogs} columns={columns} />
      </div>
    </div>
  );
};

export default ManageMemberDashboard;
