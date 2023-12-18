"use client";
import axios from "axios";
import React, { useState } from "react";

type SearchBoxProps = {
  handleSearch: (responseData: any) => void;
};

const SearchBox = (props: SearchBoxProps) => {
  const [search, setSearch] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(2);

  const handleInputChange = async (value: string) => {
    // Update the search state as the user types
    setSearch(value);

    try {
      const response = await axios.post("http://localhost:8030/api/search", {
        location: value,
        capacity,
      });

      props.handleSearch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="search"
        name="search"
        className="p-2 w-80 rounded-md focus:outline-none"
        placeholder="Search by city, hotel and location"
        value={search}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
