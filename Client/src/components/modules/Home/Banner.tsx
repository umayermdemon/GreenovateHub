"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import bannerImage from "../../../app/assets/banner/banner.jpg";
import { Lightbulb, Search } from "lucide-react";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";

const Banner = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const handleScroll = () => {
    const stateSection = document.getElementById("stats");
    if (stateSection) {
      stateSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleIdeaCreate = () => {
    if (user) {
      router.push(`/${user?.role}/dashboard/create-idea`);
    }
  };

  return (
    <section className="relative w-full h-[60vh] bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <Image
        src={bannerImage}
        alt="Business Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="bg-black/5 backdrop-blur-xs p-8 rounded-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
            Make Our Planet <br /> Greener Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white text-base sm:text-lg md:max-w-xl">
            Share your sustainable ideas and collaborate with others to create a
            better future for our environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex items-center gap-4">
            {user && (
              <Button
                onClick={handleIdeaCreate}
                className="bg-primary hover:bg-accent-foreground text-white px-6 py-3 rounded-md cursor-pointer flex items-center gap-2">
                <Lightbulb size={18} />
                Share Your Idea
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleScroll}
              className="px-6 py-3 rounded-md cursor-pointer flex items-center gap-2 hover:bg-primary hover:text-white hover:border-primary">
              <Search size={18} />
              Explore Ideas
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
