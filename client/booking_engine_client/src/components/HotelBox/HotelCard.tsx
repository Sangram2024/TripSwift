"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import HeroImage from "../assets/hotel-1.jpg";
import DateRange from "./DateRange";
import GuestBox from "./GuestBox";

const HotelCard = ({}) => {
  const [capacity, setCapacity] = useState<number>(2);
  const [location, setLocation] = useState<string>("");

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:8030/api/search", {
        location: location,
        capacity,
      });
      console.log("API Response:", response.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <>
      <div className="sm:hidden md:block lg:block">
        <Image
          src={HeroImage}
          className="w-full object-cover h-[360px] opacity-90"
          alt="Picture of the author"
        />
      </div>
      <section className="border-2 lg:top-2/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl lg:p-10 sm:p-0">
        <div className="lg:flex justify-center sm:flex-row items-center lg:gap-7">
          <div className="rounded-md border-2">
            <input
              type="text"
              id="search"
              name="search"
              value={location}
              className="p-2 w-80 rounded-md focus:outline-none"
              placeholder="Search by city, hotel and location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="inline-block rounded-md border-2 w-[280px]">
            <DateRange />
          </div>
          <div className="inline-block rounded-md border-2 w-[200px]">
            <GuestBox />
          </div>
          <div>
            <button
              className="bg-[#D80032] text-xl text-white p-[6px] w-32 rounded-md"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelCard;
