import React from 'react'; 
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Genre from './components/byGenre.js';
import Artist from './components/byArtist.js';
import Home from './components/Home.js';
import './index.css'

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/genre" element={<Genre/>} />
            <Route path="/artist" element={<Artist/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
