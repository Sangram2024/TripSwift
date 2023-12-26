"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card";
import { Label } from "./../ui/label";
import { Input } from "./../ui/input";
import { Button, buttonVariants } from "./../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../ui/dialog";
import Dropzone from "../dropzone";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import axios, { Axios, AxiosError } from "axios";
import { boolean, number, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cn } from "./../../lib/utils";
import { Textarea } from "./../ui/textarea";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RootState, useSelector } from "../../redux/store";

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

interface IFileWithPreview extends File {
  preview: string;
}

type Props = {
  onNext: () => void;
};

export default function PropertyInfo({ onNext }: Props) {
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

  const { accessToken, user } = useSelector(
    (state: RootState) => state.authReducer
  );
  const router = useRouter();
  const pathname = usePathname();

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
    const imageUrls = propertyImageUrls.map(
      (propertyImage) => propertyImage.url
    );

    const propertyCreateBody = {
      ...data,
      image: imageUrls,
    };

    setFormLoading(true);

    try {
      const {
        data: { data: newPropertyInfo },
      } = await axios.post(
        `http://localhost:8040/api/v1/property`,
        propertyCreateBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      router.push(`${pathname}?property_id=${newPropertyInfo?._id}`);
      setFormLoading(false);

      onNext();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormLoading(false);
        toast.error(err?.response?.data?.message);
      }
    }
  };

  const packFiles = (files: IFileWithPreview[]) => {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <CardTitle>Property Details</CardTitle>
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
            <Button className="w-[200px]" type="submit">
              Next
            </Button>
            {/* <Button className="w-[200px]" type="button" onClick={onNext}>
              Next
            </Button> */}
            {/* <SubmitButton content="Next" loading={formLoading} /> */}
          </div>
        </div>
      </form>
    </>
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
                  key={`${JSON.stringify(file) + i}`}
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
