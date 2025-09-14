import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
}

const ContributionCard = ({ title, value, icon, subtitle }: StatCardProps) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between  h-full hover:shadow-sm hover:border-primary transition-shadow group">
    <div className="flex flex-col justify-center">
      <h4 className="text-sm text-gray-500 mb-1">{title}</h4>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {subtitle && (
        <span className="text-xs text-gray-400 mt-1">{subtitle}</span>
      )}
    </div>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-primary  transition-colors">
      <span className="text-gray-500 text-xl group-hover:text-white">{icon}</span>
    </div>
  </div>
);

export default ContributionCard;
