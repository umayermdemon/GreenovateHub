import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMyProfile } from "@/services/auth";
import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const { data: myProfile } = await getMyProfile();
  return (
    <>
      <div>
        <Navbar myProfile={myProfile} />
      </div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
