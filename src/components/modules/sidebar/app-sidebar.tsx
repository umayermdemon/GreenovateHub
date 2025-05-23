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
  LogOut,
  Bell,
  FilePen,
  Package,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { TUserProfile } from "@/types/user.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiChevronUpDown } from "react-icons/hi2";
import { getMyProfile, logoutUser } from "@/services/auth";
// Extend JWT Payload to include role
interface CustomJwtPayload extends JwtPayload {
  role: string;
  userId: string;
  email: string;
  name?: string;
}

const AppSidebar = () => {
  const pathname = usePathname();
  const [myProfile, setMyProfile] = useState<TUserProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await getMyProfile();
      setMyProfile(data);
    }
    fetchProfile();
  }, []);
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 className="text-2xl font-semibold border-b-2 border-green-500 pb-3 text-center">
            <span className="text-2xl text-green-500 ">Green</span> Circle
          </h1>
          <SidebarGroupContent>
            <SidebarMenu className="mt-10">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={` ${pathname === item.url ? "bg-green-500 text-white" : ""
                        } text-[16px] rounded-none `}
                      href={item.url}>
                      <item.icon
                        className={`mr-2 ${pathname === item.url ? "text-white" : ""
                          } text-green-500 h-5 w-5`}
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
      <Avatar className="mb-3 mx-2">
        <div className="flex gap-2">
          <AvatarImage
            className="relative top-1 w-[44px] h-[44px] rounded-full border border-green-500"
            src={myProfile?.image || "https://github.com/shadcn.png"}
          />
          <div>
            <h1 className="font-semibold text-[15px]">{myProfile?.name}</h1>
            <p className="font-semibold text-[14px] text-green-500">
              {myProfile?.email}
            </p>
          </div>
          <Popover>
            <PopoverTrigger>
              <HiChevronUpDown className="text-xl ml-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="relative left-52">
              <div>
                <div className="flex gap-3 border-b border-green-500 pb-4">
                  <AvatarImage
                    className="relative top-1 w-[44px] h-[44px] rounded-full border border-green-500"
                    src={myProfile?.image || "https://github.com/shadcn.png"}
                  />
                  <div>
                    <h1 className="font-semibold text-[15px]">
                      {myProfile?.name}
                    </h1>
                    <p className="font-semibold text-[14px] text-green-500">
                      {myProfile?.email}
                    </p>
                  </div>
                </div>
                <ul className="divide-y">
                  <li
                    onClick={handleLogout}
                    className="mt-4  flex gap-2 cursor-pointer hover:bg-green-500 p-1 hover:text-white">
                    <LogOut className="relative top-1" size={18} /> Logout
                  </li>
                  <li className="mt-2  flex gap-2 cursor-pointer hover:bg-green-500 p-1 hover:text-white">
                    <Bell className="relative top-1" size={18} /> Notification
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Sidebar>
  );
};

export default AppSidebar;
