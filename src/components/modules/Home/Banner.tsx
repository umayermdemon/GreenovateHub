"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import banner1 from "@/app/assets/banner/banner1.png";
import banner2 from "@/app/assets/banner/banner2.png";
import banner3 from "@/app/assets/about.png";

const banners = [
  {
    id: 1,
    title: "We Have More Than",
    highlight: "20,000",
    subtitle: "Join Members",
    description:
      "Share eco-friendly ideas and help build a sustainable future with GreenovateHub.",
    image: banner1,
  },
  {
    id: 2,
    title: "Find Real Connections With",
    highlight: "Verified Members",
    subtitle: "Across the Globe",
    description:
      "Join a community of genuine people looking for meaningful relationships. Your journey starts here at GreenovateHub.",
    image: banner2,
  },
  {
    id: 3,
    title: "Meet Singles in Your",
    highlight: "Local Area",
    subtitle: "Or Worldwide",
    description:
      "Discover singles nearby or expand your horizons globally. GreenovateHub helps you connect with people who matter.",
    image: banner3,
  },
];

const Banner = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 relative container mx-auto" ref={carouselRef}>
      <Carousel>
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 md:px-16">
                <div className="text-center md:text-left mt-6 md:mt-0">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-green-800">
                    {banner.title}{" "}
                    <span className="text-green-600 bg-green-50 px-2 rounded-lg">{banner.highlight}</span>{" "}
                    {banner.subtitle}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 text-gray-700 text-lg max-w-lg">
                    {banner.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8">
                    <Link href="/register">
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                        Join Our Community <ArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="relative">
                    <div className="absolute inset-0 bg-green-600/10 rounded-xl blur-xl"></div>
                    <Image
                      src={banner.image}
                      alt="Banner Image"
                      width={500}
                      height={500}
                      className="rounded-xl shadow-lg transition-transform duration-300 cursor-pointer relative z-10"
                    />
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-10 md:w-16 md:h-16 cursor-pointer hover:text-green-500 bg-white/80 hover:bg-white shadow-lg rounded-full"
          data-carousel-prev
        />
        <CarouselNext
          className="absolute right-5 lg:-right-5 top-1/2 -translate-y-1/2 z-10 md:w-16 md:h-16 cursor-pointer hover:text-green-500 bg-white/80 hover:bg-white shadow-lg rounded-full"
          data-carousel-next
        />
      </Carousel>
    </section>
  );
};

export default Banner;
