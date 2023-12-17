"use client";

import React, {
  MouseEventHandler,
  ReactNode,
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
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormState, useFormStatus } from "react-dom";
import {
  createPropertyDetails,
  uploadPropertyImages,
} from "../actions/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import Dropzone from "./dropzone";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import axios, { Axios, AxiosError } from "axios";
import { boolean, number, unknown, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { BookOpen, MapPinned, ShowerHead } from "lucide-react";
import { cn } from "../lib/utils";
import { Textarea } from "./../components/ui/textarea";
import { useSearchParams } from "next/navigation";

import PropertyInfo from "./property/property-info";
import PropertyAddress from "./property/property-address";
import PropertyAmenities from "./property/property-amenities";

type Props = {};

const steps = [
  {
    id: 1,
    icon: <BookOpen size={20} />,
    name: "Property Information",
    description: "General property information",
    api: "http://localhost:8040/api/v1/property",
  },
  {
    id: 2,
    icon: <MapPinned size={20} />,
    name: "Property Address",
    description: "Location of property",
    api: "http://localhost:8040/api/v1/property/address",
  },
  {
    id: 3,
    icon: <ShowerHead size={20} />,
    name: "Property Amenities",
    description: "Amenities availabilty",
    api: "http://localhost:8040/api/v1/property/amenities",
  },
];

export default function CreatePropertyForm({}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currenStep, setCurrentStep] = useState(0);

  const userId = useSearchParams().get("userId");
  const accessToken = useSearchParams().get("auth");

  const next = () => {
    if (currenStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const previous = () => {
    if (currenStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const renderStepContent = () => {
    let Component: React.ReactNode = <>Not Step</>;
    switch (currenStep) {
      case 0:
        Component = <PropertyInfo onNext={next} />;
        break;
      case 1:
        Component = <PropertyAddress onNext={next} onPrevious={previous} />;
        break;
      case 2:
        Component = <PropertyAmenities onNext={next} onPrevious={previous} />;
      default:
        break;
    }

    return Component;
  };

  return (
    <div className="grid place-content-center">
      <div className="w-max flex items-center justify-center gap-20">
        <CreateFormSteps currentStep={currenStep} step={steps} />
        <div className="w-[60%]">{renderStepContent()}</div>
      </div>
    </div>
  );
}

function CreateFormSteps({
  step,
  currentStep,
}: {
  step: typeof steps;
  currentStep: number;
}) {
  function checkIfStepIsCompleted(step: number) {
    return step > currentStep;
  }

  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {step?.map((s) => (
        <li key={s.id} className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            {checkIfStepIsCompleted(s.id as unknown as number) ? (
              s.icon
            ) : (
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            )}
          </span>
          <h3 className="font-medium leading-tight">{s.name}</h3>
          <p className="text-sm">{s.description}</p>
        </li>
      ))}
      {/* <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
          <svg
            className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        </span>
        <h3 className="font-medium leading-tight">Personal Info</h3>
        <p className="text-sm">Step details here</p>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
          <svg
            className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
          </svg>
        </span>
        <h3 className="font-medium leading-tight">Account Info</h3>
        <p className="text-sm">Step details here</p>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
          <svg
            className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
        </span>
        <h3 className="font-medium leading-tight">Review</h3>
        <p className="text-sm">Step details here</p>
      </li>
      <li className="ms-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
          <svg
            className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
          </svg>
        </span>
        <h3 className="font-medium leading-tight">Confirmation</h3>
        <p className="text-sm">Step details here</p>
      </li> */}
    </ol>
  );
}
