import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";
import { getSingleBlog } from "@/services/blog";
import { getSingleUser } from "@/services/user";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: blog } = await getSingleBlog(id);
  const { data: author } = await getSingleUser(blog.authorId);

  return <BlogDetailsCard blog={blog} user={author} />;
};

export default BlogDetails;
