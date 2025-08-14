import { getMyBlogs } from "@/services/blog";
import ManageMemberDashboard from "@/components/modules/Dashboard/Member/ManageMemberDashboard";
import { getMe } from "@/services/user";
import { getMyIdeas } from "@/services/idea";

const MemberDashboard = async () => {
  const { data: blogs } = await getMyBlogs();
  const { data: user } = await getMe();
  const { data: ideas } = await getMyIdeas();

  return (
    <div>
      <ManageMemberDashboard
        blogs={blogs || []}
        user={user}
        ideas={ideas || []}
      />
    </div>
  );
};

export default MemberDashboard;
