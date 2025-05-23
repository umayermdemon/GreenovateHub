import Banner from "@/components/modules/Home/Banner";
import CommunitySection from "@/components/modules/Home/CommunitySection";
import FeaturedBlog from "@/components/modules/Home/FeaturedBlog";
import FeaturedIdea from "@/components/modules/Home/FeaturedIdea";
import TestimonialSection from "@/components/modules/Home/Testimonial";

const HomePage = async () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 pt-4">
      <Banner />
      <FeaturedIdea />
      <FeaturedBlog />
      <CommunitySection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
