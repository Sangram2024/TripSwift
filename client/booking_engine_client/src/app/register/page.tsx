"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginImg from "../../components/assets/login.jpg";
import Link from "next/link";
import { login } from "@/api/auth";
import LoginIcon from "@/components/assets/TRIP-1.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import InputFields from "@/components/ui/input/input";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8020/api/v1/auth/register`,
        {
          email,
          firstName,
          lastName,
          role,
          password,
        }
      );

      console.log(response.data);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex ">
      {/* Image Section */}
      <div className="w-[67%] h-screen sm:hidden lg:block">
        <Image src={LoginImg} alt={"Login"} className="" />
      </div>

      <div className="relative flex flex-col min-h-screen overflow-hidden">
        <div className="w-full  bg-white border mt-28 p-12 gap-6 rounded-md shadow-md shadow-[#FF745C] lg:max-w-xl">
          {/* <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1> */}
          <div className="flex justify-center items-center ">
            {/* <Image
              src={LoginIcon}
              width={80}
              height={39}
              alt={"logo"}
              className=" "
            /> */}
            <h1 className="text-2xl font-semibold">Register </h1>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className=" py-2 mb-2">
              <InputFields
                label="First Name"
                type="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className=" py-2 mb-2">
              <InputFields
                label="Last Name"
                type="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="py-2 mb-2">
              <InputFields
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" py-2 mb-4">
              <InputFields
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-[#FF745C] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign In
            </button>
          </form>

          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <p className="mt-4 text-sm text-center text-gray-700">
            Already have an account?
            <Link
              href="/login"
              className="font-medium text-[#FF745C] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
