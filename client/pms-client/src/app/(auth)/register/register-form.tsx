"use client";

import { register } from "../../../actions/actions";
import { Button } from "../../../components/ui/button";
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
import { Input as NextUIInput } from "@nextui-org/react/dist";
import { Label } from "../../../components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons/dist";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast/dist";
import { Eye, EyeOff } from "lucide-react/dist/lucide-react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react/dist";

type Props = {};

export default function RegisterForm({}: Props) {
  const [state, formAction] = useFormState(register, null);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (state?.data?.user) {
      toast.success(state?.message);
      redirect("/login");
    }

    if (Array.isArray(state?.error)) {
      state?.error.map((err: any) => {
        toast.error(err);
      });
    } else if (state?.error) {
      toast.error(state?.error);
    }
  }, [state]);

  return (
    <div className="h-screen w-screen grid place-content-center">
      <Card className="w-[400px] p-4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <form action={formAction}>
          <CardBody className="space-y-2">
            <div className="flex gap-2">
              <NextUIInput
                label="Firstname"
                variant="bordered"
                name="firstname"
                type="text"
                size="lg"
              />
              <NextUIInput
                label="Lastname"
                variant="bordered"
                name="lastname"
                size="lg"
                type="text"
              />
            </div>
            {/* <Label htmlFor="email">Email</Label> */}
            <NextUIInput
              label="Email"
              variant="bordered"
              name="email"
              size="lg"
              type="email"
            />
            <NextUIInput
              label="Password"
              name="password"
              size="lg"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff
                      size={20}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <Eye
                      size={20}
                      className="text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            <CardDescription>
              <span
                className="text-red-600
              "
              >
                *
              </span>{" "}
              Register as property manager
            </CardDescription>
          </CardBody>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="" disabled={pending}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Register
    </Button>
  );
}
