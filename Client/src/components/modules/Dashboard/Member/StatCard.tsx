const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
    <div className="text-2xl text-green-600">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default StatCard;
