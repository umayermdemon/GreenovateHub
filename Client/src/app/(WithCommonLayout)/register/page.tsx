import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";
import RegisterForm from "@/components/modules/auth/register/RegisterForm";
const RegisterPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div className="py-16 bg-gray-100 flex items-center justify-center">
        <RegisterForm />
      </div>
    </Suspense>
  );
};

export default RegisterPage;
