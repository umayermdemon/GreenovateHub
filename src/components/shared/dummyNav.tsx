"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaList,
  FaSearch,
  FaPhoneAlt,
  FaTags,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "./Logo";

const DummyNavbar = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 fixed w-full z-50 transition-transform duration-300 pt-4">
      <div>
        {/* Top nav */}
        <div className="flex items-center justify-between px-4 py-2 container mx-auto">
          {/* Logo */}
          <div className="flex items-center text-2xl font-bold text-orange-500">
            <Logo />
          </div>

          {/* Search bar */}
          <div className="flex border border-orange-400 rounded-md overflow-hidden w-[40%]">
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 bg-white text-gray-600">
                Bedroom
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Living Room</DropdownMenuItem>
                <DropdownMenuItem>Bathroom</DropdownMenuItem>
                <DropdownMenuItem>Dining Room</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              placeholder="Search in..."
              className="border-0 focus-visible:ring-0"
            />
            <Button variant="ghost" className="text-orange-500">
              <FaSearch />
            </Button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <FaUser />
              <span className="text-sm">Account</span>
            </div>
            <FaHeart className="text-xl text-gray-600" />
            <div className="relative">
              <FaShoppingBag className="text-xl text-gray-600" />
              <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="px-4 py-1 text-sm text-gray-500">
          <span className="font-semibold mr-2">Popular Searches:</span>
          <span className="space-x-3">
            <span>Cushion</span>
            <span>Freedom</span>
            <span>Armchair</span>
            <span>Bedroom</span>
            <span>Bathroom</span>
            <span>Lights</span>
            <span>Dining Room</span>
          </span>
        </div>

        <Separator />

        {/* Bottom nav */}
        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaList />
              <span>Browse Categories</span>
            </div>
            <span>Shop</span>
            <span>Vendor</span>
            <span>Blog</span>
            <span>Pages</span>
            <span>Elements</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>Track Order</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTags />
              <span>Daily Deals</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <span>0(800)123-456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyNavbar;
