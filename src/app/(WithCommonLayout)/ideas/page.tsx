"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { getAllIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const tabOrder = ["all", "energy", "waste", "transportation"];

const IdeaPage = () => {
  interface TMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  }
  const [ideas, setIdeas] = useState<TIdea[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [meta, setMeta] = useState<TMeta>({} as TMeta);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const fetchIdeas = useCallback(async () => {
    const res = await getAllIdeas({
      category: selectedTab === "all" ? "" : selectedTab,
      searchTerm: searchTerm,
      page: currentPage.toString(),
      status: "approved",
      limit: "8",
    });
    if (res.success) {
      setIdeas(res.data);
      setMeta(res.meta);
    }
  }, [selectedTab, searchTerm, currentPage]);
  useEffect(() => {
    fetchIdeas();
  }, [searchTerm, selectedTab, currentPage, fetchIdeas]);

  const { user } = useUser();
  return (
    <div className="lg:mx-8 my-6">
      <div className="lg:flex lg:flex-row-reverse gap-3 lg:mx-4 mx-1">
        <div className="flex flex-1 lg:mb-0 mb-1 lg:mx-0 mx-0.5">
          <Input
            placeholder="Search Idea..."
            className="lg:w-full border-sky-500 rounded-r-none focus:border-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="rounded-l-none rounded-r-full cursor-pointer bg-sky-500"
            size="icon">
            <Search size={18} />
          </Button>
        </div>
        <div className="flex-1 lg:mt-0 mt-2">
          <Tabs
            value={selectedTab}
            onValueChange={(val) => {
              setSelectedTab(val);
            }}
            className="mb-5">
            <TabsList className="w-full">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="w-full data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid lg:grid-cols-4  mx-5 grid-cols-1">
        {ideas?.map((idea: TIdea) => (
          <IdeaCard
            refresh={fetchIdeas}
            key={idea.id}
            data={idea}
            userId={user?.userId}
          />
        ))}
      </div>
      <div className="mt-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={currentPage === 1}
                className="text-sky-500 bg-white border border-sky-500"
                onClick={() => setCurrentPage(currentPage - 1)}>
                <BiLeftArrow />
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem className="flex gap-2">
              {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    className={`border text-sky-500 border-sky-500 hover:bg-green-500 hover:border-green-500 hover:text-white ${
                      index === Number(meta?.page) - 1
                        ? "bg-sky-500 text-white"
                        : ""
                    }`}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={currentPage === meta?.totalPage}
                className="bg-sky-500 text-white"
                onClick={() => setCurrentPage(currentPage + 1)}>
                Next <BiRightArrow />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default IdeaPage;
