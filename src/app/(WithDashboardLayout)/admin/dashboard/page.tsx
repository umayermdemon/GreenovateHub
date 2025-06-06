import PendingBlog from "@/components/modules/blog/PendingBlog";
import StatCard from "@/components/modules/Dashboard/Member/StatCard";
import PendingIdea from "@/components/modules/Idea/PendingIdea";
import { getAllBlogs } from "@/services/blog";
import { getAllIdeas } from "@/services/idea";
import { getMe } from "@/services/user";
import { FaBlog, FaComment, FaEye } from "react-icons/fa";

const AdminHomePage = async () => {
  const { data: blogData } = await getAllBlogs({ status: "underReview" });
  const { data: ideaData } = await getAllIdeas({ status: "underReview" });
  const { data: allBlogs } = await getAllBlogs({ status: "approved" });
  const { data: allIdeas } = await getAllIdeas({ status: "approved" });
  const { data: userData } = await getMe();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 my-5">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Welcome, <span className="text-amber-500">{userData?.name}</span>
      </h1>
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard
          title="Total Approved Blogs"
          value={allBlogs?.length || 0}
          icon={<FaBlog />}
        />
        <StatCard
          title="Total Approved Ideas"
          value={allIdeas?.length || 0}
          icon={<FaBlog />}
        />
        <StatCard title="Comments" value={34} icon={<FaComment />} />
        <StatCard title="Views" value={560} icon={<FaEye />} />
      </div>
      <div>
        <h1 className="text-center text-2xl font-bold text-green-500">
          Pending Requests
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <PendingIdea data={ideaData} />
        <PendingBlog data={blogData} />
      </div>
    </div>
  );
};

export default AdminHomePage;
