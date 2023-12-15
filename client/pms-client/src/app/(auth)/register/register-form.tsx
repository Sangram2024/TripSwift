"use client";

import { register } from "../../../actions/actions";
import { Button, buttonVariants } from "../../../components/ui/button";
import {
  //   Card,
  //   CardContent,
  CardDescription,
  //   CardFooter,
  //   CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { Input } from "../../../components/ui/input";
import { Input as NextUIInput, input } from "@nextui-org/react";
import { Label } from "../../../components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons/";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { AtSign, Eye, EyeOff, Lock, User } from "lucide-react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button as NextUIButton,
} from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";

type Props = {};

const registerSchema = z.object({
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function RegisterForm({}: Props) {
  // const [state, formAction] = useFormState(register, null);

  const [isVisible, setIsVisible] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { register, control, handleSubmit, formState } = form;
  const {
    errors: {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError,
    },
  } = formState;

  useEffect(() => {
    firstNameError && toast.error(firstNameError.message!);
    lastNameError && toast.error(lastNameError.message!);
    emailError && toast.error(emailError.message!);
    passwordError && toast.error(passwordError.message!);
  }, [firstNameError, lastNameError, emailError, passwordError]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8020/api/v1/auth/register",
        {
          ...data,
        }
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message);
      }
      return;
    }
    setLoading(false);
    router.push("/login");
  };

  return (
    <div className="w-[500px]">
      <div className="mb-10">
        <CardTitle className="text-5xl">
          Register | <span className="font-normal text-xl">TripSwift</span>
        </CardTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-10 space-y-4">
          <div>
            <Label htmlFor="firstName">Firstname</Label>
            <Input
              withIcon
              startIcon={<User size={20} />}
              size={"lg"}
              type="text"
              variant={firstNameError && "error"}
              {...register("firstName")}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Lastname</Label>
            <Input
              withIcon
              startIcon={<User size={20} />}
              size={"lg"}
              variant={lastNameError && "error"}
              {...register("lastName")}
              type="text"
            />
          </div>
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
        </div>
        <div className="flex flex-col items-center">
          <span>
            Already have an account?{" "}
            <Button
              type="button"
              className="px-0"
              onClick={() => router.push("/login")}
              variant={"link"}
            >
              Login
            </Button>
          </span>
          <SubmitButton loading={loading} />
        </div>
      </form>
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  const { pending } = useFormStatus();

  return (
    <NextUIButton
      size="lg"
      type="submit"
      variant="solid"
      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
      isLoading={loading}
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Register
    </NextUIButton>
  );
}
