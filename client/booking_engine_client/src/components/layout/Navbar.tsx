"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Home from "@/components/assets/modern-house.png";
import Trip from "@/components/assets/business-trip.png";
// import User from "@/components/assets/user.png";
import Image from "next/image";
import Logo from "../assets/TRIP-1.png";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// import Avatar from "react-avatar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const token = Cookies.get("ota-auth");
  console.log(token, "token---------------");

  const router = useRouter();
  useEffect(() => {
    if (token) {
      try {
        axios
          .get(`http://localhost:8020/api/v1/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const userData = response.data.data.user;
            console.log(userData, "_________________");

            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [token]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("ota-auth");
    setUserId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    window.location.reload();
  };
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

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

          <div
            className={`fixed top-0 right-0 sm:h-screen lg:h-auto lg:w-auto sm:w-[80%] lg:bg-white sm:bg-gray-100 lg:z-0 sm:z-40 transition-all duration-300`}
            onClick={closeMenu}
          >
            <ul className="lg:flex flex-col lg:flex-row items-center lg:mt-0 sm:mt-20  lg:p-3 sm:p-1  gap-4">
              <li className="justify-end items-stretch border flex gap-4 pl-2 p-2 rounded-lg hover:border-gray-500 transition max-md:max-w-full max-md:flex-wrap max-md:pl-5">
                <img
                  alt="loadings"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e6875fa2cf4225b8651e5b60638488dbf76ca42a575a25b1180ad99cc07db86?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                  className="aspect-square object-contain object-center w-6  overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
                <div className="text-black text-sm font-medium  leading-5 self-center grow whitespace-nowrap my-auto">
                  Become a Host
                </div>
              </li>

              <Link href={"/my-trip"}>
                <li className="justify-end items-stretch flex gap-4  p-2 border rounded-lg hover:border-gray-500 transition max-md:max-w-full max-md:flex-wrap max-md:pl-5">
                  <img
                    alt="loading"
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e6875fa2cf4225b8651e5b60638488dbf76ca42a575a25b1180ad99cc07db86?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                    className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                  />
                  <div className="text-black text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                    My Trip
                  </div>
                </li>
              </Link>

              {token && token !== "Fallback Token Value" ? (
                <div className="flex items-center gap-4 pr-10 pl-3">
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <User
                        as="button"
                        avatarProps={{
                          isBordered: true,
                          src: "",
                        }}
                        className="transition-transform"
                        // description={`@${email}`}
                        name={`${firstName} ${lastName}`}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{`${email}`}</p>
                      </DropdownItem>

                      <DropdownItem key="team_settings">
                        Profile Settings
                      </DropdownItem>
                      <DropdownItem key="help_and_feedback">
                        Help & Feedback
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        color="danger"
                        onClick={handleLogout}
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <Link href="/register">
                  <div className="text-black text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto border">
                    Sign Up
                  </div>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
