"use client";
import React, { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import HeroImage from "../assets/hotel-1.jpg";
import DateRange from "./DateRange";
import GuestBox from "./GuestBox";
import Link from "next/link";

const HotelCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (event: {
    preventDefault: () => void;
    target: { elements: { search: { value: any } } };
  }) => {
    event.preventDefault();
    // setSearchQuery(newSearchQuery);
    router.push(`/destination?location=${searchQuery}`);
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
            {/* <Link   onClick={handleSearch} */}
 {/* href={`/destination?location=${searchQuery}`} passHref> */}
              <button onClick={handleSearch}   className="bg-[#D80032] text-xl text-white p-[6px] w-32 rounded-md">
                Search
              </button>
            {/* </Link> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelCard;
