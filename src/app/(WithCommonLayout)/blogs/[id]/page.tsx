import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";
import { getSingleBlog } from "@/services/blog";
import { getSingleUser } from "@/services/user";
import BlogDetailsSkeleton from "@/skeletons/BlogDetailsSkeleton";

const BlogDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: blog } = await getSingleBlog(id);
  const { data: author } = await getSingleUser(blog.authorId);
  if (!blog) {
    return <BlogDetailsSkeleton />;
  }

  return <BlogDetailsCard blog={blog} user={author} />;
};

export default BlogDetails;
