import IdeaDetailsCard from "@/components/modules/Idea/IdeaDetailsCard";
import { getSingleIdea } from "@/services/idea";
import { getSingleUser } from "@/services/user";

const IdeaDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: idea } = await getSingleIdea(id);
  const { data: author } = await getSingleUser(idea.authorId);

  return (
    <div className="mt-12 md:mt-0">
      <IdeaDetailsCard idea={idea} user={author} />
    </div>
  );
};

export default IdeaDetails;
