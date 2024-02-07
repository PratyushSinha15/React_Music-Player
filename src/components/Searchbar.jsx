import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-blue-700 focus-within:text-blue-500 mt-20 m-1"
      style={{
        width: "550px",
        border: "2px solid black",
        borderRadius: "80px",
        backgroundColor: "#DCDCDC",
        padding: "10px",
      }}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div
        className="flex flex-row justify-start items-center"
        style={{ width: "600px" }}
      >
        <FiSearch aria-hidden="true" className="w-5 h-5 mr-2" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1/2 bg-transparent border-none placeholder-grey-500 outline-none text-base text-white "
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "450px", color: "grey" }} // Adjust the width as needed
        />
      </div>
    </form>
  );
};

export default Searchbar;
