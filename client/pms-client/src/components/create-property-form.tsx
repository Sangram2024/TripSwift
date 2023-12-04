"use client";

import React, { useCallback, useState } from "react";
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
import axios from "axios";

type Props = {};

interface IFileWithPreview extends File {
  preview: string;
}

export default function CreatePropertyForm({}: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="h-screen w-screen grid place-content-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <form>
          <CardContent className="space-y-2">
            <div>
              <Label htmlFor="property_name">Property Name</Label>
              <Input
                id="property_name"
                name="property_name"
                size={"md"}
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="property_email">Property Email</Label>
              <Input
                id="property_email"
                size={"md"}
                name="property_email"
                type="email"
              />
            </div>
            <div>
              <Label htmlFor="property_contact">Property Contact</Label>
              <Input
                id="property_contact"
                size={"md"}
                name="property_contact"
                type="text"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-1/2">
                <Label htmlFor="property_star_rating">Star Rating</Label>
                <Select
                  name="property_star_rating"
                  onValueChange={(value) => value}
                >
                  <SelectTrigger size="md">
                    <SelectValue placeholder="Star Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Label htmlFor="property_code">Property Code</Label>
                <Input id="property_code" name="property_code" type="text" />
              </div>
            </div>
            <UploadPropertyImages open={openDialog} setOpen={setOpenDialog} />
          </CardContent>
          <CardFooter>
            <SubmitButton content="Next" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function UploadPropertyImages({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [files, setFiles] = useState<IFileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

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
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
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
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const uploadRes = await axios.post(
        "http://localhost:4000/api/v1/upload",
        {
          file: files,
        }
      );
      console.log(uploadRes);
    } catch (err) {
      console.log(err);
    }
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
        <form onSubmit={handleFileUpload}>
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
            <SubmitButton content="Upload" />
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

function SubmitButton({ content }: { content: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="ml-auto w-full" disabled={pending}>
      {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : content}
    </Button>
  );
}
