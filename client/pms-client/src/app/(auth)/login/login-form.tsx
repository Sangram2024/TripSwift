"use client";

import { login } from "../../../actions/actions";
import { Button } from "../../../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { encodeStr } from "../../../lib/utils";
import { Input as NextUIInput } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button as NextUIButton,
} from "@nextui-org/react";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons/";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { CardDescription, CardTitle } from "../../../components/ui/card";
import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

type Props = {};

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d.*\d).{8,}$/,
      "Password should contain atleast one uppercase letter , one special charecter and password should be atleast 8 charecters long"
    )
    .min(1, "Password is required"),
});

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm({}: Props) {
  const [state, formAction] = useFormState(login, null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { register, control, handleSubmit, formState } = form;
  const {
    errors: { email: emailError, password: passwordError },
  } = formState;

  useEffect(() => {
    emailError && toast.error(emailError.message!);
    passwordError && toast.error(passwordError.message!);
  }, [emailError, passwordError]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8020/api/v1/auth/login", {
        ...data,
      });
      setLoading(false);
      router.push(`/?auth=${res.data.data.accessToken}`);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message);
      }
      return;
    }
  };

  return (
    <div className="w-[500px]">
      <div className="mb-10">
        <CardTitle className="text-5xl">
          Login | <span className="font-normal text-xl">TripSwift</span>
        </CardTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-10 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              withIcon
              startIcon={<AtSign size={20} />}
              size={"lg"}
              {...register("email")}
              variant={emailError && "error"}
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              withIcon
              startIcon={<Lock size={20} />}
              variant={passwordError && "error"}
              endIcon={
                <Button
                  variant={"ghost"}
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="px-0 py-0 hover:bg-transparent"
                  type="button"
                >
                  {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
              }
              size={"lg"}
              type={isVisible ? "text" : "password"}
            />
          </div>
          <CardDescription>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger className="underline hover:text-foreground transition-all duration-200">
                Forgot your password?
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>
                    Reset your profile password
                  </DialogDescription>
                </DialogHeader>
                <form action="">
                  <div>
                    <Label htmlFor="email-for-resetPassword">Email</Label>
                    <Input
                      id="email-for-resetPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      type="button"
                      onClick={() => setOpenDialog(false)}
                      variant={"ghost"}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Reset</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardDescription>
        </div>
        <div className="flex flex-col items-center">
          <span>
            Don't have an account?{" "}
            <Button
              type="button"
              className="px-0"
              onClick={() => router.push("/register")}
              variant={"link"}
            >
              Register
            </Button>
          </span>
          <SubmitButton loading={loading} />
        </div>
      </form>
    </div>
  );
}

function SubmitButton({ loading }) {
  return (
    <NextUIButton
      size="lg"
      type="submit"
      variant="solid"
      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
      isLoading={loading}
    >
      Login
    </NextUIButton>
  );
}
