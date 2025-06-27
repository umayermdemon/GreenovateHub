import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="container mx-auto px-4 text-center">
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
              className="bg-white text-green-700 hover:bg-green-50">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-green-700">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
