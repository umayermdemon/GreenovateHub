import { Suspense } from "react";
import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import Spinner from "@/components/utils/Spinner";
const RegisterPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div>
        <RegisterForm />
      </div>
    </Suspense>
  );
};

export default RegisterPage;
