"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { Button } from "@/components/ui/button";
import { TIdea } from "@/types/idea.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

const tabOrder = ["all", "energy", "waste", "transportation"];

interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
interface IIdeaPageProps {
  initialIdeas: TIdea[];
  initialMeta: TMeta;
  initialCategory: string;
  initialSearch: string;
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
                  className="min-w-[100px] w-full data-[state=active]:bg-green-600 data-[state=active]:text-white cursor-pointer">
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
            <p className="text-red-500 text-center">No ideas found</p>
          </div>
        )}
      </div>
      {/* pagination section */}
      <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-md border transition-all duration-200 flex items-center gap-2
      ${
        currentPage === 1
          ? "bg-gray-400 text-black cursor-not-allowed"
          : "bg-white text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
      } cursor-pointer`}>
          <ChevronLeft className="text-lg" />
        </Button>

        {/* Page Number Buttons with Icons */}
        <div className="flex gap-1 flex-wrap">
          {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 cursor-pointer rounded-md text-sm border transition-all duration-200 flex items-center gap-1
            ${
              isActive
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600"
            }`}>
                <span className="font-semibold">{page}</span>
              </button>
            );
          })}
        </div>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === meta?.totalPage}
          className={`px-4 py-2 rounded-md border transition-all duration-200 flex items-center gap-2 cursor-pointer
      ${
        currentPage === meta?.totalPage
          ? "bg-gray-400 text-black cursor-not-allowed"
          : "bg-green-600 text-white hover:bg-green-600 border-green-600"
      }`}>
          <ChevronRight className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default IdeaPage;
