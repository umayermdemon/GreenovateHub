"use client";

import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Settings,
  LayoutDashboard,
  PenLine,
  Sparkles,
  BookOpenText,
  Palette,
  UserCog,
  FilePen,
  Package,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { TUserProfile } from "@/types/user.type";

import { getMyProfile } from "@/services/auth";
import { NavUser } from "./nav-user";
import Logo from "@/components/shared/Logo";
interface CustomJwtPayload extends JwtPayload {
  role: string;
  userId: string;
  email: string;
  name?: string;
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  const [myProfile, setMyProfile] = useState<TUserProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await getMyProfile();
      setMyProfile(data);
    }
    fetchProfile();
  }, []);

  const accessToken = Cookies.get("accessToken");
  let role = null;

  try {
    if (accessToken) {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      role = decoded?.role;
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: `/${role}/dashboard`,
      icon: LayoutDashboard,
    },

    ...(role === "member"
      ? [
          {
            title: "Create Blog",
            url: "/member/dashboard/create-blog",
            icon: PenLine,
          },
          {
            title: "Create Idea",
            url: "/member/dashboard/create-idea",
            icon: Sparkles,
          },
          {
            title: "My Blogs",
            url: "/member/dashboard/my-blogs",
            icon: BookOpenText,
          },
          {
            title: "My Ideas",
            url: "/member/dashboard/my-ideas",
            icon: Palette,
          },
          {
            title: "My Orders",
            url: "/member/dashboard/my-orders",
            icon: Package,
          },
          {
            title: "Draft Ideas",
            url: "/member/dashboard/draft-ideas",
            icon: FilePen,
          },
          {
            title: "Draft Blogs",
            url: "/member/dashboard/draft-blogs",
            icon: FileText,
          },
        ]
      : []),
    ...(role === "admin"
      ? [
          {
            title: "All Blogs",
            url: "/admin/dashboard/all-blogs",
            icon: BookOpenText,
          },
          {
            title: "All Ideas",
            url: "/admin/dashboard/all-ideas",
            icon: Palette,
          },
          {
            title: "All Orders",
            url: "/admin/dashboard/all-orders",
            icon: Package,
          },
          {
            title: "User Management",
            url: "/admin/dashboard/manage-users",
            icon: UserCog,
          },
        ]
      : []),
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <div className="ml-2">
            <Logo />
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="mt-10">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={`${
                        pathname === item.url
                          ? "bg-primary hover:bg-primary text-white"
                          : ""
                      } text-[16px] rounded-none`}
                      href={item.url}>
                      <item.icon
                        className={`mr-2 ${
                          pathname === item.url ? "text-white" : ""
                        } text-primary h-5 w-5`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: myProfile?.name || "User",
            email: myProfile?.email || "",
            avatar: myProfile?.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
