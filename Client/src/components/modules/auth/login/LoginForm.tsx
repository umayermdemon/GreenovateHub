/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginUser } from "@/services/auth";
import { Leaf, Loader } from "lucide-react";
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
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div className="bg-muted rounded-full p-3">
          <Leaf className="text-primary w-8 h-8" />
        </div>
      </div>
      {/* Welcome */}
      <h2 className="text-2xl font-semibold text-center text-foreground mb-1">
        Welcome Back
      </h2>
      <p className="text-muted-foreground text-center mb-2 text-base">
        Sign in to your GreenovateHub account
      </p>
      {/* Demo Button */}
      <div className="flex justify-center mb-2">
        <button
          onClick={fillDemo}
          type="button"
          className="text-primary border border-primary hover:bg-primary/10 font-medium px-4 py-1 rounded-full transition cursor-pointer text-sm">
          Use Demo Member
        </button>
      </div>
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Email Address
            </label>
            <GFormInput
              name="email"
              placeholder="Enter your email"
              control={form.control}
              className="w-full border border-border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Password
            </label>
            <GFormInput
              name="password"
              placeholder="Enter your password"
              type="password"
              control={form.control}
              className="w-full border border-border"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              Remember me
            </label>
            <Link href="#" onClick={()=>{
              alert("Feature coming soon!")
            }} className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-md mt-2 text-base cursor-pointer">
            {isSubmitting ? <Loader className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </Form>
      {/* Sign up link */}
      <div className="text-center mt-2 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
