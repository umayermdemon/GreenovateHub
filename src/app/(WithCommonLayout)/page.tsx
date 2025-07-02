import Banner from "@/components/modules/Home/Banner";
import CommunitySection from "@/components/modules/Home/CommunitySection";
import FeaturedBlog from "@/components/modules/Home/FeaturedBlog";
import FeaturedIdea from "@/components/modules/Home/FeaturedIdea";
import TestimonialSection from "@/components/modules/Home/Testimonial";
import { getAllIdeas } from "@/services/idea";
import StatsSection from "@/components/modules/Home/StatsSection";
import CtaSection from "@/components/modules/Home/CtaSection";
import MeetingCtaSection from "@/components/modules/Home/MeetingCtaSection";

const HomePage = async () => {
  const ideas = await getAllIdeas({ status: "approved" });
  return (
    <div className="min-h-screen bg-primary-foreground">
      <Banner />
      {/* Stats Section */}
      <StatsSection />
      <FeaturedIdea ideas={ideas?.data} />
      <FeaturedBlog />
      <CommunitySection />
      <CtaSection />
      <TestimonialSection />
      <MeetingCtaSection />
    </div>
  );
};

export default HomePage;
