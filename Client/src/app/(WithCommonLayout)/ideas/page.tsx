import IdeaPage from "@/components/modules/Idea/Open/IdeaPage";
import PageTopStyle from "@/components/shared/PageTopStyle";
import { getAllIdeas } from "@/services/idea";
import { IdeasPageProps } from "@/types";

const Ideas = async ({ searchParams }: IdeasPageProps) => {
  const { category, page, search } = await searchParams;
  const categoryName = category || "all";
  const searchTerm = search || "";
  const currentPage = page || "1";

  const res = await getAllIdeas({
    category: categoryName === "all" ? "" : categoryName,
    searchTerm: searchTerm,
    page: currentPage,
    status: "approved",
    limit: "6",
  });
  return (
    <>
      <PageTopStyle
        header="Ideas"
        description="Browse our latest ideas below."
        footer="Ideas"
      />
      <div className="bg-background">
        <IdeaPage
          initialIdeas={res?.data}
          initialMeta={res?.meta}
          initialCategory={categoryName}
          initialPage={parseInt(currentPage, 10)}
        />
      </div>
    </>
  );
};

export default Ideas;
