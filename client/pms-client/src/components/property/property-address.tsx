"use client";

import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../ui/card";
import { Label } from "./../ui/label";
import { Input } from "./../ui/input";
import { Button, buttonVariants } from "./../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../ui/dialog";
import { Checkbox } from "./../ui/checkbox";
import axios, { Axios, AxiosError } from "axios";
import { boolean, number, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { BookOpen, MapPinned, ShowerHead } from "lucide-react";
import { cn } from "./../../lib/utils";
import { Textarea } from "./../ui/textarea";
import { useSearchParams } from "next/navigation";

const createPropertyAddressSchema = z.object({
  address_line_1: z.string().min(1, "Address line 1 is required"),
  address_line_2: z.string().min(1, "Address line 2 is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  landmark: z.string(),
  zip_code: z.number().min(1, "Zipcode is required"),
});

type Inputs = {
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  landmark: string;
  zip_code: number;
};

type Props = {
  onPrevious: () => void;
  onNext: () => void;
};

export default function PropertyAddress({ onNext, onPrevious }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currenStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const userId = useSearchParams().get("userId");
  const accessToken = useSearchParams().get("auth");

  const form = useForm<Inputs>({
    defaultValues: {
      address_line_1: "",
      address_line_2: "",
      country: "",
      state: "",
      city: "",
      landmark: "",
      zip_code: 0,
    },
    resolver: zodResolver(createPropertyAddressSchema),
  });

  const { register, control, handleSubmit, formState } = form;
  const {
    errors: {
      address_line_1: addressLine1Error,
      address_line_2: addressLine2Error,
      country: countryError,
      state: stateError,
      city: cityError,
      landmark: landmarkError,
      zip_code: zipCodeError,
    },
  } = formState;

  useEffect(() => {
    addressLine1Error && toast.error(addressLine1Error.message!);
    addressLine2Error && toast.error(addressLine2Error.message!);
    countryError && toast.error(countryError.message!);
    stateError && toast.error(stateError.message!);
    cityError && toast.error(cityError.message!);
    landmarkError && toast.error(landmarkError.message!);
    zipCodeError && toast.error(zipCodeError.message!);
  }, [
    addressLine1Error,
    addressLine2Error,
    countryError,
    stateError,
    cityError,
    landmarkError,
    zipCodeError,
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    /**
    const currentFormStep = steps.filter(
      (step) => step.id === currenStep + 1
    )[0];

    const imageUrls = propertyImageUrls.map(
      (propertyImage) => propertyImage.url
    );

    const propertyCreateBody = {
      ...data,
      user_id: userId,
      image: imageUrls,
    };

    setFormLoading(true);
     */

    try {
      /**
      const { data: propertyCreateResponse } = await axios.post(
        `${currentFormStep.api}`,
        propertyCreateBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(propertyCreateResponse);
      setFormLoading(false);
       */
      onNext();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormLoading(false);
        toast.error(err?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <CardTitle>Property Address</CardTitle>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="address_line_1">Address Line 1</Label>
            <Input
              id="address_line_1"
              // {...register("address_line_1")}
              size={"md"}
              type="text"
              variant={addressLine1Error && "error"}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="address_line_2">Address Line 2</Label>
            <Input
              id="address_line_2"
              size={"md"}
              variant={addressLine2Error && "error"}
              // {...register("property_email")}
              type="email"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              size={"md"}
              variant={cityError && "error"}
              // {...register("property_contact")}
              type="text"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="state">State</Label>
            <Input
              variant={stateError && "error"}
              id="state"
              // {...register("property_code")}
              type="text"
              size={"md"}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              size={"md"}
              variant={countryError && "error"}
              // {...register("property_contact")}
              type="text"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="landmark">Landmark</Label>
            <Input
              variant={landmarkError && "error"}
              id="landmark"
              // {...register("property_code")}
              type="text"
              size={"md"}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <Label htmlFor="zip_code">Zip Code</Label>
            <Input
              size={"md"}
              id="zip_code"
              type="text"
              variant={zipCodeError && "error"}
              // {...register("star_rating")}
            />
          </div>
          <div className="self-end gap-2 flex w-full">
            <Button
              className="w-[200px]"
              onClick={onPrevious}
              variant={"secondary"}
              type="button"
            >
              Back
            </Button>
            <Button className="w-[200px]" onClick={onNext} type="button">
              Next
            </Button>
            {/* <SubmitButton content="Next" loading={formLoading} /> */}
          </div>
        </div>
      </form>
    </>
  );
}
