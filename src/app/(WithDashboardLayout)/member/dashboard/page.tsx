import { getMyBlogs } from "@/services/blog";
import ManageMemberDashboard from "@/components/modules/Dashboard/Member";
import { getMe } from "@/services/user";

const MemberDashboard = async () => {
  const blogs = await getMyBlogs();
  const blogData = blogs?.data || [];

  const { data: user } = await getMe();

  return (
    <div>
      <ManageMemberDashboard blogs={blogData} user={user} />
    </div>
  );
};

export default MemberDashboard;
