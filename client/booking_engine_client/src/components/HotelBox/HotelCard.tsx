"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "@/Redux/store";
import { setHotelSearchDetails } from "@/Redux/slices/hotelcard.slice";
import Image from "next/image";
import HeroImage from "../assets/hotel-1.jpg";
import DateRange from "./DateRange";
import GuestBox from "./GuestBox";
import { useRouter } from "next/navigation";

const HotelCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const hotelSearchDetails = useSelector(
    (state) => state.hotel.hotelSearchDetails
  );
  const dateRangeDetails = useSelector((state) => state.hotel.dateRangeDetails);
  const guestDetails = useSelector((state) => state.hotel.guestDetails);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const checkinDate = encodeURIComponent(dateRangeDetails.dates[0]);
    const checkoutDate = encodeURIComponent(dateRangeDetails.dates[1]);

    const dateRangeQueryString = `checkin=${checkinDate}&checkout=${checkoutDate}`;
    const guestDetailsQueryString = `adults=${guestDetails.guests}&room$=${guestDetails.rooms}&children=${guestDetails.children}`;
    const searchDetails = {
      ...hotelSearchDetails,
      ...dateRangeDetails,
      ...guestDetails,
      searchQuery,
    };

    console.log(searchDetails, "_______ details");

    router.push(
      `/destination?location=${searchQuery}&${dateRangeQueryString}&${guestDetailsQueryString}`
    );
  };

  // https://www.oyorooms.com/search?location=Puri%2C%20Odisha%2C%20India&city=Puri&searchType=city&checkin=22%2F12%2F2023&checkout=23%2F12%2F2023&roomConfig%5B%5D=1&guests=1&rooms=1&filters%5Bcity_id%5D=97

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
              value={searchQuery}
              className="p-2 w-80 rounded-md focus:outline-none"
              placeholder="Search by city, hotel and location"
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={handleSearch}
              className="bg-[#D80032] text-xl text-white p-[6px] w-32 rounded-md"
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
