import React, { useState } from "react";
import axios from "axios";

function Popup({ isOpen, onClose, song }) {
  const [rating, setRating] = useState(0);
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating > 10 || rating < 1) {
      alert("Please Enter a rating 1-10");
      return;
    }

    axios
      .post("http://localhost:5000/rankings", {
        song_id: song.id,
        song_name: song.name,
        song_rating: rating,
      })
      .then((res) => {
        if (res.status === 200) {
          //IF request worked
          console.log(res);
        }
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
      <div className="bg-gray-600 rounded-lg p-4 w-4/5 h-1/2 animate-fade-down animate-duration-700 flex flex-row">
        <img src={song.image}></img>
        <button
          className="absolute top-2 right-3 text-white hover:text-gray-900 text-lg"
          onClick={onClose}
        >
          &#215;
        </button>
        <div className="ml-4">
          <h1 className="text-6xl font-semibold text-white">{song.name}</h1>
          <p className="text-white mt-2">{song.artist}</p>
          <h1 className="mt-10 text-white">Rating: </h1>
          <form onSubmit={handleSubmit} className="">
            <input
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
              required
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Popup;
