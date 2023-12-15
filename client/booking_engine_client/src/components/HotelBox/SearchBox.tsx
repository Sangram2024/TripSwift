"use client";
import axios from "axios";
import React, { useState } from "react";

type SearchBoxProps = {
  onSearch: (query: string, capacity: number) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(2);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:8030/api/search", {
        location: search,
        capacity,
      });

      console.log(response.data);

      // Pass the search query, capacity, and amenities to the parent component
      onSearch(search, capacity);
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
        onChange={(e) => setSearch(e.target.value)}
      />
      <label>
        Capacity:
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
      </label>
      {/* You can add more input fields for other search criteria */}
      <button
        className="bg-[#D80032] text-xl text-white p-[6px] w-32 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
