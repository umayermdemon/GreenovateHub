"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { TIdea } from "@/types/idea.types";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationComponent from "@/components/shared/Pagination/PaginationComponent";
import { TMeta } from "@/types";

const tabOrder = ["all", "energy", "waste", "transportation"];

interface IIdeaPageProps {
  initialIdeas: TIdea[];
  initialMeta: TMeta;
  initialCategory: string;
  initialSearch?: string;
  initialPage: number;
}
const IdeaPage = ({
  initialIdeas,
  initialMeta,
  initialCategory,
  initialPage,
}: IIdeaPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [ideas, setIdeas] = useState<TIdea[]>(initialIdeas);
  const [meta, setMeta] = useState<TMeta>(initialMeta);
  const [selectedTab, setSelectedTab] = useState<string>(
    initialCategory || "all"
  );
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    setSelectedTab(urlCategory);
    setCurrentPage(urlPage);
    setIdeas(initialIdeas);
    setMeta(initialMeta);
  }, [searchParams, initialIdeas, initialMeta]);

  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    params.set("page", "1");
    router.push(`/ideas?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <div className="py-2 md:py-6 max-w-7xl mx-auto px-2 sm:px-4">
      <div className="lg:flex lg:flex-row-reverse gap-3">
        <div className="flex-1 lg:mt-0 mt-2">
          <Tabs
            value={selectedTab}
            onValueChange={handleTabChange}
            className="mb-5">
            <TabsList className="w-full overflow-x-auto flex-nowrap">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="min-w-[100px] w-full data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas?.length ? (
          ideas?.map((idea: TIdea) => <IdeaCard key={idea.id} data={idea} />)
        ) : (
          <div className="col-span-full">
            <p className="text-destructive text-center">No ideas found</p>
          </div>
        )}
      </div>
      {/* pagination section */}
      <PaginationComponent
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        meta={meta}
      />
    </div>
  );
};

export default IdeaPage;
