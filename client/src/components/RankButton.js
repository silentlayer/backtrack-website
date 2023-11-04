import React, { useState } from "react";

const RankButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded ml-2"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default RankButton;
