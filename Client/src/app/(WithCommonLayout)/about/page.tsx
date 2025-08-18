import AboutPage from "@/components/modules/About/AboutPage";
import { Suspense } from "react";

const About = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPage />
    </Suspense>
  );
};

export default About;
