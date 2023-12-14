import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Newsletter from "./NewsLetter";

export default function HomeSection() {
  const galleryLength = 6;
  const images = [];

  for (let i = 1; i <= galleryLength; i++) {
    images.push({
      img: require(`../assets/hotel-${i}.jpg`).default,
      title: `Hotel ${i}`,
      price: `$100${i}.00`,
    });
  }

  return (
    <>
      <div className=" flex justify-center mt-32 items-center">
        <p className="text-gray-300">SIMPLY AMAZING PLACES</p>
        <br />
      </div>
      <h1 className="flex justify-center mt-2 text-5xl">
        Popular destination in
        <span className="ml-2 bg-gradient-to-r from-orange-600  via-white to-green-500 text-transparent bg-clip-text">
          India
        </span>
      </h1>
      <div className="gap-2 grid grid-cols-2 mx-44   rounded-xl shadow-2xl p-14 mt-4 sm:grid-cols-3">
        {images.map((item, index) => (
          <Card shadow="sm" key={index}>
            <CardBody className=" p-0 ">
              <Image
                alt={item.title}
                className=" h-[240px] "
                src={item.img}
              />
            </CardBody>
            {/* <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter> */}
          </Card>
        ))}
      </div>
      <div>
        <Newsletter />
      </div>
    </>
  );
}
