"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ArrowUpScroll = () => {
  const [show, setShow] = useState(false);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      setShow(currentScrollY > 100 && !atBottom);
      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!show || !direction) return null;
  return (
    <div>
      {direction === "up" ? (
        <div
          className="fixed bottom-4 right-4 bg-secondary-foreground rounded-full p-3 shadow-2xl hover:shadow-xl transition-shadow cursor-pointer z-50"
          onClick={scrollToTop}>
          <ChevronUp className="text-2xl " />
        </div>
      ) : (
        <div
          className="fixed bottom-4 right-4 bg-secondary-foreground rounded-full p-3 shadow-2xl hover:shadow-xl transition-shadow cursor-pointer z-50"
          onClick={scrollToBottom}>
          <ChevronDown className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default ArrowUpScroll;
