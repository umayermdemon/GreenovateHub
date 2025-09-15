import React from "react";

interface ContributionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ContributionCard = ({ title, children, className = "" }: ContributionCardProps) => (
  <div className={`bg-white border border-gray-200 rounded-xl p-4 flex flex-col h-full min-w-[220px] ${className}`}>
    <h4 className="text-lg font-semibold text-gray-700 mb-3">{title}</h4>
    <div className="flex-1 flex flex-col gap-2">{children}</div>
  </div>
);

export default ContributionCard;