"use client";

import React, { useState } from "react";
import { login } from "@/Redux/slices/auth.slice";
import InputFields from "@/components/ui/input/input";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import LoginImg from "../../components/assets/login.jpg";
import Link from "next/link";
import LoginIcon from "@/components/assets/TRIP-1.png";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "@/Redux/store";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return;
    }

    try {
      await dispatch(login({ email, password }));

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
      <div className="w-[67%] h-screen  sm:hidden lg:block">
        <Image src={LoginImg} alt={"Login"} className="" />
      </div>

      {/* Sign-up Section */}
      <div className="relative flex flex-col min-h-screen overflow-hidden  ">
        <div className="w-full  bg-white border mt-36 p-12 gap-6   rounded-md shadow-md shadow-[#FF745C] lg:max-w-xl">
          <div className="flex justify-center items-center  p-4">
            <Image
              src={LoginIcon}
              width={80}
              height={39}
              alt={"logo"}
              className=" "
            />
          </div>

          <form className="mt-6 gap-5 " onSubmit={handleSubmit}>
            <div className="py-2">
              <InputFields
                label="Email"
                type="email"
                value={email}
                className=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-2 mb-4 relative">
              <InputFields
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex  top-4 items-center pr-2 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button className="w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-[#FF745C] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign In
            </button>
          </form>

          <div className="relative flex items-center justify-center w-full mt-9 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/register"
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
