import Footer from "@/components/shared/Footer";
import NavbarWrapper from "@/components/shared/NavbarWrapper";
import { getMyProfile } from "@/services/auth";
import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const { data: myProfile } = await getMyProfile();
  return (
    <>
      <NavbarWrapper myProfile={myProfile} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
