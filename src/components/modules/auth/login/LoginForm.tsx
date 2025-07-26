/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/services/auth";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import loginImg from "../../../../app/assets/login.png";

const demoCredentials = {
  member: {
    email: "member@demo.com",
    password: "member1234",
  },
};

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res.message);
        window.location.href = redirectPath;
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error("Something went wrong!", error);
    }
  };

  const fillDemo = () => {
    form.setValue("email", demoCredentials.member.email);
    form.setValue("password", demoCredentials.member.password);
    toast.info("Demo credentials filled!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg">
        <Image
          src={loginImg}
          alt="Login banner"
          className="w-full h-48 object-cover rounded-t-xl"
        />

        <div className="p-6 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-1 text-black">
            Welcome to GreenovateHub
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Join our community of sustainability enthusiasts and share your
            ideas for a greener future.
          </p>

          {/* Demo Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={fillDemo}
              type="button"
              className="text-green-600 border border-green-600 hover:bg-green-50 font-medium px-4 py-1 rounded-full transition">
              Use Demo Member
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <GFormInput
                name="email"
                placeholder="Email"
                control={form.control}
                className="w-full"
                required
              />
              <GFormInput
                name="password"
                placeholder="Password"
                type="password"
                control={form.control}
                className="w-full"
                required
              />

              <div className="flex items-center justify-between text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-green-600" />
                  Remember Me
                </label>
                <Link href="#" className="text-green-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full">
                {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              href={`/register${
                redirectPath ? `?redirectPath=${redirectPath}` : ""
              }`}
              className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
