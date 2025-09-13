import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";
import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import RegisterInfoCard from "@/components/modules/auth/register/RegisterInfoCard";
const RegisterPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div className="bg-gray-100 pt-4 md:pt-6 lg:pt-12 pb-4">
        <div className="max-w-7xl mx-2 md:mx-auto flex items-center justify-center bg-white rounded-xl shadow-lg">
          <div className="hidden md:flex md:w-1/2 rounded-l-xl items-center justify-center">
            <RegisterInfoCard />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default RegisterPage;
