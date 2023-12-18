"use client";
import React from "react";
import Image from "next/image";

import {
  Card as NextUICard,
  CardFooter as NextUICardFooter,
  Button as NextUIButton,
  Tooltip,
} from "@nextui-org/react";

type Props = {
  sliderContentCount?: number;
};

export default function PropertySlide({ sliderContentCount = 4 }: Props) {
  return (
    <>
      <NextUICard
        isFooterBlurred
        radius="lg"
        className="border-none min-w-max "
      >
        <Image
          src="/assets/Dummy-prop-img.jpg"
          height={300}
          width={300}
          className="object-cover"
          alt="Property"
        />
        <NextUICardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div>
            <p className="text-tiny text-white/80">Gotham Hotel</p>
            <p></p>
          </div>
          <NextUIButton
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            View
          </NextUIButton>
        </NextUICardFooter>
      </NextUICard>
      <NextUICard isFooterBlurred radius="lg" className="border-none min-w-max">
        <Image
          src="/assets/Dummy-prop-img.jpg"
          height={300}
          width={300}
          className="object-cover"
          alt="Property"
        />
        <NextUICardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Marriott</p>
          <NextUIButton
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            View
          </NextUIButton>
        </NextUICardFooter>
      </NextUICard>
      <NextUICard isFooterBlurred radius="lg" className="border-none min-w-max">
        <Image
          src="/assets/Dummy-prop-img.jpg"
          height={300}
          width={300}
          className="object-cover"
          alt="Property"
        />
        <NextUICardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Ritz Plaza Hotel</p>
          <NextUIButton
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            View
          </NextUIButton>
        </NextUICardFooter>
      </NextUICard>
      <NextUICard isFooterBlurred radius="lg" className="border-none min-w-max">
        <Image
          src="/assets/Dummy-prop-img.jpg"
          height={300}
          width={300}
          className="object-cover"
          alt="Property"
        />
        <NextUICardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Ritz Plaza Hotel</p>
          <NextUIButton
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            View
          </NextUIButton>
        </NextUICardFooter>
      </NextUICard>
    </>
  );
}
