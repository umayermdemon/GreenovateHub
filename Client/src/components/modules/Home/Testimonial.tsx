"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import user1 from "../../../app/assets/user/user1.jpg";
import user2 from "../../../app/assets/user/user2.jpg";
import user3 from "../../../app/assets/user/user3.jpg";
import user4 from "../../../app/assets/user/user4.jpg";
import user5 from "../../../app/assets/user/user5.jpg";

const testimonials = [
  {
    name: "Doug Ramsey",
    title: "Director",
    company: "GreenAction Org",
    rating: 4,
    image: user1,
    quote:
      "GreenovateHub helped us engage more volunteers for our eco projects. It's a game-changer for environmental collaboration.",
  },
  {
    name: "Sara Garcia",
    title: "Founder",
    company: "Solar Steps",
    rating: 5,
    image: user2,
    quote:
      "The portal gave my solar startup exposure and helped us find early adopters in the community. I'm grateful for this platform.",
  },
  {
    name: "Francisco Walsh",
    title: "CEO",
    company: "EcoShift",
    rating: 5,
    image: user3,
    quote:
      "A fantastic space to share and grow sustainable ideas. GreenovateHub is exactly what the world needs right now.",
  },
  {
    name: "Leila Ahmed",
    title: "Sustainability Lead",
    company: "Green Future",
    rating: 5,
    image: user4,
    quote:
      "We launched a zero-waste campaign through GreenovateHub. The support and feedback from the community was invaluable.",
  },
  {
    name: "Ravi Patel",
    title: "Climate Analyst",
    company: "EcoWatch",
    rating: 4,
    image: user5,
    quote:
      "I use GreenovateHub to stay updated on grassroots innovations. It's a hub of fresh, practical climate solutions.",
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials?.length);
  };

  const handlePrev = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials?.length) % testimonials?.length
    );
  };

  const visibleTestimonials = [
    testimonials[index],
    testimonials[(index + 1) % testimonials?.length],
    testimonials[(index + 2) % testimonials?.length],
  ];

  return (
    <section className="py-16 text-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-secondary">
          TESTIMONIALS
        </h2>
        <div className="flex justify-center mb-24">
          <div className="w-10 h-1 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-card border border-primary/10 p-6 rounded-lg text-center relative">
              <div className="w-20 h-20 mx-auto -mt-16 mb-4 rounded-full overflow-hidden border-4 border-muted">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <p className="italic text-sm text-muted-foreground mb-4">
                {t.quote}
              </p>
              <div className="flex justify-center mb-3 text-yellow-400">
                {Array.from({ length: t.rating })?.map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
                {Array.from({ length: 5 - t.rating })?.map((_, i) => (
                  <Star key={i} size={16} className="text-muted" />
                ))}
              </div>
              <h3 className="font-bold text-primary text-lg">{t.name}</h3>
              <p className="text-sm text-secondary-foreground">
                {t.title}, <em>{t.company}</em>
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-2 mt-8 pr-4">
          <button
            onClick={handlePrev}
            className="bg-primary hover:bg-primary/90 p-2 rounded-full text-primary-foreground cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 p-2 rounded-full text-primary-foreground cursor-pointer">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
