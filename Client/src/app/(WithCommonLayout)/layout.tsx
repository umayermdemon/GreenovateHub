import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMyProfile } from "@/services/auth";
import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const { data: myProfile } = await getMyProfile();
  return (
    <>
      <div className="h-16 md:h-32 lg:h-36">
        <Navbar myProfile={myProfile} />
      </div>
      <div className="bg-background">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
