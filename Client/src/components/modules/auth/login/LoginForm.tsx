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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUser } from "react-icons/fa";
import RegisterPage from "@/app/register/page";

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
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-start md:justify-center h-14 w-24 gap-2 text-primary md:text-secondary/70 hover:text-primary cursor-pointer">
          <FaUser className="hidden md:flex" />
          <span className="text-base font-medium md:text-sm">Sign In</span>
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 max-w-md">
        <div className="w-full rounded-xl overflow-hidden">
          <Image
            src={loginImg}
            alt="Login banner"
            className="w-full h-48 object-cover"
          />

          <div className="p-6 bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">
                Welcome to GreenovateHub
              </DialogTitle>
            </DialogHeader>

            <p className="text-center text-muted-foreground mt-1 mb-4">
              Join our community of sustainability enthusiasts and share your
              ideas for a greener future.
            </p>

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
                className="space-y-4">
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
                  className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground font-semibold py-2 rounded-full">
                  {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-muted-foreground mt-6 flex justify-center items-center">
              <span> Don’t have an account?</span>{" "}
              {/* <Link
                href={`/register${
                  redirectPath ? `?redirectPath=${redirectPath}` : ""
                }`}
                className="text-primary hover:underline">
                Sign up
              </Link> */}
              <div>
                <RegisterPage />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
