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
import { useRouter, useSearchParams } from "next/navigation";
import { RootState, useSelector } from "../../redux/store";

const createPropertyAmenitiesSchema = z.object({
  destination_type: z.string().min(1, "Destination type is required"),
  property_type: z.string().min(1, "Property type is required"),
  no_of_rooms_available: z.string().min(1, "No of rooms is required"),
  wifi: z.boolean(),
  swimming_pool: z.boolean(),
  fitness_center: z.boolean(),
  spa_and_wellness: z.boolean(),
  restaurant: z.boolean(),
  room_service: z.boolean(),
  bar_and_lounge: z.boolean(),
  parking: z.boolean(),
  concierge_services: z.boolean(),
  pet_friendly: z.boolean(),
  business_facilities: z.boolean(),
  laundry_services: z.boolean(),
  child_friendly_facilities: z.boolean(),
});

type Inputs = {
  destination_type: string;
  property_type: string;
  no_of_rooms_available: number;
  wifi: boolean;
  swimming_pool: boolean;
  fitness_center: boolean;
  spa_and_wellness: boolean;
  restaurant: boolean;
  room_service: boolean;
  bar_and_lounge: boolean;
  parking: boolean;
  concierge_services: boolean;
  pet_friendly: boolean;
  business_facilities: boolean;
  laundry_services: boolean;
  child_friendly_facilities: boolean;
};

type Props = {
  onPrevious: () => void;
  onNext: () => void;
};

export default function PropertyAddress({ onNext, onPrevious }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const property_id = useSearchParams().get("property_id");
  const router = useRouter();

  const form = useForm<Inputs>({
    defaultValues: {
      destination_type: "",
      property_type: "",
      no_of_rooms_available: 0,
      wifi: false,
      swimming_pool: false,
      fitness_center: false,
      spa_and_wellness: false,
      restaurant: false,
      room_service: false,
      bar_and_lounge: false,
      parking: false,
      concierge_services: false,
      pet_friendly: false,
      business_facilities: false,
      laundry_services: false,
      child_friendly_facilities: false,
    },
    resolver: zodResolver(createPropertyAmenitiesSchema),
  });

  const { register, control, handleSubmit, formState } = form;
  const {
    errors: {
      destination_type: destinationTypeError,
      property_type: propertyTypeError,
      no_of_rooms_available: noOfRoomsAvailableError,
    },
  } = formState;

  useEffect(() => {
    destinationTypeError && toast.error(destinationTypeError.message!);
    propertyTypeError && toast.error(propertyTypeError.message!);
    noOfRoomsAvailableError && toast.error(noOfRoomsAvailableError.message!);
  }, [destinationTypeError, propertyTypeError, noOfRoomsAvailableError]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const propertyCreateBody = {
      ...data,
      propertyInfo: property_id,
    };

    setFormLoading(true);

    try {
      const {
        data: { data: propertyAmenitiesCreateResponse },
      } = await axios.post(
        `http://localhost:8040/api/v1/property/amenities`,
        propertyCreateBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(propertyAmenitiesCreateResponse);
      setFormLoading(false);

      router.push("/property");
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
        <CardTitle>Property Amenities</CardTitle>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="Destination Type">Destination Type</Label>
            <Input
              id="Destination Type"
              {...register("destination_type")}
              size={"md"}
              type="text"
              variant={destinationTypeError && "error"}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="property_type">Property Type</Label>
            <Input
              id="property_type"
              size={"md"}
              variant={propertyTypeError && "error"}
              {...register("property_type")}
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="min-w-max">
            <Label htmlFor="no_of_rooms_available">No Of Rooms Available</Label>
            <Input
              id="no_of_rooms_available"
              size={"md"}
              variant={noOfRoomsAvailableError && "error"}
              {...register("no_of_rooms_available")}
              type="text"
            />
          </div>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Other Amenities</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Checkbox id="wifi" {...register("wifi")} />
              <label
                htmlFor="wifi"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wifi
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="swimming_pool" {...register("swimming_pool")} />
              <label
                htmlFor="swimming_pool"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Swimming Pool
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="fitness_center" {...register("fitness_center")} />
              <label
                htmlFor="fitness_center"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Fitness Center
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="spa_and_wellness"
                {...register("spa_and_wellness")}
              />
              <label
                htmlFor="spa_and_wellness"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Spa and Wellness
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="restaurant" {...register("restaurant")} />
              <label
                htmlFor="restaurant"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Restaurant
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="room_service" {...register("room_service")} />
              <label
                htmlFor="room_service"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Room Service
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="bar_and_lounge" {...register("bar_and_lounge")} />
              <label
                htmlFor="bar_and_lounge"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bar and Lounge
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="parking" {...register("parking")} />
              <label
                htmlFor="parking"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Parking
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="concierge_services"
                {...register("concierge_services")}
              />
              <label
                htmlFor="concierge_services"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Concierge Services
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pet_friendly" {...register("pet_friendly")} />
              <label
                htmlFor="pet_friendly"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pet Friendly
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="business_facilities"
                {...register("business_facilities")}
              />
              <label
                htmlFor="business_facilities"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Business Facilities
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="laundry_services"
                {...register("laundry_services")}
              />
              <label
                htmlFor="laundry_services"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Laundry Services
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="child_friendly_facilities"
                {...register("child_friendly_facilities")}
              />
              <label
                htmlFor="child_friendly_facilities"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Child Friendly Facilities
              </label>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-2">
          <div className="self-end gap-2 flex w-full">
            <Button
              className="w-[200px]"
              onClick={onPrevious}
              variant={"secondary"}
              type="button"
            >
              Back
            </Button>
            <Button className="w-[200px]" type="submit">
              Submit
            </Button>
            {/* <SubmitButton content="Next" loading={formLoading} /> */}
          </div>
        </div>
      </form>
    </>
  );
}
