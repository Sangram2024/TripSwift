"use client";

import React, { useState } from "react";
import Link from "next/link";
import Home from "@/components/assets/modern-house.png";
import Trip from "@/components/assets/business-trip.png";
import User from "@/components/assets/user.png";
import Image from "next/image";
import Logo from "../assets/TRIP-1.png";
import { Menu, X } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="h-[8vh] px-6 top-0 bg-transparent left-0 sticky bg-white z-20 shadow">
      <div className="flex items-center h-full p-4 justify-between px-4 rounded-lg bg-opacity-40">
        <div className="flex items-center gap-10">
          <Link href={"/"}>
            <div className="  w-[70px]">
              <Image src={Logo} width={200} height={100} alt="Logo" />
            </div>
          </Link>
        </div>
        <div className="flex items-center lg:flex-row cursor-pointer gap-10 ml-auto">
          <div
            className="lg:hidden cursor-pointer sm:z-50"
            onClick={toggleMenu}
          >
            <span>{!isMenuOpen ? <Menu /> : <X />}</span>
          </div>
          {isMenuOpen || window.innerWidth >= 1024 ? (
            <div
              className={`fixed top-0 right-0 sm:h-screen lg:h-auto lg:w-auto sm:w-[80%] lg:bg-white sm:bg-gray-100 lg:z-0 sm:z-40 transition-all duration-300`}
              onClick={closeMenu}
            >
              <ul className="lg:flex flex-col lg:flex-row items-center lg:mt-0 sm:mt-20  lg:p-3 sm:p-1 font-bold gap-4">
                <li className="border flex lg:p-[7px] sm:p-7  rounded-md hover:border-gray-400 transition items-center sm:border-b sm:text-black  lg:hover:border-gray-400">
                  <span className="mr-2 ">
                    <Image src={Home} alt={"home"} width={20} height={20} />
                  </span>{" "}
                  <h2 className="lg:text-lg sm:text-sm"> List your property</h2>
                </li>
                <Link href={"/my-trip"}>
                  <li className="border flex lg:p-[7px] sm:p-7 sm:text-xs rounded-md hover:border-gray-400 transition items-center sm:border-b sm:text-black  lg:hover:border-gray-400">
                    <span className="mr-2 ">
                      <Image src={Trip} alt={"trip"} width={20} height={20} />
                    </span>{" "}
                    <h2 className="lg:text-lg sm:text-sm">My Trip</h2>
                  </li>
                </Link>

                <Link href={"/login"}>
                  <li className="border flex lg:p-[7px] sm:p-7 sm:text-xs rounded-md hover:border-gray-400 transition items-center sm:border-b sm:text-black  lg:hover:border-gray-400">
                    <span className="mr-2 ">
                      <Image src={User} alt={"user"} width={20} height={20} />
                    </span>{" "}
                    <h2 className="lg:text-lg sm:text-sm">Login / SignUp</h2>
                  </li>
                </Link>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
