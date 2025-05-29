import Banner from "@/components/modules/Home/Banner";
import CommunitySection from "@/components/modules/Home/CommunitySection";
import FeaturedBlog from "@/components/modules/Home/FeaturedBlog";
import FeaturedIdea from "@/components/modules/Home/FeaturedIdea";
import TestimonialSection from "@/components/modules/Home/Testimonial";
import { getAllIdeas } from "@/services/idea";

const HomePage = async () => {
  const ideas = await getAllIdeas({ status: "approved" });
  return (
    <div className="">
      <div className="bg-gray-100">
        <Banner />
      </div>
      <FeaturedIdea ideas={ideas?.data} />
      <FeaturedBlog />
      <CommunitySection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
