/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GCImageUploader from "@/components/ui/core/GCImageUploader";
import useImageUploader from "@/components/utils/useImageUploader";
import { registrationValidation } from "./registrationValidation";
import { registerUser } from "@/services/auth";
import { Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import registerImage from "../../../../app/assets/register.png";
import LoginPage from "@/app/(WithCommonLayout)/login/page";

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
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center ">
      <div className="w-full space-y-6 border-2 h-[550px]">
        <div className="text-center bg-gray-100 p-4 text-xl font-medium uppercase">
          Create Account
        </div>
        <div className="p-6 bg-card text-card-foreground">
          <div>
            <div className="text-2xl text-center mb-2 text-black font-semibold">
              Join GreenovateHub
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[550px]">
              <GFormInput
                name="name"
                placeholder="Enter your name"
                control={form.control}
                className="w-full rounded-md border border-border bg-background text-foreground"
                required
              />

              <GFormInput
                name="email"
                placeholder="Enter your email"
                control={form.control}
                className="w-full rounded-md border border-border bg-background text-foreground"
                required
              />

              <GFormInput
                name="password"
                placeholder="Enter your password"
                type="password"
                control={form.control}
                className="w-full rounded-md border border-border bg-background text-foreground"
                required
              />

              <GCImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                imageFiles={imageFiles}
              />

              <Button
                type="submit"
                className="w-full rounded-xl mt-3 text-primary-foreground bg-primary hover:bg-primary/90 transition font-semibold shadow cursor-pointer">
                {isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>

              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-border"></div>
                <span className="mx-2 text-muted-foreground text-sm">or</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <Button className="bg-muted text-foreground flex items-center justify-center gap-2 shadow hover:bg-muted/80 transition font-semibold w-full">
                <FcGoogle className="text-xl" />
                Google
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
