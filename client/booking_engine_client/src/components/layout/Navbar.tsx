"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Home from "@/components/assets/modern-house.png";
import Trip from "@/components/assets/business-trip.png";
import MTrip from "@/components/assets/traveling.png";
import Image from "next/image";
import Logo from "../assets/TRIP-1.png";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "@/Redux/store";
import { usePathname } from "next/navigation";

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
import { logout, getUser } from "@/Redux/slices/auth.slice";

type Props = {};

const Navbar = React.memo((props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [getUserCalled, setGetUserCalled] = useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {}, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSignup = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div
        className={`h-[8vh] px-6 top-0 bg-transparent left-0 sticky bg-white z-20 shadow ${
          pathname === "/login" || pathname === "/register" ? "hidden" : ""
        }`}
      >
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
                <li className="justify-end items-stretch border  cursor-not-allowed flex gap-2 pl-2 p-2 rounded-lg transition max-md:max-w-full max-md:flex-wrap max-md:pl-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e6875fa2cf4225b8651e5b60638488dbf76ca42a575a25b1180ad99cc07db86?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                    className="aspect-square object-contain object-center w-7  overflow-hidden self-center shrink-0 max-w-full my-auto"
                  />
                  <div className="text-black text-sm font-medium  leading-5 self-center grow whitespace-nowrap my-auto">
                    Become a Host
                  </div>
                </li>

                <Link href={"/my-trip"}>
                  <li className="justify-end items-stretch flex gap-4  p-2 border rounded-lg hover:border-gray-500 transition max-md:max-w-full max-md:flex-wrap max-md:pl-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e6875fa2cf4225b8651e5b60638488dbf76ca42a575a25b1180ad99cc07db86?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                      className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                    />
                    <div className="text-black text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                      My Trip
                    </div>
                  </li>
                </Link>

                {user ? (
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
                          description={`${user.email}`}
                          name={`${user.firstName} ${user.lastName}`}
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="User Actions" variant="flat">
                        {/* <DropdownItem key="profile" className="h-14 gap-2">
                          <p className="font-bold">Signed in as</p>
                          <p className="font-bold">{`@${user.email}`}</p>
                        </DropdownItem> */}

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
                  <div className="flex items-center gap-4">
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Avatar
                          isBordered
                          as="button"
                          className="transition-transform"
                          src=""
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="signUp" onClick={handleSignup}>
                          Sign Up
                        </DropdownItem>

                        <DropdownItem key="login" onClick={handleLogin}>
                          Log In
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;
