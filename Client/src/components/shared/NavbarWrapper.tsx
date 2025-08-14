/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarWrapper = ({ myProfile }: { myProfile: any }) => {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname !== "/" ? "h-28 md:h-32 lg:h-36" : "h-28 md:h-32 lg:h-36"
      }`}>
      <Navbar myProfile={myProfile} />
    </div>
  );
};

export default NavbarWrapper;
