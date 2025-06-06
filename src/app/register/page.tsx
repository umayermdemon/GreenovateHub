import Image from "next/image";
import { Suspense } from "react";
import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import registerImg from "../assets/register.jpg";
import Spinner from "@/components/utils/Spinner";
const RegisterPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div className="h-screen flex flex-col md:flex-row bg-white mx-5">
        {/* Left - Login Form */}
        <div className="w-full relative bottom-8 md:w-[50%] flex items-center justify-center  px-6 py-8">
          <RegisterForm />
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-[50%] hidden md:block relative">
          <Image
            src={registerImg}
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

export default RegisterPage;
