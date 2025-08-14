import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";
const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div>
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
