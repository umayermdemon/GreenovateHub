import ManageAdminDashboard from "@/components/modules/Dashboard/Admin/ManageAdminDashboard";
import { getAllBlogs } from "@/services/blog";
import { getAllIdeas } from "@/services/idea";
import { getMe } from "@/services/user";

const AdminHomePage = async () => {
  const { data: blogsUnderReview } = await getAllBlogs({
    status: "underReview",
  });
  const { data: ideasUnderReview } = await getAllIdeas({
    status: "underReview",
  });
  const { data: blogsApproved } = await getAllBlogs({
    status: "approved",
  });
  const { data: ideasApproved } = await getAllIdeas({
    status: "approved",
  });
  const { data: userData } = await getMe();
  return (
    <ManageAdminDashboard
      user={userData || {}}
      blogsUnderReview={blogsUnderReview || []}
      ideasUnderReview={ideasUnderReview || []}
      blogsApproved={blogsApproved || []}
      ideasApproved={ideasApproved || []}
    />
  );
};

export default AdminHomePage;
