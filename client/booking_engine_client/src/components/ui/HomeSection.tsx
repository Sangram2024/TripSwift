import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Newsletter from "./NewsLetter";
import Link from "next/link";


export default function HomeSection() {
  const galleryLength = 6;
  const images = [];
  // Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const destinationType = [
  "Adventure Destination",
  "Beach Resort",
  "Cultural City",
  "Hotel",
  "Mountain Retreat",
  "Urban Metropolis",
  "Wildlife Safari"
];

// Shuffle the array of destination types
shuffleArray(destinationType);

for (let i = 1; i <= galleryLength; i++) {
  const currentDestination = destinationType[i - 1];

  images.push({
    img: require(`../assets/hotel-${i}.jpg`).default,
    title: `${currentDestination} ${i}`,
    price: `$100${i}.00`,
    destination_type: currentDestination,
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
      <div className="gap-2 grid grid-cols-2 mx-44 rounded-xl shadow-2xl p-14 mt-4 sm:grid-cols-3">
        {images.map((item, index) => (
          <div key={index}>
                  <Link  href={`/destination?destination=${item.destination_type}`} passHref>

            <h3 className="text-xl font-semibold mb-2">{item.destination_type}</h3>
            <Card shadow="sm">
              <CardBody className="p-0">
                <Image alt={item.title} className="h-[240px]" src={item.img} />
              </CardBody>
            </Card>
            </Link>

          </div>
        ))}
      </div>
     
      <div>
        <Newsletter />
      </div>
    </>
  );
}
