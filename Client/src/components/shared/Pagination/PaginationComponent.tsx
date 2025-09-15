import { Button } from "@/components/ui/button";
import { TMeta } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TPaginationProps = {
  currentPage: number;
  handlePageChange: (page: number) => void;
  meta: TMeta;
};

const PaginationComponent = ({
  currentPage,
  handlePageChange,
  meta,
}: TPaginationProps) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-md border transition-all duration-200 flex items-center gap-2
      ${
        currentPage === 1
          ? "bg-gray-400 text-black cursor-not-allowed"
          : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
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
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-primary hover:text-white hover:border-primary"
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
          : "bg-primary text-white hover:bg-primary border-primary"
      }`}>
        <ChevronRight className="text-lg" />
      </Button>
    </div>
  );
};

export default PaginationComponent;
