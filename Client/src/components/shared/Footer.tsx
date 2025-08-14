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
    <div className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Logo and About */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            A community for sharing sustainable ideas to protect and preserve
            our planet.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3 underline underline-offset-8 decoration-[var(--primary)]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-md font-semibold text-[var(--text-secondary)]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.path}
                  className="hover:text-[var(--primary)] hover:underline">
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
              <Link href="#" className="hover:text-[var(--primary)]">
                Discussion Forum
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[var(--primary)]">
                Submission Guidelines
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[var(--primary)]">
                Contact Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="text-[var(--primary)] hover:scale-110 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="text-[var(--primary)] hover:scale-110 transition" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="text-[var(--primary)] hover:scale-110 transition" />
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-center text-sm text-[var(--text-secondary)] py-4">
        © {new Date().getFullYear()} GreenovateHub. All rights reserved.
      </div>
    </div>
  );
}
