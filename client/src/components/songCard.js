import React from 'react'


const SongCard = ({ id, title, artist, image, preview }) => {
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
          <a href={preview}>Preview</a>
          <button data-preview-url={preview}>Play</button>
        </div>   
      </div>
    );
  };

export default SongCard