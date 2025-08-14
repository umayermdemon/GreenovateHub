import { Leaf, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    icon: (
      <Users
        className="h-12 w-12 text-primary transition-colors duration-300
    group-hover:text-secondary mx-auto mb-4"
      />
    ),
    value: "20,000+",
    label: "Active Members",
  },
  {
    icon: (
      <Leaf
        className="h-12 w-12 text-primary transition-colors duration-300
    group-hover:text-secondary mx-auto mb-4"
      />
    ),
    value: "5,000+",
    label: "Green Ideas Shared",
  },
  {
    icon: (
      <TrendingUp
        className="h-12 w-12 text-primary transition-colors duration-300
    group-hover:text-secondary mx-auto mb-4"
      />
    ),
    value: "1,000+",
    label: "Projects Implemented",
  },
];

const StatsSection = () => (
  <section className="py-16" id="stats">
    <div className="max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
          Our Impact in Numbers
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover how Greenovate Hub is making a difference through our growing
          community, shared ideas, and successful projects.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group text-center p-6 rounded-lg bg-primary/10 transition-all">
            {stat.icon}
            <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
