import React from "react";

const RankButton = (id, name) => {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <button
      className="flex items-center bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded ml-2"
      onClick={handleClick}
    >
      +
    </button>
  );
};

export default RankButton;
