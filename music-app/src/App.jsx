
import './index.css'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Library from "./Library.jsx"
import Search from "./Search.jsx"
import AudioPlayer from './components/AudioPlayer.jsx'
import AlbumPage from './components/AlbumPage.jsx'
import ArtistPage from './components/ArtistPage.jsx'
import SearchPageResults from './components/SearchPageResults.jsx'
import Navbar from './components/Navbar.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'
import Queue from './components/Queue.jsx'
import Playlist from './Playlist.jsx'
import PlaylistPage from './components/PlaylistPage.jsx'
import { usePlayer } from './context/PlayerContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification.jsx'

import albumPlaceHolder from "./assets/albumPlaceHolder.png"

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Dropdown from './components/Dropdown.jsx'
import Home from './Home.jsx'


library.add(fas, far, fab)


function App() {
  const [search,setSearch] = useState("")
      const [result,setResults] = useState([])
      const [filter,setFilter] = useState("songs")
      
      const [currentView, setCurrentView] = useState("search");
     
      const {
        streamUrl,
        currentSong,
        nextSong,
        previousSong
      } = usePlayer()
      
      
      
      
      const handleWheel = (e) => {
      e.currentTarget.scrollLeft += e.deltaY;
  };
  
      async function handleSearch(e){
          if (!search.trim()) return;
          e.preventDefault();
          console.log(`Searching for: ${search} filter: ${filter}`)
          
          if (filter == undefined){
              filter = ""
          }
          const response = await axios.get(
                  `http://localhost:3001/api/music/search?q=${search}&filter=${filter}`
  
          );
          setCurrentView("search")
          setResults(response.data.results)
          console.log(response)
      }
  
  
  
  
         
         
  
   
     
  
  return(
    <>
     
          <Navbar/>
          
          <Routes>
              <Route path='/' element= {<Home/>}></Route>
              <Route path='/register' element= {<Signup/>}></Route>
              <Route path='/login' element= {<Login/>}></Route>
              <Route path='/library' element= {<Library/>}></Route>
              <Route path='/search' element= {<Search/>}></Route>
              <Route path='/audio' element= {<AudioPlayer/>}></Route>
              <Route path='/artist/:id' element={<ArtistPage/>}></Route>
              <Route path='/album/:id' element={<AlbumPage/>}></Route>
              <Route path='/playlist' element= {<Playlist/>}></Route>
              <Route path='/playlist/:id' element={<PlaylistPage/>}></Route>

              
          </Routes>

          <Notification/>
        
  
   
   <Queue/>

   <Dropdown/>

   <AudioPlayer 
      streamUrl={streamUrl}
      songTitle={currentSong?.title}
      artists={currentSong?.artists}
      songCover={currentSong?.thumbnails?.[0]?.url || currentSong?.thumbnail || albumPlaceHolder}
      nextSong={nextSong}
      previousSong={previousSong}
    />

   
    </>

  )
}

export default App
