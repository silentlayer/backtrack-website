import React from 'react'
import DynamicList from './DynamicList.js'
import {songs} from './testdata.js'


const Home= () => {
  return (
    <div className="mx-auto p-4 bg-custom-image bg-no-repeat bg-cover w-full h-screen">
      <DynamicList song_list={songs}/>
    </div>
  )
};

export default Home;