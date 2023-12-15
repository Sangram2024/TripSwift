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

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

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
        `http://localhost:8020/api/v1/auth/login?accessToken=${accessToken}`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        }
      );

      const newAccessToken = response.data.data.accessToken;
      console.log(newAccessToken);
      Cookies.set("ota-auth", newAccessToken, {
        expires: 7,
      });
      setAccessToken(newAccessToken);
      console.log(response.data);
      setLoading(false);
      router.push("/");
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

      {/* Sign-up Section */}
      <div className="relative flex flex-col min-h-screen overflow-hidden">
        <div className="w-full  bg-white border mt-28 p-12 gap-6 rounded-md shadow-md shadow-[#FF745C] lg:max-w-xl">
          {/* <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1> */}
          <div className="flex justify-center items-center  p-4">
            <Image
              src={LoginIcon}
              width={80}
              height={39}
              alt={"logo"}
              className=" "
            />
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <h1>Email</h1>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Connect input to state
              className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <h1 className="mt-4">Password</h1>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Connect input to state
              className="block w-full px-4 py-2 mb-7 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            <button className="w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-[#FF745C] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign In
            </button>
          </form>

          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#FF745C] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
