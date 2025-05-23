import LoginForm from "@/components/modules/auth/login/LoginForm";
import Image from "next/image";
import { Suspense } from "react";
import loginImg from "../assets/sinnn.jpg";
const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex flex-col md:flex-row-reverse bg-white">
        {/* Left - Login Form */}
        <div className="lg:w-[50%] lg:mt-0 mt-20  flex items-center justify-center  lg:px-6 py-8">
          <LoginForm />
        </div>

        {/* Right - Image */}
        <div className="w-[50%]  md:block relative">
          <Image
            src={loginImg}
            alt="login"
            fill
            className="w-full h-full"
            priority
          />
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
