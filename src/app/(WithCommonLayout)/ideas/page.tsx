/* eslint-disable @typescript-eslint/no-explicit-any */
import IdeaPage from "@/components/modules/Idea/Open/IdeaPage";
import { getAllIdeas } from "@/services/idea";
import Link from "next/link";

const Ideas = async ({ searchParams }: any) => {
  const { category, page, search } = await searchParams;
  const categoryName = category || "all";
  const searchTerm = search || "";
  const currentPage = page || "1";

  const res = await getAllIdeas({
    category: categoryName === "all" ? "" : categoryName,
    searchTerm: searchTerm,
    page: currentPage,
    status: "approved",
    limit: "8",
  });
  return (
    <div>
      <div className="h-32 max-w-7xl mx-auto w-full flex items-center justify-center">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-6 lg:px-0">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">Ideas</h1>
            <p className="text-muted-foreground text-base">
              Browse our latest ideas below.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center text-sm md:text-base">
          <Link
            href="/"
            className="text-muted-foreground hover:text-secondary transition-colors">
            Home
          </Link>
          <span>/</span>
          <h2 className="text-muted-foreground">Ideas</h2>
        </div>
      </div>
      <div className="bg-background">
        <IdeaPage
          initialIdeas={res?.data}
          initialMeta={res?.meta}
          initialCategory={categoryName}
          initialSearch={searchTerm}
          initialPage={parseInt(currentPage, 10)}
        />
      </div>
    </div>
  );
};

export default Ideas;
