"use client";
import React from "react";
import Image from "next/image";

import {
  Card as NextUICard,
  CardFooter as NextUICardFooter,
  Button as NextUIButton,
  Tooltip,
} from "@nextui-org/react";
import { store } from "../../redux/store";
import { Property } from "../../redux/slices/propertySlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  sliderContentCount?: number;
  properties: Property[];
};

export default function PropertySlide({
  sliderContentCount = 4,
  properties,
}: Props) {
  const router = useRouter();

  return (
    <>
      {properties?.map((property: Property, index: number) => (
        <PropertyCard
          key={`${property.property_email + index}`}
          property={property}
          action={(url: string) => router.push(url)}
        />
      ))}
    </>
  );
}

function PropertyCard({
  property,
  action,
}: {
  property: Property;
  action: (url: string) => void;
}) {
  return (
    <NextUICard isFooterBlurred radius="lg" className="border-none min-w-max ">
      <Image
        src={property?.image[0]}
        height={300}
        width={300}
        className="object-cover"
        alt="Property"
      />
      <NextUICardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div>
          <p className="text-tiny text-white/80">{property?.property_name}</p>
          <p></p>
        </div>
        <NextUIButton
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={() => action(`/property/${property._id}`)}
        >
          View
        </NextUIButton>
      </NextUICardFooter>
    </NextUICard>
  );
}
