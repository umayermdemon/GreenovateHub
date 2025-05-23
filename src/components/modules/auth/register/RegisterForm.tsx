"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationValidation } from "./registrationValidation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GCImageUploader from "@/components/ui/core/GCImageUploader";
import useImageUploader from "@/components/utils/useImageUploader";
import { Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { registerUser } from "@/services/auth";

const RegisterForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
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
    const image = await uploadImagesToCloudinary(imageFiles);
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
      if (res.success) {
        if (redirectPath) {
          window.location.href = redirectPath;
          toast.success(res.message);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const commonWidth = "w-[400px]";
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Link href="/" className="text-green-500 underline">
          {" "}
          Back To Home
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[480px]">
          <div
            className={`space-y-1 border-2 border-green-300 border-b-0 rounded-2xl pt-6`}>
            <h1 className="text-center text-2xl text-green-500">
              Enter You Registration Data
            </h1>
            <div className="w-full flex justify-center">
              <GFormInput
                name="name"
                label="Name"
                placeholder="Name"
                control={form.control}
                className={`focus:outline-none rounded-none border  ${commonWidth} border-green-500`}
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <GFormInput
                name="email"
                label="Email"
                placeholder="Email"
                control={form.control}
                className={`focus:outline-none rounded-none border ${commonWidth} border-green-500`}
                required
              />
            </div>
            <div className="w-full flex justify-center ">
              <GFormInput
                name="password"
                label="Password"
                placeholder="********"
                control={form.control}
                className={`focus:outline-none rounded-none ${commonWidth}  border border-green-500`}
                type="password"
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <GCImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                imageFiles={imageFiles}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className={`${commonWidth}  rounded-none mt-3 text-white bg-green-500 cursor-pointer`}>
                {isSubmitting ? <Loader className="animate-spin" /> : "Sign Up"}
              </Button>
            </div>
            <h1 className="text-center text-green-500">
              Already Have an Account?
              <Link className="text-black" href="/login">
                Login
              </Link>
            </h1>
            <p className="text-center">or</p>
            <div className="flex justify-center">
              <Button className="bg-amber-300 text-amber-700 cursor-pointer">
                <FcGoogle className="text-xl" />
                Google
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
