import React, {useState} from 'react'
import DynamicList from './DynamicList';
import axios from 'axios';
import SongCard from './songCard.js';

export function SearchBar() {
    const [searchValue, setSearchValue] = useState('')
    const [showDropdown, setShowDropDown] = useState(false)
    const [songInfo, setSongInfo] = useState()


    const handleSubmit = (e) =>{
        e.preventDefault();
        if(searchValue.trim() === ''){
            alert('Please enter a valid query')
            return; 
        }
        axios.post('http://localhost:5000/api/search', {query: searchValue})
        .then(res => {
            if(res.status === 200){
                setShowDropDown(true)
                console.log(res.data)
                setSongInfo(res.data[0])
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <>
    <div className='flex justify-center border-white'>
        <form onSubmit={handleSubmit} className = "w-full flex justify-center">
        <button onClick ={handleSubmit} className = "w-32 h-14 bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-lg border-white border-2">SEARCH</button>
        <input type="text" placeholder="search for a song" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-tr-full rounded-br-full px-2 py-1 mb-1 mt-1 h-12 w-4/5 focus:outline-none border-white"/>
        </form>
    </div>
    <div className = "flex justify-center">
    { showDropdown ? (<SongCard image={"https://i.scdn.co/image/ab67616d00001e027b1fc51ff3257b5286a1ecec"} title={"Codine Crazy"} artist={"Future"}/> )
    : (<p className = "text-white">false</p>)}
    </div> 
    </>
  )
}