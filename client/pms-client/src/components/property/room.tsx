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
  SelectLabel,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RootState, useSelector } from "../../redux/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./../ui/accordion";

const BedType = z.enum(["single", "double", "king", "twin", "queen"]);

const RoomAmenities = z.object({
  bed: BedType,
  bathroom: z.boolean(),
  towels: z.boolean(),
  linensBedding: z.boolean(),
});

const FurnitureAmenities = z.object({
  tableChairs: z.boolean(),
  desk: z.boolean(),
  dresserWardrobe: z.boolean(),
  sofaSeating: z.boolean(),
});

const TechnologyAmenities = z.object({
  television: z.boolean(),
  telephone: z.boolean(),
  wifiInternet: z.boolean(),
});

const ClimateControlAmenities = z.object({
  airConditioning: z.boolean(),
  heating: z.boolean(),
});

const KitchenetteMiniBarAmenities = z.object({
  smallRefrigerator: z.boolean(),
  microwave: z.boolean(),
  coffeeMaker: z.boolean(),
});

const SafetySecurityAmenities = z.object({
  safe: z.boolean(),
  smokeDetectors: z.boolean(),
  fireExtinguisher: z.boolean(),
});

const ToiletriesAmenities = z.object({
  shampooConditioner: z.boolean(),
  soap: z.boolean(),
  hairdryer: z.boolean(),
});

const ViewAmenities = z.object({
  view: z.boolean(),
});

const WorkLeisureAmenities = z.object({
  workDesk: z.boolean(),
  readingChair: z.boolean(),
  additionalLighting: z.boolean(),
});

const AccessibilityFeaturesAmenities = z.object({
  accessibleBathroom: z.boolean(),
  wheelchairAccessibility: z.boolean(),
});

const roomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  type: z.string().min(1, "Room type is required"),
  price: z.number().min(1, "Room price is required"),
  available: z.boolean(),
  capacity: z.number().min(1, "Room capacity is required"),
  basic: RoomAmenities,
  furniture: FurnitureAmenities,
  technology: TechnologyAmenities,
  climateControl: ClimateControlAmenities,
  kitchenetteMiniBar: KitchenetteMiniBarAmenities,
  safetySecurity: SafetySecurityAmenities,
  toiletries: ToiletriesAmenities,
  view: ViewAmenities,
  workLeisure: WorkLeisureAmenities,
  accessibilityFeatures: AccessibilityFeaturesAmenities,
  description: z.string(),
});

type Inputs = {
  name: string;
  type: string;
  price: number;
  available: boolean;
  capacity: number;
  bed: "single" | "double" | "king" | "twin" | "queen";
  bathroom: boolean;
  towels: boolean;
  linensBedding: boolean;
  tableChairs: boolean;
  desk: boolean;
  dresserWardrobe: boolean;
  sofaSeating: boolean;
  television: boolean;
  telephone: boolean;
  wifiInternet: boolean;
  airConditioning: boolean;
  heating: boolean;
  smallRefrigerator: boolean;
  microwave: boolean;
  coffeeMaker: boolean;
  safe: boolean;
  smokeDetectors: boolean;
  fireExtinguisher: boolean;
  shampooConditioner: boolean;
  soap: boolean;
  hairdryer: boolean;
  view: boolean;
  workDesk: boolean;
  readingChair: boolean;
  additionalLighting: boolean;
  accessibleBathroom: boolean;
  wheelchairAccessibility: boolean;
  description: string;
};

type Props = {
  onPrevious: () => void;
  onNext: () => void;
};

export default function Rooms({ onNext, onPrevious }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currenStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const property_id = useSearchParams().get("property_id");
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      type: "",
      price: 0,
      available: false,
      capacity: 0,
      bed: "single",
      bathroom: false,
      towels: false,
      linensBedding: false,
      tableChairs: false,
      desk: false,
      dresserWardrobe: false,
      sofaSeating: false,
      television: false,
      telephone: false,
      wifiInternet: false,
      airConditioning: false,
      heating: false,
      smallRefrigerator: false,
      microwave: false,
      coffeeMaker: false,
      safe: false,
      smokeDetectors: false,
      fireExtinguisher: false,
      shampooConditioner: false,
      soap: false,
      hairdryer: false,
      view: false,
      workDesk: false,
      readingChair: false,
      additionalLighting: false,
      accessibleBathroom: false,
      wheelchairAccessibility: false,
      description: "",
    },
    resolver: zodResolver(roomSchema),
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
    console.log({ addressData: data });

    const propertyCreateBody = {
      ...data,
      propertyInfo: property_id,
    };

    setFormLoading(true);

    try {
      const {
        data: { data: propertyAddressCreateResponse },
      } = await axios.post(
        `http://localhost:8040/api/v1/property/address`,
        propertyCreateBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(propertyAddressCreateResponse);
      setFormLoading(false);

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
        <CardTitle>Rooms</CardTitle>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              size={"md"}
              type="text"
              variant={addressLine1Error && "error"}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              size={"md"}
              variant={addressLine2Error && "error"}
              {...register("type")}
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              size={"md"}
              variant={cityError && "error"}
              {...register("price")}
              type="number"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              // variant={capacityError && "error"}
              id="capacity"
              {...register("capacity")}
              type="number"
              size={"md"}
            />
          </div>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="amenity-1">
                <AccordionTrigger>Room Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <Label>Bed Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bed type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Bed Type</SelectLabel>
                        {["single", "double", "king", "twin", "queen"]?.map(
                          (item) => (
                            <SelectItem value={item}>
                              {item.charAt(0).toUpperCase() + item.substring(1)}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bathroom" {...register("bathroom")} />
                      <label
                        htmlFor="bathroom"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Bathroom
                      </label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="towels" {...register("towels")} />
                        <label
                          htmlFor="towels"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Towels
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="linensBedding"
                          {...register("linensBedding")}
                        />
                        <label
                          htmlFor="linensBedding"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Linens Bedding
                        </label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-2">
                <AccordionTrigger>Furniture Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tableChairs" {...register("tableChairs")} />
                      <Label
                        htmlFor="tableChairs"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Table Chairs
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desk" {...register("desk")} />
                      <Label
                        htmlFor="desk"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Desk
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dresserWardrobe"
                        {...register("dresserWardrobe")}
                      />
                      <Label
                        htmlFor="dresserWardrobe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Dresser Wardrobe
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sofaSeating" {...register("sofaSeating")} />
                      <Label
                        htmlFor="sofaSeating"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sofa Seating
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-3">
                <AccordionTrigger>Technology Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="television" {...register("television")} />
                      <Label
                        htmlFor="television"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Television
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="telephone" {...register("telephone")} />
                      <Label
                        htmlFor="telephone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Telephone
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wifiInternet"
                        {...register("wifiInternet")}
                      />
                      <Label
                        htmlFor="wifiInternet"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Wifi Internet
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-4">
                <AccordionTrigger>Climate Control Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airConditioning"
                        {...register("airConditioning")}
                      />
                      <Label
                        htmlFor="airConditioning"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Air Conditioning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="heating" {...register("heating")} />
                      <Label
                        htmlFor="heating"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Heating
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-5">
                <AccordionTrigger>
                  Kitchenette MiniBar Amenities
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smallRefrigerator"
                        {...register("smallRefrigerator")}
                      />
                      <Label
                        htmlFor="smallRefrigerator"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Small Refrigerator
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="microwave" {...register("microwave")} />
                      <Label
                        htmlFor="microwave"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Microwave
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="coffeeMaker" {...register("coffeeMaker")} />
                      <Label
                        htmlFor="coffeeMaker"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Coffee Maker
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-6">
                <AccordionTrigger>Security Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="safe" {...register("safe")} />
                      <Label
                        htmlFor="safe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Safe
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smokeDetectors"
                        {...register("smokeDetectors")}
                      />
                      <Label
                        htmlFor="smokeDetectors"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Smoke Detectors
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fireExtinguisher"
                        {...register("fireExtinguisher")}
                      />
                      <Label
                        htmlFor="fireExtinguisher"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fire Extinguisher
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-7">
                <AccordionTrigger>Toiletries Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="shampooConditioner"
                        {...register("shampooConditioner")}
                      />
                      <Label
                        htmlFor="shampooConditioner"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Shampoo Conditioner
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="soap" {...register("soap")} />
                      <Label
                        htmlFor="soap"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Soap
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hairdryer" {...register("hairdryer")} />
                      <Label
                        htmlFor="hairdryer"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hair Dryer
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-8">
                <AccordionTrigger>View Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="view" {...register("view")} />
                      <Label
                        htmlFor="view"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        View
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-9">
                <AccordionTrigger>Work Leisure Amenities</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="workDesk" {...register("workDesk")} />
                      <Label
                        htmlFor="workDesk"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Work Desk
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="readingChair"
                        {...register("readingChair")}
                      />
                      <Label
                        htmlFor="readingChair"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Reading Chair
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="additionalLighting"
                        {...register("additionalLighting")}
                      />
                      <Label
                        htmlFor="additionalLighting"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Additional Lighting
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="amenity-10">
                <AccordionTrigger>
                  Accessibility Features Amenities
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="accessibleBathroom"
                        {...register("accessibleBathroom")}
                      />
                      <Label
                        htmlFor="accessibleBathroom"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accessible Bathroom
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wheelchairAccessibility"
                        {...register("wheelchairAccessibility")}
                      />
                      <Label
                        htmlFor="wheelchairAccessibility"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Wheelchair Accessibility
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="additionalLighting"
                        {...register("additionalLighting")}
                      />
                      <Label
                        htmlFor="additionalLighting"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Additional Lighting
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
            {/* <Button className="w-[200px]" type="submit">
              Next
            </Button> */}
            {/* <SubmitButton content="Next" loading={formLoading} /> */}
          </div>
        </div>
      </form>
    </>
  );
}
