import React, {useState, useEffect} from 'react'
import axios from 'axios';
import SongCard from './songCard.js';
import {Spotify} from 'react-spotify-embed'

export function SearchBar() {
    const [searchValue, setSearchValue] = useState('')
    const [showDropdown, setShowDropDown] = useState(false)
    const [songInfo, setSongInfo] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(searchValue.trim() === ''){
            alert('Please enter a valid query')
            return; 
        }
        axios.post('http://localhost:5000/api/search', {query: searchValue})
        .then(res => {
            if(res.status === 200){
                // console.log(res.data)
                setSongInfo(res.data)            
            }
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        // This code will run when songInfo is updated
        console.log(songInfo);
        if (songInfo.length > 1) setShowDropDown(true)
      }, [songInfo]); // Watch for changes to songInfo
    

  return (
    <>
    <div className='flex justify-center border-white'>
        <form onSubmit={handleSubmit} className = "w-full flex justify-center">
        <button onClick ={handleSubmit} className = "w-32 h-14 bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-lg border-white border-2">SEARCH</button>
        <input type="text" placeholder="search for a song" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-tr-full rounded-br-full px-2 py-1 mb-1 mt-1 h-12 w-4/5 focus:outline-none border-white"/>
        </form>
    </div>
    <div className = "mt-2 flex justify-center">
    { showDropdown ? (
       <div className = "w-3/4 scroll-container">  
            {songInfo.map(song => (
                <div className=" mb-4">
                {/* <SongCard key={song[0]} id={song[0]} title={song[1]} artist={song[2]} image={song[3]} link={song[4]}/>  */}
                <Spotify wide link={song[4]}/>
                </div>
            ))}
        </div>
     ) : (<p className = "text-white">false</p>)}
    </div> 
    </>
  )
}