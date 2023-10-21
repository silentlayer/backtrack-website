import React, {useState} from 'react'
import axios from 'axios';

export function SearchBar() {
    const [searchValue, setSearchValue] = useState('')


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
    <div className='flex justify-center border-white'>
        <form onSubmit={handleSubmit} className = "w-full flex justify-center">
        <button onClick ={handleSubmit} className = "w-32 h-14 bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-lg border-white border-2">SEARCH</button>
        <input type="text" placeholder="search for a song" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-tr rounded-br px-2 py-1 mb-1 mt-1 h-12 w-4/5 focus:outline-none border-white"/>
        </form>
    </div>
  )
}