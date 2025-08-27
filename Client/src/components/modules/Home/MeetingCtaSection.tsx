"use client";

import { Button } from "@/components/ui/button";
import GetInTouchModal from "@/components/utils/GenInTouchModal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const backgroundImageUrl =
  "https://res.cloudinary.com/duagqnvpw/image/upload/v1756261802/cta_qhshh6.jpg";

const MeetingCtaSection = () => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <section className="py-20 text-primary-foreground relative overflow-hidden group">
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-8 md:mb-0 md:max-w-2xl">
          Connect with our experts to discuss your goals.
        </h2>
        <Button
          size="lg"
          className="bg-primary hover:bg-secondary text-primary-foreground cursor-pointer"
          onClick={() => {
            setShowDialog(true);
          }}>
          Get In Touch
          <ArrowRight className="ml-2" />
        </Button>

        <GetInTouchModal open={showDialog} onOpenChange={setShowDialog} />
      </div>
    </section>
  );
};

export default MeetingCtaSection;
