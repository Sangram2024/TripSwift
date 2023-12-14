"use client";
import React, { useState } from "react";

const GuestBox = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState(
    Array.from({ length: 0 }, () => 0)
  );
  const [displayText, setDisplayText] = useState(
    ` ${rooms} Rooms ${guests} Guests`
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const incRooms = () => {
    if (rooms < 10) {
      setRooms(Number(rooms) + 1);
    }
  };
  const decRooms = () => {
    if (rooms > 0) {
      setRooms(rooms - 1);
    }
  };

  const incNum = () => {
    if (guests < 10) {
      setGuests(Number(guests) + 1);
    }
  };
  const decNum = () => {
    if (guests > 0) {
      setGuests(guests - 1);
    }
  };
  const handleRoomChange = (
    value: number | ((prevState: number) => number)
  ) => {
    setRooms((prevRooms) =>
      Math.max(typeof value === "function" ? value(prevRooms) : value, 1)
    );
  };

  const handleGuestChange = (
    value: number | ((prevState: number) => number)
  ) => {
    setGuests((prevGuests) =>
      Math.max(typeof value === "function" ? value(prevGuests) : value, 1)
    );
  };

  const handleChildrenChange = (
    value: number | ((prevState: number) => number)
  ) => {
    setChildren((prevChildren) => {
      const newValue = Math.max(
        typeof value === "function" ? value(prevChildren) : value,
        0
      );
      setChildAges(Array.from({ length: newValue }, () => 1));
      return newValue;
    });
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const newChildAges = [...childAges];
    newChildAges[index] = age;
    setChildAges(newChildAges);
  };

  const isChildAgeValid = () => {
    return childAges.every((age) => age > 0 && age < 14);
  };

  const handleApplyChanges = () => {
    if (isChildAgeValid()) {
      setDisplayText(` ${rooms} Rooms ${guests} Guests`);
      closeModal();
    } else {
      alert("Please provide valid ages for children (below 14).");
    }
  };

  return (
    <div className="bg-white">
      <div className="">
        <div
          id="selectedValues"
          className="w-full p-2  rounded-md cursor-pointer"
          onClick={openModal}
        >
          {displayText || "Select values"}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute z-50   bg-white  grid grid-cols-2 gap-4 p-4 border-2 w-[30%] mt-5 rounded-md">
          <label>Rooms</label>
          <div className="  flex gap-2 items-center">
            <button
              className=" bg-[#D80032] w-9 h-9 text-white"
              onClick={decRooms}
            >
              -
            </button>
            <input
              className="w-9 ml-3 flex justify-center  items-center"
              type="number"
              value={rooms}
              readOnly
              required
              onChange={(e) => setNumOfRooms(parseInt(e.target.value))}
            />
            <button
              className=" bg-[#D80032] w-9 h-9 mr-1 text-white"
              onClick={incRooms}
            >
              +
            </button>
          </div>

          <label>Guests</label>
          <div className=" flex gap-2 items-center">
            <button
              className=" bg-[#D80032] w-9 h-9  text-white"
              onClick={decNum}
            >
              -
            </button>
            <input
              className="w-9 ml-3 flex justify-center  items-center"
              type="number"
              value={guests}
              readOnly
              required
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
            <button
              className=" bg-[#D80032] w-9 h-9 mr-1 text-white"
              onClick={incNum}
            >
              +
            </button>
          </div>

          <label htmlFor="modalChildren">Children</label>
          <select
            id="modalChildren"
            name="modalChildren"
            value={children}
            onChange={(e) => handleChildrenChange(parseInt(e.target.value))}
            className=" p-2 border rounded-md bg-white w-[98px] "
          >
            {[0, 1, 2, 3, 4].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Display Children Age as a dropdown */}
          {Array.from({ length: children }).map((_, index) => (
            <div key={index}>
              <label className="text-gray-600" htmlFor={`childAge${index + 1}`}>
                Child {index + 1} Age
              </label>
              <select
                id={`childAge${index + 1}`}
                name={`childAge${index + 1}`}
                value={childAges[index]}
                onChange={(e) =>
                  handleChildAgeChange(index, parseInt(e.target.value))
                }
                className="bg-white w-[98px] p-2 border rounded-md"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="col-span-2 flex justify-start gap-6">
            <button
              onClick={handleApplyChanges}
              className="bg-[#D80032] text-white px-4 py-2 rounded"
            >
              Apply
            </button>
            <button
              onClick={closeModal}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestBox;
function setNumOfRooms(arg0: number) {
  throw new Error("Function not implemented.");
}
