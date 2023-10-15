import React, {useState} from 'react'
import axios from 'axios';

export function SongButton() {
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/search', {query: searchValue})
        .then(res => {
            if(res.status === 200){
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='flex justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg'>
        { showSearch ? (
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="search for a song" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-md px-2 py-1 mb-1 mt-1 h-12 w-full ml-1 mr-1"/>
            </form>) 
            : (<button className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-md px-2 py-1 mb-1 mt-1 h-12 w-full ml-1 mr-1" onClick={toggleSearch}> + </button>
        )}
      
    </div>
  )
}

export function SongCrate({name, artist}){
    return (
        <div className='flex justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg'>
            <div className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-md px-2 py-1 mb-1 mt-1 h-12 w-full ml-1 mr-1">
                <h3 className = "text-white font-mono ">{name}</h3>
                <p className = "text-white font-mono ">{artist}</p> 
            </div>
        </div>
      )
}

