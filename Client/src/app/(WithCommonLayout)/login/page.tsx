import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";
import LoginForm from "@/components/modules/auth/login/LoginForm";
const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div className="py-16 bg-gray-100 flex items-center justify-center">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
