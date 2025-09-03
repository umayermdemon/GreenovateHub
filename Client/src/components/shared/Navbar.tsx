"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import {
  Facebook,
  Info,
  Instagram,
  LayoutDashboard,
  Linkedin,
  LogOut,
  Menu,
  Palette,
  PencilLine,
  Search,
  Twitter,
  X,
} from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth";
import { TUserProfile } from "@/types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import UpdateProfile from "../UpdateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Drafts = () => {
  return (
    <div className="relative cursor-pointer">
      <RiDraftLine className="text-lg md:text-xl" />
      <span className="absolute -top-2 -right-2 text-xs bg-secondary text-secondary-foreground rounded-full px-1">
        0
      </span>
    </div>
  );
};
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

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Ideas", path: "/ideas" },
  { label: "Blogs", path: "/blogs" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = ({ myProfile }: { myProfile: TUserProfile | null }) => {
  console.log(myProfile);
  const { user } = useUser();
  const pathname = usePathname();
  const [mobileSearchBar, setMobileSearchBar] = useState(false);
  const [tabletSearchBar, setTabletSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  // console.log({ tabletSearchBar });
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) setSearchHistory(JSON.parse(stored));
  }, []);

  const handleIdeaSearch = () => {
    if (!searchTerm.trim()) return;
    let updatedHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ];
    if (updatedHistory.length > 5) updatedHistory = updatedHistory.slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    router.push(`/ideas?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleBlogSearch = () => {
    if (!searchTerm.trim()) return;
    let updatedHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ];
    if (updatedHistory.length > 5) updatedHistory = updatedHistory.slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    router.push(`/blogs?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleMobileSearch = () => {
    setMobileSearchBar(!mobileSearchBar);
    if (mobileSearchBar) {
      setSearchTerm("");
      setMobileMenuOpen(false);
    }
  };

  const handleTabletSearch = () => {
    setTabletSearchBar(!tabletSearchBar);
    if (tabletSearchBar) {
      setSearchTerm("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const AvatarComponent = (
    <Avatar className="w-[30px] h-[30px]  cursor-pointer">
      <AvatarImage
        src={
          myProfile?.image ||
          "https://res.cloudinary.com/duagqnvpw/image/upload/v1752406954/young-bearded-man-with-striped-shirt_1_b9fdtl.jpg"
        }
        className="rounded-full border border-secondary"
      />
      <AvatarFallback>Profile Image</AvatarFallback>
    </Avatar>
  );
  return (
    <div
      className={`${`w-full z-50 transition-all duration-300 fixed bg-background  ${
        isScrolled ? "md:py-0" : "py-0"
      }`}`}>
      {/* Top nav */}
      <div
        className={`flex flex-col md:bg-primary gap-2 py-5 md:flex-row md:items-center md:justify-between px-0 md:px-4 lg:px-0 transition-all duration-300 ${
          isScrolled
            ? "h-16 py-2 md:py-0 md:h-0 md:overflow-hidden md:opacity-0 mt-2 md:mt-0"
            : "h-16 md:h-8 py-2 opacity-100"
        }`}>
        {/* Logo */}
        <div
          className={`flex md:hidden items-center justify-between pt-2 ${
            isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          } font-bold`}>
          <div className="flex items-center gap-4 md:hidden pl-2">
            <Drafts />
            <Search onClick={handleMobileSearch} className="cursor-pointer" />
          </div>
          <div>
            <Logo style={"text-secondary"} />
          </div>
          <div className="flex items-center gap-6 md:hidden">
            <button
              className="mr-4"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search bar */}
        {mobileSearchBar && (
          <div
            className="fixed top-0 left-0 w-full h-16 bg-background z-[100] flex items-center px-4 transition-transform duration-300 ease-in"
            style={{
              transform: mobileSearchBar
                ? "translateY(0)"
                : "translateY(-100%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}>
            {(() => {
              const isBlogPath =
                pathname === "/blogs" || pathname.startsWith("/blogs/");
              const handleSearch = isBlogPath
                ? handleBlogSearch
                : handleIdeaSearch;

              return (
                <>
                  {/* Input + Search Button */}
                  <div className="flex flex-1 items-center mr-10">
                    <Input
                      placeholder={
                        isBlogPath ? "Search Blogs..." : "Search Ideas..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      className="flex-1 rounded-l-full"
                      autoFocus
                    />
                    <Button
                      className="rounded-r-full"
                      size="icon"
                      onClick={handleSearch}>
                      <Search size={18} />
                    </Button>
                  </div>

                  {/* Close Button */}
                  <X
                    className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
                    size={28}
                    onClick={() => {
                      setMobileSearchBar(false);
                      setSearchTerm("");
                    }}
                  />
                </>
              );
            })()}
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-2 bg-background mt-2 rounded-lg shadow-lg">
            <ul className="flex flex-col gap-2 font-medium text-base">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className={`block py-1 ${
                      pathname === item.path
                        ? "text-secondary font-semibold"
                        : "text-secondary/70 "
                    } `}
                    onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {user && (
                <li className="block md:hidden">
                  <Link
                    href={`/${user.role}/dashboard`}
                    className={`block py-1 ${
                      pathname === `/${user.role}/dashboard`
                        ? "text-secondary font-semibold"
                        : "text-secondary/70"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
            <div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-semibold w-full text-left mt-2">
                  Logout
                </button>
              ) : (
                <div>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-primary mt-2">
                    <FaUser className="flex md:hidden" /> Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/*  */}
        <div className="flex flex-row items-center justify-between max-w-7xl mx-auto w-full">
          <div className="hidden md:flex">
            <h1 className="text-white">Innovative Ideas For Healthy Living</h1>
          </div>
          <div className="hidden md:flex gap-12">
            <div className="flex gap-8">
              {socialIcons.map((social) => (
                <Link
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  className="text-white hover:text-white hover:scale-110 transition">
                  {social.icon}
                </Link>
              ))}
            </div>
            {user ? (
              <div className="flex items-center justify-center">
                <Popover>
                  <PopoverTrigger asChild>{AvatarComponent}</PopoverTrigger>
                  <PopoverContent className="w-64 md:w-80 border mt-2">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        {AvatarComponent}
                      </div>
                      <h1 className="text-lg md:text-xl font-semibold py-2">
                        {myProfile?.name}
                      </h1>
                      <p className="text-xs md:text-sm text-secondary relative bottom-3">
                        {myProfile?.role}
                      </p>
                      {myProfile && <UpdateProfile {...myProfile} />}
                    </div>
                    <ul className="mt-4 divide-y divide-gray-200">
                      <li className="hover:text-secondary text-secondary/60 py-1 px-2">
                        <Link href="/ideas" className="flex gap-2 items-center">
                          <Palette size={18} /> All Ideas
                        </Link>
                      </li>
                      <li className="hover:text-secondary text-secondary/60 py-1 px-2">
                        <Link
                          href={`/${user?.role}/dashboard`}
                          className="flex gap-2 items-center">
                          <LayoutDashboard size={18} /> Dashboard
                        </Link>
                      </li>
                      <li className="hover:text-secondary text-secondary/60 py-1 px-2">
                        <Link href="/about" className="flex gap-2 items-center">
                          <Info size={18} /> About
                        </Link>
                      </li>
                      <li className="hover:text-secondary text-secondary/60 py-1 px-2">
                        <Link href="/blogs" className="flex gap-2 items-center">
                          <PencilLine size={18} /> Blogs
                        </Link>
                      </li>
                      <li
                        onClick={handleLogout}
                        className="hover:text-secondary text-secondary/60 py-1 px-2 flex gap-2 cursor-pointer items-center">
                        <LogOut size={18} /> Logout
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div>
                <Link
                  href="/login"
                  className="font-medium text-white hover:text-white hover:scale-95 transition flex">
                  Register / Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      {/* <div
        className={`px-2 md:px-0 py-1 hidden lg:flex items-center justify-center text-xs md:text-sm max-w-7xl mx-auto text-center transition-all duration-300 ${
          isScrolled ? "md:h-0 md:overflow-hidden md:opacity-0" : "opacity-100"
        }`}>
        <span className="font-semibold ml-2 md:ml-6 mr-2">
          Popular Searches:
        </span>
        <span className="space-x-2 md:space-x-3">
          {searchHistory.length === 0 && (
            <span className="italic">No recent searches</span>
          )}
          {searchHistory.slice(0, 3).map((item) => (
            <span
              key={item}
              className="hover:underline cursor-pointer"
              onClick={() => setSearchTerm(item)}>
              {item} ,
            </span>
          ))}
        </span>
      </div> */}

      {/* Bottom Nav */}
      <div
        className={`hidden md:flex flex-row items-center justify-between md:gap-2 md:h-16 md:px-4 lg:px-0 md:text-sm max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled ? "py-0 md:py-2" : ""
        }`}>
        <div className="hidden md:flex">
          <Logo style="flex md:hidden lg:flex" />
        </div>
        {/* Menu Items */}
        <div className="w-full hidden md:flex items-center justify-center">
          <ul className="flex flex-wrap items-center space-x-2 md:space-x-6 font-medium text-lg">
            {menuItems.map((item, i) => (
              <li key={i} className="relative group">
                <Link
                  href={item.path}
                  className={`
                    px-2 pb-3 transition-colors duration-200
                    ${pathname === item.path ? "font-semibold" : ""}
                  `}>
                  {item.label}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] w-full
                      bg-secondary
                      transition-transform duration-300
                      origin-left
                      ${
                        pathname === item.path
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                      block
                    `}
                    style={{ transformOrigin: "left" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Search, cart & Profile */}
        <div className="hidden md:flex items-center gap-4 md:gap-6 ">
          <div className=" lg:w-[200px]">
            {(() => {
              let placeholder = "Search Idea...";
              let onSearch = handleIdeaSearch;
              if (pathname === "/blogs" || pathname.startsWith("/blogs/")) {
                placeholder = "Search Blog...";
                onSearch = handleBlogSearch;
              }
              return (
                <div className="flex w-full mt-2 md:mt-0 lg:rounded-full lg:relative">
                  <Input
                    placeholder={placeholder}
                    className="rounded-r-3xl border border-secondary md:hidden lg:flex"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch();
                    }}
                  />

                  <Button
                    className="rounded-r-full cursor-pointer absolute right-0 hidden lg:flex"
                    size="icon"
                    onClick={onSearch}>
                    <Search size={18} />
                  </Button>
                  <Button
                    className="cursor-pointer flex lg:hidden relative"
                    size="icon"
                    onClick={handleTabletSearch}>
                    <Search size={18} />
                  </Button>
                  {tabletSearchBar && (
                    <div className="flex lg:hidden absolute -bottom-12 right-5 w-1/3 bg-background p-2 rounded-l-lg rounded-r-3xl z-50">
                      <Input
                        placeholder={placeholder}
                        className="rounded-r-3xl border border-secondary relative"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onSearch();
                        }}
                      />
                      <Button
                        className="rounded-r-full cursor-pointer absolute right-0"
                        size="icon"
                        onClick={onSearch}>
                        <Search size={18} />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          <div className="hidden md:flex flex-row-reverse items-center gap-3 md:gap-6 mt-2 md:mt-0">
            <div className="relative">
              <Drafts />
            </div>
          </div>
        </div>
      </div>

      <Separator
        className={`transition-all duration-300 ${
          isScrolled ? "border-b-2 border-primary" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default Navbar;
