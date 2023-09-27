import React from "react";

const DynamicList = ({ song_list }) => {
  return (
    <ul className = "space-y-2">
      {song_list.map((song) => (
        <li key={song.id} className="border border-white mb-2 py-2 px-4 bg-transparent rounded-lg">
          <h3 className = "text-white font-mono ">{song.name}</h3>
          <p className = "text-white font-mono ">{song.artist}</p>
        </li>
      ))}
    </ul>
  );
};

export default DynamicList;
