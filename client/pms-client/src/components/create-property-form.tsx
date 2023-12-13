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
import Dropzone from "./dropzone";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import axios, { Axios, AxiosError } from "axios";
import { boolean, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { BookOpen, MapPinned, ShowerHead } from "lucide-react";
import { cn } from "../lib/utils";
import { Textarea } from "./../components/ui/textarea";
import { useSearchParams } from "next/navigation";

type Props = {};

interface IFileWithPreview extends File {
  preview: string;
}

const createPropertySchema = z.object({
  property_name: z.string().min(1, "Property name is required"),
  property_email: z
    .string()
    .min(1, "Property email is required")
    .email("Please provide a valid email address"),
  property_contact: z.string().min(1, "Property contact is reuqired"),
  star_rating: z.string().default("1"),
  property_code: z.string().min(1, "Property code is required"),
  description: z.string().min(1, "Description is required"),
});

type Inputs = {
  property_name: string;
  property_email: string;
  property_contact: string;
  star_rating: string;
  property_code: string;
  description: string;
};

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
  const [propertyImageUrls, setPropertyImageUrls] = useState<
    {
      public_id: string;
      url: string;
      secure_url: string;
    }[]
  >([]);

  const [propertyImagePreviewDialog, setPropertyImagePreviewDialog] =
    useState(false);

  const [files, setFiles] = useState<IFileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

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

  const form = useForm<Inputs>({
    defaultValues: {
      property_name: "",
      property_email: "",
      property_contact: "",
      star_rating: "1",
      property_code: "",
      description: "",
    },
    resolver: zodResolver(createPropertySchema),
  });

  const { register, control, handleSubmit, formState } = form;
  const {
    errors: {
      property_email: propertyEmailError,
      property_name: propertyNameError,
      property_contact: propertyContactError,
      star_rating: starRatingError,
      property_code: propertyCodeError,
    },
  } = formState;

  useEffect(() => {
    propertyEmailError && toast.error(propertyEmailError.message!);
    propertyNameError && toast.error(propertyNameError.message!);
    propertyContactError && toast.error(propertyContactError.message!);
    starRatingError && toast.error(starRatingError.message!);
    propertyCodeError && toast.error(propertyCodeError.message!);
  }, [
    propertyEmailError,
    propertyNameError,
    propertyContactError,
    starRatingError,
    propertyCodeError,
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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

    try {
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
      next();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormLoading(false);
        toast.error(err?.response?.data?.message);
      }
    }
  };

  const packFiles = (files) => {
    const data = new FormData();

    [...files].forEach((file, i) => {
      data.append(`file`, file, file.name);
    });
    return data;
  };

  const handlePropertyImageUpload = async () => {
    if (files.length) {
      const data = packFiles(files);

      const {
        data: {
          data: { urls },
        },
      } = await axios.post("http://localhost:8040/api/v1/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpenDialog(false);
      setPropertyImageUrls(urls);
    }
  };

  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="w-[80vw] flex items-center justify-center gap-20">
        <CreateFormSteps currentStep={currenStep} step={steps} />
        <div className="w-[60%]">
          {currenStep === 0 ? (
            <>
              <CardTitle>Property Details</CardTitle>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-6"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="w-full">
                    <Label htmlFor="property_name">Property Name</Label>
                    <Input
                      id="property_name"
                      {...register("property_name")}
                      size={"md"}
                      type="text"
                      variant={propertyNameError && "error"}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="property_email">Property Email</Label>
                    <Input
                      id="property_email"
                      size={"md"}
                      variant={propertyEmailError && "error"}
                      {...register("property_email")}
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-full">
                    <Label htmlFor="property_contact">Property Contact</Label>
                    <Input
                      id="property_contact"
                      size={"md"}
                      variant={propertyContactError && "error"}
                      {...register("property_contact")}
                      type="text"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="property_code">Property Code</Label>
                    <Input
                      variant={propertyCodeError && "error"}
                      id="property_code"
                      {...register("property_code")}
                      type="text"
                      size={"md"}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-full">
                    <Label htmlFor="description">Property Description</Label>
                    <Textarea
                      id="description"
                      // variant={propertyContactError && "error"}
                      {...register("description")}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1/2">
                    <Label htmlFor="property_star_rating">Star Rating</Label>
                    <Input
                      size={"md"}
                      id="property_star_rating"
                      type="text"
                      variant={starRatingError && "error"}
                      {...register("star_rating")}
                    />
                  </div>
                  <div className="self-end">
                    {propertyImageUrls?.length ? (
                      <PreviewPropertyImages
                        open={propertyImagePreviewDialog}
                        setOpen={setPropertyImagePreviewDialog}
                        files={propertyImageUrls}
                      />
                    ) : (
                      <UploadPropertyImages
                        files={files}
                        setFiles={setFiles}
                        rejected={rejected}
                        loading={loading}
                        setLoading={setLoading}
                        setRejected={setRejected}
                        open={openDialog}
                        setOpen={setOpenDialog}
                        handlePropertyImageUpload={handlePropertyImageUpload}
                      />
                    )}
                  </div>
                  <div className="self-end w-full">
                    <SubmitButton content="Next" loading={formLoading} />
                  </div>
                </div>
              </form>
            </>
          ) : currenStep === 1 ? (
            <>
              <h1>Step 2</h1>
            </>
          ) : currenStep === 2 ? (
            <>
              <h1>Step 3</h1>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function UploadPropertyImages({
  files,
  setFiles,
  rejected,
  setRejected,
  loading,
  setLoading,
  open,
  setOpen,
  handlePropertyImageUpload,
}: {
  open: boolean;
  files: IFileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<IFileWithPreview[]>>;
  rejected: any;
  setRejected: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePropertyImageUpload: any;
}) {
  // const [propertyImageState, uploadPropertyImagesAction] = useFormState(
  //   uploadPropertyImages,
  //   null
  // );

  const uploadPropertyImagesFiles = uploadPropertyImages.bind(null, files);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles: any) => [
          // If allowing multiple files
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles: any) => [
          ...previousFiles,
          ...rejectedFiles,
        ]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((files: any) =>
      files.filter(({ file }: { file: any }) => file.name !== name)
    );
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handlePropertyImageUpload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Add property images
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Property Images</DialogTitle>
          <DialogDescription>
            Add your property images, which will be visible to the end user.
          </DialogDescription>
        </DialogHeader>
        <form>
          <Dropzone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
          <div className="mt-4 flex items-center justify-center">
            <Button
              type="button"
              className="mr-2 w-2/5"
              onClick={() => setOpen(false)}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={(e: any) => handleFileUpload(e)}
              className="w-[200px]"
              disabled={loading}
            >
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              {!files.length
                ? "No preview available"
                : files?.map((file) => (
                    <Image
                      key={file?.name}
                      src={file?.preview}
                      height={100}
                      width={100}
                      alt=""
                    />
                  ))}
            </CardContent>
          </Card>
        </div>
        {/* <form
          action={uploadPropertyImagesAction}
          encType="multipart/form-data"
          method="POST"
        >
          <div>
            <Label htmlFor="file">Select images</Label>
            <Input type="file" id="file" name="file" multiple />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Button
              type="button"
              className="mr-2 w-2/5"
              onClick={() => setOpen(false)}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <SubmitButton content="Upload" />
          </div>
        </form> */}
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton({
  content,
  loading,
}: {
  content: string;
  loading: boolean;
}) {
  return (
    <Button type="submit" className="w-[200px]" disabled={loading}>
      {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : content}
    </Button>
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

function PreviewPropertyImages({
  open,
  setOpen,
  files,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  files: {
    public_id: string;
    url: string;
    secure_url: string;
  }[];
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
        })}
      >
        property images
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Property Images</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          {!files.length
            ? "No preview available"
            : files?.map((file, i) => (
                <div
                  onClick={() => setCurrentImage(i)}
                  className="rounded-md cursor-pointer overflow-hidden"
                >
                  <Image
                    key={file?.public_id}
                    src={file?.url}
                    height={60}
                    width={60}
                    alt=""
                  />
                </div>
              ))}
        </div>
        <div className="rounded-md min-h-[250px] max-h-[350px] overflow-hidden">
          <Image
            key={files[currentImage]?.public_id}
            src={files[currentImage]?.url}
            className={cn(
              "duration-700 ease-in-out",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setIsLoading(false)}
            height={500}
            width={500}
            alt=""
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
