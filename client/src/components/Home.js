import React from 'react'
import DynamicList from './DynamicList.js'
import {songs} from './testdata.js'


const Home= () => {

  const jwtToken = sessionStorage.getItem('accessToken')
  if(jwtToken) console.log(jwtToken)
  return (
    <div className="mx-auto p-4 bg-black bg-no-repeat bg-cover w-full h-screen">
      {/* <SongButton/> */}
      <DynamicList song_list={songs}/>
    </div>
  )
};

export default Home;