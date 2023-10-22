import React from 'react'
import {Spotify} from 'react-spotify-embed'


const SongCard = ({ id, title, artist, image, link }) => {
    return (
      <div className="w-full h-auto bg-white rounded-lg flex">
        <div className="">
          <img src={image} className=""/>
        </div>
        <div className = "w-12"></div>
        <div className="mt-3 w-full items-center ">
          <h3 className="text-5xl font-bold">{title}</h3>
          <p className="text-xl font-light">{artist}</p>
          <p>{`id: ${id}`}</p>
          <Spotify link={link}/>


        </div>   
      </div>
    );
  };

export default SongCard