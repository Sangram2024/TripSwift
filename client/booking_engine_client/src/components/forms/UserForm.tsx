"use client";

import React, { useState } from "react";
import HotelDetailsCard from "../HotelBox/HotelDetailsCard";
import { useDispatch } from "react-redux";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "@/Redux/store";




export const UserForm = (data: any) => {

  const router = useRouter()
  

  

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authReducer.user);

  console.log("all usert value",authUser)


  const [formData, setFormData] = useState({
    firstName: authUser?.firstName,
    lastName: authUser?.lastName,
    email: authUser?.email,
    countryCode: "",
    phoneNumber: "",
    country: "United States",
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = () => {

    localStorage.setItem("formData",JSON.stringify(formData))
    dispatch({ type: "SUBMIT_FORM", payload: formData });
    // router.push(`${pathname}?formData=${JSON.stringify(formData)}`)
    console.log(formData, "form data");
  };

 

  return (
    <div className="grid grid-cols-2 gap-4 m-10">
      <div className="col-span-1 border">
        <div className="space-y-12 p-10">
          <div className=" pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Country Code
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    id="countryCode"
                    name="countryCode"
                    type="tel"
                    placeholder="91"
                    className="block pl-2 w-1/4 sm:w-1/6 md:w-1/8 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* Spacer */}
                  {/* Phone Number Input */}
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="123-456-7890"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="block pl-3 ml-2 w-full sm:w-2/3 md:w-3/4 lg:w-4/5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled

              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className='col-span-1"'>
       <HotelDetailsCard data={data} formData={formData}/> 
      </div>
    </div>
  );
};
