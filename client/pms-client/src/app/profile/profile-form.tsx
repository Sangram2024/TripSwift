"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { PenLine } from "lucide-react";
import { Toggle } from "./../../components/ui/toggle";

type Props = {
  data: Data;
};

type Data = {
  firstname: string;
  lastname: string;
  email: string;
};

const updateProfileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
});

export default function ProfileForm({ data }: Props) {
  const [isEditable, setIsEditable] = useState(false);

  const form = useForm<Data>({
    defaultValues: {
      firstname: data?.firstname,
      lastname: data?.lastname,
      email: data?.email,
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const { register, control, handleSubmit, formState } = form;

  const {
    errors: {
      firstname: firstnameError,
      lastname: lastnameError,
      email: emailError,
    },
  } = formState;

  useEffect(() => {
    firstnameError && toast.error(firstnameError.message!);
    lastnameError && toast.error(lastnameError.message!);
    emailError && toast.error(emailError.message!);
  }, [emailError, firstnameError, lastnameError]);

  const onSubmit: SubmitHandler<Data> = async (data) => {};

  return (
    <div className="px-4">
      <CardTitle className="mb-4">Profile</CardTitle>
      <form className="space-y-4">
        <div>
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            variant={"default"}
            type="text"
            className="w-[300px]"
            placeholder="Firstname"
            {...register("firstname")}
            id="firstname"
          />
        </div>
        <div>
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            placeholder="Lastname"
            type="text"
            id="lastname"
            {...register("lastname")}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Email"
            type="email"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex items-center gap-2 justify-end mt-4">
          <Toggle onClick={() => setIsEditable((prev) => !prev)}>
            <PenLine size={16} />
          </Toggle>
          <Button type="submit" disabled={!isEditable}>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
