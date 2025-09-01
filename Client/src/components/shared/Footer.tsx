"use client";

import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth";
import { IUser } from "@/types";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Ideas", path: "/ideas" },
  { label: "Submit Idea", path: "" },
  { label: "Categories", path: "" },
  { label: "About Us", path: "/about" },
];
const socialIcons = [
  {
    icon: <Facebook />,
    link: "https://facebook.com",
  },
  {
    icon: <Twitter />,
    link: "https://twitter.com",
  },
  {
    icon: <Instagram />,
    link: "https://instagram.com",
  },
  {
    icon: <Linkedin />,
    link: "https://linkedin.com",
  },
];

const resources = [
  { label: "Blog", path: "/blogs" },
  { label: "FAQ", path: "/faq" },
  { label: "Community Guidelines", path: "/guidelines" },
  { label: "Success Stories", path: "" },
  { label: "Partner With Us", path: "/partner" },
];

const Footer = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const pathname = usePathname();
  const router = useRouter();
  const handleScroll = () => {
    if (pathname === "/") {
      const scroll = document.getElementById("categories");
      if (scroll) {
        scroll.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#categories";
    }
  };

  const handleStatScroll = () => {
    if (pathname === "/") {
      const scroll = document.getElementById("stats");
      if (scroll) {
        scroll.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#stats";
    }
  };

  useEffect(() => {
    const user = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    user();
  }, []);

  const handleIdeaCreate = () => {
    if (user) {
      router.push(`/${user?.role}/dashboard/create-idea`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-secondary text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo and About */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            A community-driven platform for sharing and implementing sustainable
            ideas for a better planet.
          </p>
          <div className="flex gap-4 mt-4">
            {socialIcons.map((social) => (
              <Link
                key={social.link}
                href={social.link}
                target="_blank"
                className="w-5 h-5 hover:text-white hover:scale-110 transition">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {link.label === "Categories" ? (
                  <h1
                    onClick={handleScroll}
                    className="hover:text-primary cursor-pointer">
                    {link.label}
                  </h1>
                ) : link.label === "Submit Idea" ? (
                  <h1
                    onClick={handleIdeaCreate}
                    className="hover:text-primary cursor-pointer">
                    {link.label}
                  </h1>
                ) : (
                  <Link href={link.path} className="hover:text-primary">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            {resources.map((link) => (
              <li key={link.label}>
                {link.label === "Success Stories" ? (
                  <h1
                    onClick={handleStatScroll}
                    className="hover:text-primary cursor-pointer">
                    {link.label}
                  </h1>
                ) : (
                  <Link href={link.path} className="hover:text-primary">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@ecolideas.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> 123 Green Street, Eco City
            </li>
          </ul>
          <Link href="/contact">
            <button className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition cursor-pointer">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} GreenovateHub. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
