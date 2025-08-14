import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

const CtaSection = () => {
  return (
    <section className="py-20 text-primary-foreground relative overflow-hidden group">
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-foreground/60 pointer-events-none z-10" />
      <div className="relative max-w-7xl mx-auto px-4 text-center z-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join our community of eco-innovators and start sharing your
          sustainable ideas today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-primary  hover:bg-foreground/90 cursor-pointer transition-all duration-300 ease-in-out">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
