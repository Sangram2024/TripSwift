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
import { ScrollArea } from "./../ui/scrollarea";

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
  price: z.string().min(1, "Room price is required"),
  available: z.boolean(),
  capacity: z.string().min(1, "Room capacity is required"),
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
  price: string;
  available: boolean;
  capacity: string;
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
      price: "0",
      available: true,
      capacity: "0",
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
    // resolver: zodResolver(roomSchema),
  });

  const { register, control, handleSubmit, setValue, formState } = form;
  const {
    errors: {
      name: nameError,
      type: typeError,
      price: priceError,
      capacity: capacityError,
    },
  } = formState;

  useEffect(() => {
    nameError && toast.error(nameError.message!);
    typeError && toast.error(typeError.message!);
    priceError && toast.error(priceError.message!);
    capacityError && toast.error(capacityError.message!);
  }, [nameError, typeError, priceError, capacityError]);

  useEffect(() => {
    console.log({ errors: formState.errors });
  }, [formState.errors]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const roomBody = {
      ...data,
      propertyInfo_id: property_id,
    };

    setFormLoading(true);

    try {
      const {
        data: { data: newRoom },
      } = await axios.post(`http://localhost:8040/api/v1/room`, roomBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log({ newRoom });
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
            <Input id="name" {...register("name")} size={"md"} type="text" />
          </div>
          <div className="w-full">
            <Label htmlFor="type">Type</Label>
            <Input id="type" size={"md"} {...register("type")} type="text" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              size={"md"}
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
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <ScrollArea className="h-72 w-full">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="amenity-1">
                  <AccordionTrigger>Room Amenities</AccordionTrigger>
                  <AccordionContent className="flex gap-4 items-center justify-between">
                    <div className="w-full">
                      <Label>Bed Type</Label>
                      <Select
                        onValueChange={(value) => setValue("bed", value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bed type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["single", "double", "king", "twin", "queen"]?.map(
                            (item, index) => (
                              <SelectItem key={`${item + index}`} value={item}>
                                {item.charAt(0).toUpperCase() +
                                  item.substring(1)}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bathroom"
                          {...register("bathroom")}
                          onCheckedChange={(value: boolean) =>
                            setValue("bathroom", value)
                          }
                        />
                        <label
                          htmlFor="bathroom"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Bathroom
                        </label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="towels"
                            {...register("towels")}
                            onCheckedChange={(value: boolean) =>
                              setValue("towels", value)
                            }
                          />
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
                            onCheckedChange={(value: boolean) =>
                              setValue("linensBedding", value)
                            }
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
                        <Checkbox
                          id="tableChairs"
                          {...register("tableChairs")}
                          onCheckedChange={(value: boolean) =>
                            setValue("tableChairs", value)
                          }
                        />
                        <Label
                          htmlFor="tableChairs"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Table Chairs
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="desk"
                          {...register("desk")}
                          onCheckedChange={(value: boolean) =>
                            setValue("desk", value)
                          }
                        />
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
                          onCheckedChange={(value: boolean) =>
                            setValue("dresserWardrobe", value)
                          }
                        />
                        <Label
                          htmlFor="dresserWardrobe"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Dresser Wardrobe
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sofaSeating"
                          {...register("sofaSeating")}
                          onCheckedChange={(value: boolean) =>
                            setValue("sofaSeating", value)
                          }
                        />
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
                        <Checkbox
                          id="television"
                          {...register("television")}
                          onCheckedChange={(value: boolean) =>
                            setValue("television", value)
                          }
                        />
                        <Label
                          htmlFor="television"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Television
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="telephone"
                          {...register("telephone")}
                          onCheckedChange={(value: boolean) =>
                            setValue("telephone", value)
                          }
                        />
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
                          onCheckedChange={(value: boolean) =>
                            setValue("wifiInternet", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("airConditioning", value)
                          }
                        />
                        <Label
                          htmlFor="airConditioning"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Air Conditioning
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="heating"
                          {...register("heating")}
                          onCheckedChange={(value: boolean) =>
                            setValue("heating", value)
                          }
                        />
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
                          onCheckedChange={(value: boolean) =>
                            setValue("smallRefrigerator", value)
                          }
                        />
                        <Label
                          htmlFor="smallRefrigerator"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Small Refrigerator
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="microwave"
                          {...register("microwave")}
                          onCheckedChange={(value: boolean) =>
                            setValue("microwave", value)
                          }
                        />
                        <Label
                          htmlFor="microwave"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Microwave
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="coffeeMaker"
                          {...register("coffeeMaker")}
                          onCheckedChange={(value: boolean) =>
                            setValue("coffeeMaker", value)
                          }
                        />
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
                        <Checkbox
                          id="safe"
                          {...register("safe")}
                          onCheckedChange={(value: boolean) =>
                            setValue("safe", value)
                          }
                        />
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
                          onCheckedChange={(value: boolean) =>
                            setValue("smokeDetectors", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("fireExtinguisher", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("shampooConditioner", value)
                          }
                        />
                        <Label
                          htmlFor="shampooConditioner"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Shampoo Conditioner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="soap"
                          {...register("soap")}
                          onCheckedChange={(value: boolean) =>
                            setValue("soap", value)
                          }
                        />
                        <Label
                          htmlFor="soap"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Soap
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hairdryer"
                          {...register("hairdryer")}
                          onCheckedChange={(value: boolean) =>
                            setValue("hairdryer", value)
                          }
                        />
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
                        <Checkbox
                          id="view"
                          {...register("view")}
                          onCheckedChange={(value: boolean) =>
                            setValue("view", value)
                          }
                        />
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
                        <Checkbox
                          id="workDesk"
                          {...register("workDesk")}
                          onCheckedChange={(value: boolean) =>
                            setValue("workDesk", value)
                          }
                        />
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
                          onCheckedChange={(value: boolean) =>
                            setValue("readingChair", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("additionalLighting", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("accessibleBathroom", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("wheelchairAccessibility", value)
                          }
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
                          onCheckedChange={(value: boolean) =>
                            setValue("additionalLighting", value)
                          }
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
            </ScrollArea>
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
              Next
            </Button>
            {/* <SubmitButton content="Next" loading={formLoading} /> */}
          </div>
        </div>
      </form>
    </>
  );
}
