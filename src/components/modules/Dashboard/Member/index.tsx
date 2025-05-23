"use client";

import { FaBlog, FaComment, FaEye, FaUserCircle } from "react-icons/fa";
import StatCard from "@/components/modules/Dashboard/Member/StatCard";
import { GTable } from "@/components/shared/Form/GTable";
import { TBlog } from "@/types/blog.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const ManageMemberDashboard = ({ blogs }: { blogs: TBlog[] }) => {
  const filteredBlogs = blogs?.filter((blog) => {
    const createdAtDate = new Date(blog?.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdAtDate >= sevenDaysAgo;
  })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const columns: ColumnDef<TBlog>[] = [
    {
      accessorKey: "name",
      header: () => <div>Blog Title</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.images[0]}
            alt={row?.original?.title}
            width={150}
            height={150}
            className=" rounded-full object-contain"
          />
          <span className="truncate">{row?.original?.title}</span>
        </div>
      ),
    },
  ];
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Welcome, Emon 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard title="Total Blogs" value={12} icon={<FaBlog />} />
        <StatCard title="Comments" value={34} icon={<FaComment />} />
        <StatCard title="Views" value={560} icon={<FaEye />} />
        <StatCard title="Profile" value="80%" icon={<FaUserCircle />} />
      </div>

      {/* Blog Preview Boxes */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-gray-100" />
        <div className="aspect-video rounded-xl bg-gray-100" />
        <div className="aspect-video rounded-xl bg-gray-100" />
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
