import React from "react";
import {SongButton, SongCrate} from "./songButton";

const DynamicList = ({ song_list }) => {
  return (
    <>
      <SongButton/>
      <ul className = "mt-2 space-y-2">
        {song_list.map((song) => (
              <li key={song.id}>
                <SongCrate name={song.name} artist={song.artist}/>
              </li>      
        ))}
      </ul>
    </>
  );
};

export default DynamicList;
