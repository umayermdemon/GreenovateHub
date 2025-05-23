import Nav from "@/components/modules/shared/Nav";
import Footer from "@/components/shared/Footer";
import { getUser } from "@/services/auth";
import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();
  return (
    <>
      <div
        className={`${
          user
            ? "bg-gradient-to-r from-green-100 to-green-50 h-20"
            : "bg-gradient-to-r from-green-100 to-green-50 h-16"
        }`}>
        <Nav />
      </div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
