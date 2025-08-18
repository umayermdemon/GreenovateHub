"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Banner = () => {
  const handleScroll = () => {
    const stateSection = document.getElementById("stats");
    if (stateSection) {
      stateSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[80vh] bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <img
        src="/banner-person.jpg"
        alt="Business Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay (light) */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
          Take your business <br /> to the next level.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-gray-700 text-base sm:text-lg md:max-w-xl">
          Hub IT allows your business and technology computers to store,
          transmit and analyze.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex items-center gap-6">
          <Button
            onClick={handleScroll}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md cursor-pointer">
            Explore Hub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
