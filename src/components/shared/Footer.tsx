"use client";

import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Ideas", path: "/ideas" },
  { label: "Blogs", path: "/blogs" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

export default function Footer() {
  return (
    <div className="bg-[#eafcfb] text-gray-800 ">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Logo and About */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-gray-600">
            A community for sharing sustainable ideas to protect and preserve
            our planet.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3 underline underline-offset-8 decoration-green-600">
            Quick Links
          </h4>
          <ul className="space-y-2 text-md font-semibold text-gray-500">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.path}
                  className="hover:text-green-600 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Community</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Discussion Forum</Link>
            </li>
            <li>
              <Link href="#">Submission Guidelines</Link>
            </li>
            <li>
              <Link href="#">Contact Admin</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="text-blue-600 hover:scale-110 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="text-blue-400 hover:scale-110 transition" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="text-pink-500 hover:scale-110 transition" />
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Green Circle. All rights reserved.
      </div>
    </div>
  );
}
