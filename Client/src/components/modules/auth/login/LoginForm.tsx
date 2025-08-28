/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginUser } from "@/services/auth";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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
  };
  return (
    <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center justify-center ">
      <div className="w-full space-y-6 border-2 h-[550px]">
        <div className="text-center bg-gray-100 p-4 text-xl font-medium uppercase">
          Login
        </div>
        <div className="bg-card text-card-foreground p-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <p className="text-center text-black font-semibold text-2xl mt-1 mb-4">
              Join our community of sustainability
            </p>
          </div>

          {/* Demo Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={fillDemo}
              type="button"
              className="text-primary border border-primary hover:bg-primary/10 font-medium px-4 py-1 rounded-full transition cursor-pointer">
              Use Demo Member
            </button>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[550px]">
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

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" />
                  Remember Me
                </label>
                <Link href="#" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground font-semibold py-2 rounded-xl mt-4">
                {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
