"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Img from "@/components/assets/hotel-1.jpg";
import Battery from "@/components/assets/battery.png";
import AC from "@/components/assets/air-conditioner.png";
import TV from "@/components/assets/smart-tv.png";
import Wifi from "@/components/assets/wifi.png";
import Link from "next/link";
import Cookies from "js-cookie";
import Header from "@/components/hotelListingComponents/Header";
import { useSearchParams } from 'next/navigation';
import { roomsByProperty } from "@/api/hotel";



const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const propertyId = searchParams.get("id")

  const [rooms, setRooms] = useState(null)

  console.log("all rooms data in rooms page",rooms)


  useEffect(() => {
    if (propertyId) {
      roomsByProperty(propertyId)
      .then(async (response)=>{
        if(response){
          setRooms(response)
        }
      })
    }
  }, [propertyId]);

  const handlePayNowClick = () => {
    const authToken = Cookies.get("ota-auth");
    console.log(authToken, "(((((((((((((((((");

    if (!authToken) {
      router.push("/login");
    } else {
      router.push("/booking/1");
    }
    return () => {
      return;
    };
  };


  return (
    <>
      <Header tag={"Rooms Details"} />

      <div className="mt-6 mx-16 max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-full max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col mt-1.5 max-md:max-w-full max-md:mt-10">
              <div className="self-stretch flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                <div className="flex  justify-around">
                  <div className="text-zinc-800 text-2xl font-medium whitespace-nowrap">
                    Rooms in Property
                  </div>

                </div>
                <div className="flex items-center gap-3 self-start border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-red-600 flex gap-2 px-4 py-2 rounded-[100px] border-solid">
                  <div className="text-gray-50 text-md ">
                    1248 results • Jul 14 - 21
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                  rooms?.data?.map((allRooms:any, index:any) =>(
                    <div className="border bg-white self-stretch mt-8 px-8 py-8 rounded-3xl border-solid border-white max-md:max-w-full max-md:px-5">
                    <div className=" flex max-md:flex-col max-md:items-stretch max-md:gap-0 border p-3">
                      <div className="flex flex-col items-stretch w-[31%] max-md:w-full max-md:ml-0">
                        <div className="flex-col overflow-hidden relative flex aspect-[1.0297029702970297] w-52 grow items-stretch pt-12 max-md:mt-10">
                          <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a624b52c5f69aded4835a9d4df08fc9cfa4bb4a38491049b54b3902e50eddc7?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                            className="absolute h-full w-full object-cover object-center inset-0"
                          />
                          <div className="relative flex flex-col mt-7 pl-2.5 pr-20 pt-9 pb-3.5 rounded-xl items-start max-md:pr-5">
  
                            <div className="text-stone-300 text-base self-stretch mt-3">
                              Richard and Gill
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-stretch w-[69%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
                          <div className="self-stretch flex justify-between gap-5 px-0.5 items-start max-md:max-w-full max-md:flex-wrap">
                            <div className="flex flex-col items-stretch mt-1">
                              <div className="text-zinc-800 text-2xl font-medium">
                                {allRooms?.name}
                                <br />
                              </div>{" "}
                              <div className="text-gray-500 text-sm mb-2 mt-1  ">
                                {allRooms?.description}
                              </div>{" "}
                              <div className="flex justify-between gap-2 mt-2 items-start">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/74eeb3bd6b74d6be200b4ccab0f04a767f1f58803244d3041f6d0488863ce6dd?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                                  className="aspect-[0.75] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
                                />{" "}
                                <div className="text-zinc-800 text-base grow whitespace-nowrap">
                                  1995 Broadway, New York
                                </div>
                              </div>
                            </div>{" "}
                            
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/decfbfc2a869bdf5d8f226a428c034f6720d17bf5c4529634b042f4678ae44a9?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                              className="aspect-square object-contain object-center w-11 overflow-hidden shrink-0 max-w-full"
                            />
                          </div>{" "}
                          
                          <div className="text-gray-500 text-base leading-6 self-stretch mt-4 max-md:max-w-full">
                            Wifi • Air conditioning • Kitchen • Heating{" "}
                            <span className="text-gray-500">
                              <span className="text-gray-500">• Smokers</span>
                              <br />
                              <span className="text-gray-500"></span>
                            </span>
                          </div>{" "}
  
                          <div className="self-stretch flex w-full items-center justify-between gap-5 mt-5 pr-1.5 max-md:max-w-full max-md:flex-wrap">
                            
                            <div className="self-stretch flex items-stretch justify-between gap-1.5">
                              <div className="text-zinc-700 text-xl font-bold grow whitespace-nowrap">
                                ${allRooms?.price}
                              </div>{" "}
                              <div className="text-zinc-800 text-base self-center grow whitespace-nowrap my-auto">
                                /night
                              </div>
                              <div className="text-gray-500 text-sm ml-5 mt-1  ">
                                (Allowes {allRooms?.capacity} person)
                              </div>{" "}
                            </div>
                              
                              
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                        <div className="flex items-center gap-1.5 my-auto max-md:justify-center">
                              <div className="text-zinc-800 text-xl font-medium whitespace-nowrap my-auto">
                                4.0
                              </div>{" "}
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0a44fce741041bdc50d45c261372d5c3d8837de546a7731cf0b6f3b762063d0?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                                className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                              />{" "}
                              <div className="text-zinc-800 text-sm grow whitespace-nowrap mt-1 self-start">
                                (7 Reviews)
                              </div>
                            </div>{" "}
                        <Link   href={`/booking?id=${allRooms._id}`} passHref
                          className="bg-red-600  rounded px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
                        >
                          Book Now
                        </Link>
                        </div>
                       
  
                      </div>
                    </div>
                  </div>
                  ))
                }
               
           
              </div>

            </div>
          </div>
          {/* <div className="flex flex-col items-stretch w-[57%] ml-5 max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/290310f2c41d0cc8fc60502222ddeeffe0ac4e6c384ae8a780f0059d30a9733a?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
              className="aspect-[1.13] object-contain object-center w-full overflow-hidden max-md:max-w-full max-md:mt-10"
            />
          // </div> */}
        </div>
      </div>
    </>
  );
};

export default page;
