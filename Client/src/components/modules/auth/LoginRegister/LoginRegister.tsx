/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";

const LoginRegister = () => {
  return (
    <div className="max-w-7xl mx-2 lg:mx-auto flex flex-col md:flex-row gap-4 lg:gap-10 my-2 lg:my-6">
      <div className="flex-1">
        <LoginForm />
      </div>
      <div className="flex-1">
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginRegister;
