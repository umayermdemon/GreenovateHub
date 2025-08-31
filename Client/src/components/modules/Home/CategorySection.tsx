import { Leaf, Recycle, Bus, Grid } from "lucide-react";

const categories = [
  {
    icon: <Grid className="h-8 w-8 text-primary mx-auto mb-3" />,
    title: "All",
    description:
      "Energy, Waste, Transportation, Sustainable farming, Organic practices",
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary mx-auto mb-3" />,
    title: "Energy",
    description: "Renewable energy solutions",
  },
  {
    icon: <Recycle className="h-8 w-8 text-primary mx-auto mb-3" />,
    title: "Waste",
    description: "Reduce, reuse, recycle",
  },
  {
    icon: <Bus className="h-8 w-8 text-primary mx-auto mb-3" />,
    title: "Transportation",
    description: "Eco-friendly mobility",
  },
];

const CategorySection = () => (
  <section className="py-16 bg-white" id="categories">
    <div className="max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Browse Ideas by Category
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore different areas where you can contribute your sustainable
          ideas.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-gray-50 cursor-pointer text-center p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            {cat.icon}
            <h3 className="text-lg font-semibold text-gray-800">{cat.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
