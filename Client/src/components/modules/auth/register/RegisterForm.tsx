/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GCImageUploader from "@/components/ui/core/GCImageUploader";
import useImageUploader from "@/components/utils/useImageUploader";
import { registrationValidation } from "./registrationValidation";
import { registerUser } from "@/services/auth";
import { Leaf, Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const RegisterForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const { uploadImagesToCloudinary } = useImageUploader();

  const form = useForm({
    resolver: zodResolver(registrationValidation),
    defaultValues: {
      name: "",
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
    const image = await uploadImagesToCloudinary(imageFiles[0]);
    const { name, email, password } = data;
    const userData = {
      name,
      email,
      password,
      image,
      role: "member",
    };

    try {
      const res = await registerUser(userData);
      if (res?.success) {
        toast.success(res.message);
        window.location.href = redirectPath;
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full max-w-xl bg-white p-2 md:p-8 flex flex-col gap-4">
      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div className="bg-muted rounded-full p-3">
          <Leaf className="text-primary w-8 h-8" />
        </div>
      </div>
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-foreground">
        Create Account
      </h2>
      <p className="text-muted-foreground text-center mb-2 text-base">
        Join GreenovateHub to start your sustainable journey
      </p>
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Name
            </label>
            <GFormInput
              name="name"
              placeholder="Enter your name"
              control={form.control}
              className="w-full border border-border"
              required
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Profile Image (optional)
            </label>
            <GCImageUploader
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              imageFiles={imageFiles}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-white font-semibold py-2 rounded-md mt-2 text-base">
            {isSubmitting ? <Loader className="animate-spin" /> : "Register"}
          </Button>
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-border"></div>
            <span className="mx-2 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-border"></div>
          </div>
          <Button
            type="button"
            className="bg-muted text-foreground flex items-center justify-center gap-2 shadow hover:bg-muted/80 transition font-semibold w-full cursor-pointer">
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>
        </form>
      </Form>
      {/* Sign in link */}
      <div className="text-center mt-2 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
