import React, {useState} from 'react'

function PlayButton(previewUrl) {
    const [isHovered, setIsHovered] = useState(false)

    const playAudio = () =>{
        setIsHovered(true)
    }

    const pauseAudio = () =>{
        setIsHovered(false)
    }
    
    return (
        <div className="text-center mt-4">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isHovered ? 'animate-pulse' : ''}`}
            onMouseEnter={playAudio}
            onMouseLeave={pauseAudio}
          >
            {isHovered ? 'Playing Song' : 'Play Song'}
          </button>
          <audio src={isHovered ? previewUrl : ''} controls />
        </div>
      );
}

export default PlayButton
