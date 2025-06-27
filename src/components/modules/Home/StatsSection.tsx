import { Leaf, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-16 bg-white" id="stats">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-green-50 hover:shadow-lg transition-all">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-700">20,000+</h3>
            <p className="text-gray-600">Active Members</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-green-50 hover:shadow-lg transition-all">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-700">5,000+</h3>
            <p className="text-gray-600">Green Ideas Shared</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-green-50 hover:shadow-lg transition-all">
            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-700">1,000+</h3>
            <p className="text-gray-600">Projects Implemented</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
