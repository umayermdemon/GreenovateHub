"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getMyProfile, logoutUser } from "@/services/auth";
import UpdateProfile from "../UpdateProfile";
import Logo from "./Logo";
import { TUserProfile } from "@/types/user.type";

import {
  Info,
  LayoutDashboard,
  LogOut,
  Palette,
  PencilLine,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myProfile, setMyProfile] = useState<TUserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await getMyProfile();
      setMyProfile(data);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Ideas", path: "/ideas" },
    { label: "Blogs", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    ...(user ? [{ label: "Dashboard", path: `/${user?.role}/dashboard` }] : []),
  ];

  const AvatarComponent = (
    <Avatar className="w-[50px] h-[50px] cursor-pointer">
      <AvatarImage
        src={myProfile?.image || "https://github.com/shadcn.png"}
        className="rounded-full border border-green-500"
      />
      <AvatarFallback>Profile Image</AvatarFallback>
    </Avatar>
  );

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 fixed w-full z-50 transition-transform duration-300">
      <nav className="p-4 flex items-center justify-between container mx-auto">
        <Logo />

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-green-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-[#1b2a5e] text-lg">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path ? "text-green-500 font-semibold" : ""
                } ${
                  pathname === "ideas" && item.path === "/ideas"
                    ? "text-sky-500"
                    : ""
                }`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop user section */}
        <div className="hidden md:block">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>{AvatarComponent}</PopoverTrigger>
              <PopoverContent className="w-80 border mt-2">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    {AvatarComponent}
                  </div>

                  <h1 className="text-xl font-semibold py-2">
                    {myProfile?.name}
                  </h1>
                  <p className="text-sm text-green-500 relative bottom-3">
                    {myProfile?.role}
                  </p>
                  {myProfile && <UpdateProfile {...myProfile} />}
                </div>
                <ul className="mt-4 divide-y divide-gray-200">
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link href="/ideas" className="flex gap-2 items-center">
                      <Palette size={18} /> All Ideas
                    </Link>
                  </li>
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link
                      href={`/${user?.role}/dashboard`}
                      className="flex gap-2 items-center">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </li>
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link href="/about" className="flex gap-2 items-center">
                      <Info size={18} /> About
                    </Link>
                  </li>
                  <li className="hover:bg-green-500 hover:text-white py-1 px-2">
                    <Link href="/blogs" className="flex gap-2 items-center">
                      <PencilLine size={18} /> Blogs
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="hover:bg-green-500 hover:text-white py-1 px-2 flex gap-2 cursor-pointer items-center">
                    <LogOut size={18} /> Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold">
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-[#1b2a5e] font-medium">
          <ul className="space-y-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.path}
                  className={
                    pathname === item.path
                      ? "text-green-500 font-semibold block"
                      : "block"
                  }>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold w-full text-left mt-2">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-md font-semibold mt-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
