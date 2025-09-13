import { Globe, Leaf, RefreshCw } from "lucide-react";

const iconStyle =
  "bg-gray-200 hover:bg-primary rounded-full p-3 transition text-gray-500 hover:text-white";

const iconList = [
  { icon: <Leaf size={20} />, key: "leaf" },
  { icon: <RefreshCw size={20} />, key: "refresh" },
  { icon: <Globe size={20} />, key: "globe" },
];

const RegisterInfoCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm md:max-w-xs lg:max-w-sm mx-auto px-2 py-4">
      {/* Gray box with centered text */}
      <div className="w-full aspect-video bg-gray-500 rounded-lg flex items-center justify-center mb-6">
        <span className="text-white text-base sm:text-lg font-medium text-center">
          Sustainable Community
        </span>
      </div>
      {/* Heading */}
      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 w-full text-left">
        Join Our Green Community
      </h2>
      {/* Description */}
      <p className="text-muted-foreground mb-4 w-full text-left text-sm sm:text-base">
        Share your sustainability ideas and help build a better future for our
        planet. Connect with like-minded individuals and make a real impact.
      </p>
      {/* Icon buttons */}
      <div className="flex gap-3 mt-2">
        {iconList.map(({ icon, key }) => (
          <button key={key} type="button" className={iconStyle}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegisterInfoCard;
