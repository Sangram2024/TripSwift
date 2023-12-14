"use client";

import React from "react";

export default function Tabs() {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div>
        <div
          className={`${
            openTab === 1
              ? "bg-blue-500"
              : openTab === 2
              ? "bg-red-500"
              : "bg-green-500"
          } h-[17vh]`}
        ></div>
        <div className="flex flex-wrap justify-center items-center mb-unit-4xl">
          <div className="w-full max-w-[50%] border absolute bg-white px-7 mt-9  rounded">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
                <a
                  className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${
                    openTab === 1
                      ? "border-b-3 border-blue-500 "
                      : "text-gray-600 bg-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                >
                  <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                  Booking
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
                <a
                  className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${
                    openTab === 2
                      ? "border-b-3 border-red-500"
                      : "text-gray-600 bg-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                >
                  <i className="fas fa-cog text-base mr-1"></i> Cancelled
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
                <a
                  className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${
                    openTab === 3
                      ? "border-b-3 border-green-500"
                      : "text-gray-600 bg-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                >
                  <i className="fas fa-briefcase text-base mr-1"></i> Completed
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow border rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <p>
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                      <br />
                      <br /> Dramatically visualize customer directed
                      convergence without revolutionary ROI.
                    </p>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <p>
                      Completely synergize resource taxing relationships via
                      premier niche markets. Professionally cultivate one-to-one
                      customer service with robust ideas.
                      <br />
                      <br />
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </p>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
