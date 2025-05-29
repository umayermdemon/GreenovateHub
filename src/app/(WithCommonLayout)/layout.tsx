import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMyProfile, getUser } from "@/services/auth";
import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();
  const { data: myProfile } = await getMyProfile();
  return (
    <>
      <div
        className={`${user ? "h-36 md:h-32 lg:h-40" : "h-36 md:h-32 lg:h-36"}`}>
        <Navbar myProfile={myProfile} />
      </div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
