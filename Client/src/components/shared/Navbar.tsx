"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaList } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  PencilLine,
  Search,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth";
import { TUserProfile } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import UpdateProfile from "../UpdateProfile";
import GetInTouchModal from "../utils/GenInTouchModal";
import LoginFormWrapper from "../modules/auth/login/LoginFormWrapper";

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

const Navbar = ({ myProfile }: { myProfile: TUserProfile | null }) => {
  const { user } = useUser();
  const pathname = usePathname();
  const [mobileSearchBar, setMobileSearchBar] = useState(false);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGetInTouch, setShowGetInTouch] = useState(false);
  const router = useRouter();

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
  ];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCategory("");
      }
    }
    if (category === "open") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [category]);

  const AvatarComponent = (
    <Avatar className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] cursor-pointer">
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
      className={`${`w-full z-50 transition-all duration-300 fixed bg-background ${
        isScrolled ? "md:py-0" : "py-0"
      }`}`}>
      {/* Top nav */}
      <div
        className={`flex flex-col gap-2 md:flex-row md:items-center md:justify-between px-0 md:px-4 lg:px-0 max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled
            ? "h-16 py-2 md:py-0 md:h-0 md:overflow-hidden md:opacity-0"
            : "h-16 py-2 opacity-100"
        }`}>
        {/* Logo */}
        <div
          className={`flex items-center justify-between pt-2 ${
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
        {mobileSearchBar && pathname === "/ideas" ? (
          <div
            className="fixed top-0 left-0 w-full h-16 bg-background z-[100] flex items-center px-4 transition-transform duration-300 ease-in"
            style={{
              transform: mobileSearchBar
                ? "translateY(0)"
                : "translateY(-100%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}>
            <Input
              placeholder="Search Ideasssss..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleIdeaSearch();
              }}
              className="flex-1 mr-10"
              autoFocus
            />
            <X
              className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
              size={28}
              onClick={() => {
                setMobileSearchBar(false);
                setSearchTerm("");
              }}
            />
          </div>
        ) : mobileSearchBar &&
          (pathname === "/blogs" || pathname.startsWith("/blogs/")) ? (
          <div
            className="fixed top-0 left-0 w-full h-16 bg-background z-[100] flex items-center px-4 transition-transform duration-300 ease-in"
            style={{
              transform: mobileSearchBar
                ? "translateY(0)"
                : "translateY(-100%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}>
            <Input
              placeholder="Search Blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlogSearch();
              }}
              className="flex-1 mr-10"
              autoFocus
            />
            <X
              className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
              size={28}
              onClick={() => {
                setMobileSearchBar(false);
                setSearchTerm("");
              }}
            />
          </div>
        ) : (
          <div
            className="fixed top-0 left-0 w-full h-16 bg-background z-[100] flex items-center px-4 transition-transform duration-300 ease-in"
            style={{
              transform: mobileSearchBar
                ? "translateY(0)"
                : "translateY(-100%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}>
            <Input
              placeholder="Search Ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleIdeaSearch();
              }}
              className="flex-1 mr-10"
              autoFocus
            />
            <X
              className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
              size={28}
              onClick={() => {
                setMobileSearchBar(false);
                setSearchTerm("");
              }}
            />
          </div>
        )}

        {/* Desktop Search bar */}
        {pathname === "/ideas" ? (
          <div className="hidden lg:flex w-full md:w-[40%] mt-2 md:mt-0 rounded-full relative">
            <Input
              placeholder="Search Idea..."
              className="rounded-r-3xl border border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleIdeaSearch();
              }}
            />
            <Button
              className="rounded-r-full cursor-pointer bg-secondary/70 hover:bg-secondary absolute right-0"
              size="icon"
              onClick={handleIdeaSearch}>
              <Search size={18} />
            </Button>
          </div>
        ) : pathname === "/blogs" || pathname.startsWith("/blogs/") ? (
          <div className="hidden lg:flex w-full md:w-[40%] mt-2 md:mt-0 rounded-full relative">
            <Input
              placeholder="Search Blog..."
              className="rounded-r-3xl border border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlogSearch();
              }}
            />
            <Button
              className="rounded-r-full cursor-pointer bg-secondary/70 hover:bg-secondary absolute right-0"
              size="icon"
              onClick={handleBlogSearch}>
              <Search size={18} />
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex w-full md:w-[40%] mt-2 md:mt-0 rounded-full relative">
            <Input
              placeholder="Search Idea..."
              className="rounded-r-3xl border border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleIdeaSearch();
              }}
            />
            <Button
              className="rounded-r-full cursor-pointer bg-secondary/70 hover:bg-secondary absolute right-0"
              size="icon"
              onClick={handleIdeaSearch}>
              <Search size={18} />
            </Button>
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
                  <LoginFormWrapper />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Icons */}
        <div className="hidden md:flex items-center gap-3 md:gap-6 mt-2 md:mt-0">
          {user ? (
            <div className="h-14 w-24 flex items-center justify-center">
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
            <LoginFormWrapper />
          )}
          <div className="relative">
            <Drafts />
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div
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
      </div>

      <Separator
        className={`transition-all duration-300 ${
          isScrolled ? "md:opacity-0" : "opacity-100"
        }`}
      />

      {/* Bottom nav */}
      <div
        className={`hidden md:flex flex-row items-center justify-between gap-2 px-2 md:px-4 lg:px-0 py-2 text-xs md:text-sm max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled ? "md:py-2" : ""
        }`}>
        {/* Category Dropdown */}
        <div
          className="relative w-full md:w-auto mb-2 md:mb-0"
          ref={dropdownRef}>
          <button
            onClick={() => setCategory((c) => (c === "open" ? "" : "open"))}
            className="relative cursor-pointer text-xs md:text-sm flex items-center gap-2 w-full lg:w-52">
            <FaList />
            <span className="hidden lg:block">Browse Ideas</span>
            <ChevronDown />
          </button>
          {category === "open" && (
            <div className="absolute left-0 mt-2 bg-background shadow-xl rounded w-full md:w-48 text-secondary/60 z-50">
              {["All", "Energy", "Waste", "Transportation"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    router.push(
                      item === "All"
                        ? "/ideas"
                        : `/ideas?category=${encodeURIComponent(
                            item.toLowerCase()
                          )}`
                    );
                  }}
                  className="cursor-pointer px-4 py-2 hover:text-secondary m-2 rounded-md">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Menu Items */}
        <div className="w-full flex items-center justify-center">
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
        {/* Contact */}
        <div className="flex items-center">
          <Button
            onClick={() => setShowGetInTouch(true)}
            className="bg-primary hover:bg-secondary text-primary-foreground cursor-pointer">
            Get In Touch
          </Button>
        </div>
        {/* Get In Touch Modal */}
        <GetInTouchModal
          open={showGetInTouch}
          onOpenChange={setShowGetInTouch}
        />
      </div>
    </div>
  );
};

export default Navbar;
