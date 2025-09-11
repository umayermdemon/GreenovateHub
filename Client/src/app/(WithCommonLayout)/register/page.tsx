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
      <div className="bg-gray-200">
        <RegisterForm />
      </div>
    </Suspense>
  );
};

export default RegisterPage;
