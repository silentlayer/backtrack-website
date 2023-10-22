import React from "react";
import { SearchBar } from "./searchBar.js";

const Home = () => {
  const jwtToken = sessionStorage.getItem("accessToken");
  if (jwtToken) console.log(jwtToken);
  return (
    <>
      <div className="bg-black h-64 flex justify-center items-end py-6">
        <h1 className="text-white text-8xl font-sans animate-fade-down">
          Search the Knowledge Base
        </h1>
      </div>
      <div className="p-4 bg-black w-full h-auto">
        <SearchBar />
      </div>
      <div className="bg-black w-full h-screen"></div>
    </>
  );
};

export default Home;
