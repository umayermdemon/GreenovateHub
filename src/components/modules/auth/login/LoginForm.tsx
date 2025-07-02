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
    const { email, password } = data;
    const loginData = {
      email,
      password,
    };
    try {
      const res = await loginUser(loginData);
      if (res.success) {
        if (redirectPath) {
          window.location.href = redirectPath;
          toast.success(res.message);
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fillDemo = (type: "member") => {
    form.setValue("email", demoCredentials[type].email);
    form.setValue("password", demoCredentials[type].password);
  };
  const commonWidth = "lg:w-[400px] w-[340px]";
  return (
    <div className="lg:max-w-3xl lg:w-full lg:mx-auto lg:px-8 px-3">
      <div className="mb-2 lg:mr-0 relative lg:left-0 left-3">
        <Link href="/" className="text-primary underline">
          {" "}
          Back To Home
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:w-[480px] w-full p-3">
          <div className="space-y-1 border-2 border-primary border-b-0 rounded-2xl pt-6">
            <h1 className="text-center text-2xl text-primary">
              Enter Your Credentials
            </h1>
            <div className="flex justify-center gap-3 mb-4">
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition font-semibold cursor-pointer"
                onClick={() => fillDemo("member")}>
                Demo member
              </Button>
            </div>
            <div className="w-full flex justify-center p-4">
              <GFormInput
                name="email"
                label="Email"
                placeholder="Email"
                control={form.control}
                className={`focus:outline-none rounded-none border ${commonWidth} border-primary`}
                required
              />
            </div>
            <div className="w-full flex justify-center ">
              <GFormInput
                name="password"
                label="Password"
                placeholder="********"
                control={form.control}
                className={`focus:outline-none rounded-none ${commonWidth} border border-primary`}
                type="password"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className={`${commonWidth} rounded-none mt-3 text-primary-foreground bg-primary cursor-pointer`}>
                {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </div>
            <h1 className="text-center text-primary">
              New here?{" "}
              <Link
                className="text-secondary hover:underline cursor-pointer"
                href={`/register${
                  redirectPath ? `?redirectPath=${redirectPath}` : ""
                }`}>
                SignUp
              </Link>
            </h1>
            {/* <p className="text-center">or</p>
            <div className="flex justify-center">
              <Button className="bg-amber-300 text-amber-700 cursor-pointer">
                <FcGoogle className="text-xl" />
                Google
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
