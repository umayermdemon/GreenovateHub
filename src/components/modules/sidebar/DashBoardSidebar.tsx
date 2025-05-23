"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  PenLine,
  Sparkles,
  BookOpenText,
  Palette,
  Home,
  Settings,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Extend the JwtPayload to include custom properties
interface CustomJwtPayload extends JwtPayload {
  role: string;
  userId: string;
  email: string;
  name?: string; // Optional property for the user's name
}

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const accessToken = Cookies.get("accessToken");
  let role = null;
  let decoded: CustomJwtPayload | null = null;

  try {
    if (accessToken) {
      decoded = jwtDecode<CustomJwtPayload>(accessToken);
      role = decoded?.role;
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }
  // console.log(role);
  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      color: "text-sky-600",
      title: "Home",
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/member/dashboard",
      color: "text-sky-500",
    },

    {
      label: "Create Blog",
      icon: PenLine,
      href: "/member/dashboard/create-blog",
      color: "text-sky-500",
      title: "d",
    },
    {
      label: "Create Idea",
      icon: Sparkles,
      href: "/member/dashboard/create-idea",
      color: "text-green-900",
    },
    {
      label: "My Blogs",
      icon: BookOpenText,
      href: "/member/dashboard/my-blogs",
      color: "text-green-500",
    },
    {
      label: "My Ideas",
      icon: Palette,
      href: "/member/dashboard/my-ideas",
      color: "text-green-500",
    },
    {
      label: "My Followers",
      icon: Users,
      href: "/member/dashboard/my-followers",
      color: "text-green-500",
    },

    ...(role === "admin"
      ? [
          {
            label: "User Management",
            icon: UserCog,
            href: "/dashboard/manage-users",
            color: "text-primary",
          },
        ]
      : []),
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];
  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/login";
  };

  return (
    <div className="fixed left-0 top-0 w-full max-w-[300px]">
      <div className="flex flex-col border-r border-green-500 bg-amber-100 h-screen w-full">
        <div className="flex h-14 items-center px-4">
          <h1 className="text-center mt-8 text-3xl font-semibold border-b-2 border-green-500 w-full pb-3">
            <span className="text-green-500 ">Green</span> Circle
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rotate-180 md:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4 mt-8">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-green-900 hover:text-white text-green-500",
                  pathname === route.href
                    ? "bg-green-500 text-white"
                    : "transparent text-green-900"
                )}>
                <route.icon
                  className={cn(
                    "h-5 w-5 group-hover:text-white",
                    pathname === route.href ? "text-white" : "text-green-500 "
                  )}
                />
                <span className={cn(isCollapsed && "hidden")}>
                  {route.label}
                </span>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="mt-auto  p-4">
          <div
            className={cn(
              "flex items-center justify-between gap-2",
              isCollapsed && "flex-col"
            )}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32&text=JD"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className={cn(isCollapsed && "hidden")}>
                {" "}
                <p className="text-xs text-muted-foreground">
                  {decoded?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
