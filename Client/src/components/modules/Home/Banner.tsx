"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const banners = [
  {
    id: 1,
    title: "Truly inspired vision",
    subtitle: "of company",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor tues dsuaximus placerat Vitae nisi lorem integer venenatis.",
    video: "/energy1.mp4",
  },
  {
    id: 2,
    title: "Professional Team",
    subtitle: "Delivering Excellence",
    description:
      "We are committed to high performance and sustainable impact in everything we do.",
    video: "/transportation.mp4",
  },
  {
    id: 3,
    title: "Innovation Meets",
    subtitle: "Simplicity",
    description:
      "From strategy to execution, we deliver cutting-edge solutions that fit your needs.",
    video: "/waste1.mp4",
  },
];

const Banner = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full  overflow-hidden" ref={carouselRef}>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}>
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="relative w-full h-[80vh]">
              {/* Background Image */}
              <video
                src={banner.video}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full absolute inset-0"
                style={{ zIndex: 1 }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>

              {/* Text Content */}
              <div className="absolute inset-0 z-20 flex flex-col items-start justify-center text-white px-6  md:px-16 lg:px-0 max-w-7xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {banner.title}
                  <br />
                  {banner.subtitle}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-3 sm:mt-4 text-base sm:text-lg md:max-w-xl">
                  {banner.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 sm:mt-8">
                  <Link href="/about">
                    <Button className="bg-secondary/80 hover:bg-secondary text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-md rounded-full cursor-pointer">
                      View More
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="hidden md:flex absolute left-4 top-[500px] md:top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/70 hover:bg-white text-black rounded-full shadow-md cursor-pointer" />
        <CarouselNext className="hidden md:flex absolute right-4  top-[500px] md:top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/70 hover:bg-white text-black rounded-full shadow-md cursor-pointer" />
      </Carousel>

      {/* Scroll down */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center w-72 h-28 cursor-pointer"
        onClick={() => {
          const stateSection = document.getElementById("stats");
          if (stateSection) {
            stateSection.scrollIntoView({ behavior: "smooth" });
          }
        }}>
        {/* Faded background text */}
        <span
          className="absolute inset-0 flex items-center justify-center
      text-[64px] md:text-[90px] lg:text-[80px]
      font-bold italic text-gray-200 opacity-40 select-none pointer-events-none z-20
      font-[cursive]"
          aria-hidden="true">
          scroll
        </span>
        {/* Foreground content */}
        <div className="relative bg-white rounded-t-2xl shadow-lg w-full h-full flex flex-col items-center justify-center">
          <span className="text-center text-[var(--text-primary,#3d2c41)] text-base font-semibold z-10">
            scroll and <br /> discover more
          </span>
          <span className="mt-2 text-2xl text-secondary animate-bounce z-10">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
