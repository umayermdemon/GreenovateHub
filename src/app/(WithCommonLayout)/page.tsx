import Banner from "@/components/modules/Home/Banner";
import CommunitySection from "@/components/modules/Home/CommunitySection";
import FeaturedBlog from "@/components/modules/Home/FeaturedBlog";
import FeaturedIdea from "@/components/modules/Home/FeaturedIdea";
import TestimonialSection from "@/components/modules/Home/Testimonial";
import { getAllIdeas } from "@/services/idea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  const ideas = await getAllIdeas({ status: "approved" });
  return (
    <div className="min-h-screen">
      <Banner />
      {/* Stats Section */}
      <section className="py-16 bg-white">
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

      <FeaturedIdea ideas={ideas?.data} />
      <div className="bg-white">
        <FeaturedBlog />
      </div>
      <CommunitySection />
      <TestimonialSection />

      {/* CTA Section */}
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
    </div>
  );
};

export default HomePage;
