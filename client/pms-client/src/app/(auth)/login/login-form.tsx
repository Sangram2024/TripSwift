"use client";

import { login } from "../../../actions/actions";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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
import { ReloadIcon } from "@radix-ui/react-icons/dist";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast/dist";

type Props = {};

export default function LoginForm({}: Props) {
  const [state, formAction] = useFormState(login, null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (state?.data?.accessToken) {
      toast.success(state?.message);
      redirect(`/?auth=${state?.data?.accessToken}`);
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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login as property manager</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
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
          </CardContent>
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
      Login
    </Button>
  );
}
