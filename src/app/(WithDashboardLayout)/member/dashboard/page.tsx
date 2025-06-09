import { getMyBlogs } from "@/services/blog";
import ManageMemberDashboard from "@/components/modules/Dashboard/Member";
import { getMe } from "@/services/user";

const MemberDashboard = async () => {
  const blogs = await getMyBlogs();
  const blogData = blogs?.data || [];
  const { data: user } = await getMe();
  const { data: myBlogs } = await getMyBlogs();

  return (
    <div>
      <ManageMemberDashboard blogs={blogData} user={user} myBlogs={myBlogs} />
    </div>
  );
};

export default MemberDashboard;
