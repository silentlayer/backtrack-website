import React from 'react'

export function SongButton() {
  return (
    <div className='flex justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg'>
      <button className = "text-white text-bold bg-gradient-to-b from-gray-700 via-gray-900 to-black rounded-md px-2 py-1 mb-1 mt-1 h-12 w-full ml-1 mr-1"> + </button>
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

