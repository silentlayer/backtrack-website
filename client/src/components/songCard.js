import React from 'react'

// function SongCard() {
//     // const song_id          = song_info[0]
//     // const song_name        = song_info[1]
//     // const song_artist_name = song_info[2]
//     // const song_img         = song_info[3]
//     // const song_preview     = song_info[4]


//   return (
//     <div className = "justify-center flex border rounded w-4/5 h-300 bg-white p-4">
//       <h1 className = "text-2xl">Song</h1>
//       <h1 className = "text-xl">Artist</h1>
//     </div>
//   )
// }



const SongCard = ({ image, title, artist }) => {
    return (
      <div className="w-4/5 h-auto m-3 bg-white rounded-lg flex">
        <div className="">
          <img src={image} className=""/>
        </div>
        <div className = "w-12"></div>
        <div className="w-2/5 items-center bg-slate-500">
          <h3 className="text-5xl font-bold">{title}</h3>
          <p className="text-xl font-light">{artist}</p>
        </div>   
      </div>
    );
  };

export default SongCard