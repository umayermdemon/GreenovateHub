import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";
import LoginRegister from "@/components/modules/auth/LoginRegister/LoginRegister";
const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }>
      <div>
        <LoginRegister />
      </div>
    </Suspense>
  );
};

export default LoginPage;
