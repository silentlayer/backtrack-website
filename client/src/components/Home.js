import React from 'react'
import DynamicList from './DynamicList.js'
import {songs} from './testdata.js'
import { SearchBar } from './searchBar.js';


const Home= () => {

  const jwtToken = sessionStorage.getItem('accessToken')
  if(jwtToken) console.log(jwtToken)
  return (
    <div className="mx-auto p-4 bg-black bg-no-repeat bg-cover w-full h-full">
      {/* <SongButton/> */}
      {/* <DynamicList song_list={songs}/> */}
      <SearchBar/>
      
    </div>
  )
};

export default Home;