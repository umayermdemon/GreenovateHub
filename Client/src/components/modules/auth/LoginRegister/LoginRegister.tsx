/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";

const LoginRegister = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 my-6">
      <div>
        <LoginForm />
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginRegister;
