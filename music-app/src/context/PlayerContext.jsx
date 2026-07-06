import { createContext, useContext, useState } from "react";
import axios from "axios";
import albumPlaceHolder from "../assets/albumPlaceHolder.png";

const PlayerContext = createContext();

export function PlayerProvider({children}){
    const [streamUrl, setStreamUrl] = useState(null);
    const [currentSong, setCurrentSong] = useState(null)
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [queue, setQueue] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)    
    const [shuffle, setShuffle] = useState(false)
    const [history, setHistory] = useState([])

    const [library, setLibrary] = useState({
            likedSongs: [],
            likedAlbums: [],
            recentlyPlayed: [],
        }) 

    const currentUser = JSON.parse(localStorage.getItem("user"));
    
     async function playAlbum(album, index = 0, shuffle = false) {
            if (!album || !album.tracks?.length) {
        console.warn("Invalid album passed to playAlbum:", album);
        return;
    }
        
        setCurrentAlbum(album)
        console.log(currentAlbum.tracks.length)
        
        const albumTracks = currentAlbum?.tracks?.map(track => ({...track, thumbnails: [{url: upscaleImage(currentAlbum?.album?.thumbnail,60)}] }))
        const playlist = shuffle ? shuffleSongs([...albumTracks]) : albumTracks 
            
        
        setQueue(playlist);
        console.log(queue)
        setCurrentIndex(index);
        await playSong(playlist[index]);
    }

    function upscaleImage(url, size) {
              if (!url) return albumPlaceHolder;
              return url.replace(/w\d+-h\d+/, `w${size}-h${size}`);
          }

     async function playSong(song, songList = []){
            if (currentSong){
                setHistory(prev => [...prev, currentSong]);
              }

              setCurrentSong(song);
              console.log(currentSong)
              
              let nextSong = null
  
              let index = -1
              if (songList.length >0){
  
                  index = songList.findIndex(s => s.videoId ===song.videoId)
                  setQueue(songList);
                  console.log(queue)
                  setCurrentIndex(index);
                nextSong = songList[index + 1] || null
                  console.log(nextSong)
              }
              
          try{
              const response = await axios.get(
                  `http://localhost:3001/api/music/stream?id=${song.videoId}`
              ); 
       
              console.log(response)
              const urls = response.data.streamingUrls
  
              if (!urls || urls.length ===0 ){
                 throw new Error("No stream available");
                  
                  return;
              }
          
         
          console.log(urls[0].url)
          
  
          setStreamUrl(urls[0].url);
  
          if (nextSong){axios.get(`/api/music/stream?id=${nextSong.videoId}`);}
          } catch (error){
  
              console.error("Unable to load stream", error);
  
              alert("Unable to find song, try again.")
          }
          
  
          
  
          } 


     function nextSong(){
        if(queue.length ===0) return

        let next;
        if(shuffle){
            let randomIndex;

            do{
                randomIndex = Math.floor(Math.random() * queue.length);
            } while (queue.length > 1 && randomIndex === currentIndex);
            next = queue[randomIndex];
            setCurrentIndex(randomIndex);
           
        }else{
        if (currentIndex < queue.length - 1){
      
                   next = queue[currentIndex + 1];
      
                  setCurrentIndex(currentIndex + 1);
      
                  
              }
      
          }
          playSong(next);
        }
      
          function previousSong(){
            if (history.length ===0) return;
            
            const lastSong = history[history.length -1];

            setHistory(prev => prev.slice(0,-1));

            const index = queue.findIndex(
                song => song.videoId === lastSong.videoId
            );

               if (index !==-1 ){
                setCurrentIndex(index)
               }
                  playSong(lastSong);
              
          }

        function shuffleSongs(array){
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i>0; i--){
                let j = Math.floor(Math.random() * (i+1));

                let temp = shuffled[i];
                shuffled[i] = shuffled[j];
                shuffled[j] = temp;

            
        }
            return shuffled;
            
        }
         function toggleShuffle(){
            setShuffle(prev => !prev);
         }

         async function loadLibrary() {
                 const response = await axios.get(
                     `http://localhost:3001/api/library/${currentUser._id}`
                 );
                 console.log("GET DATA:", response.data)
                 setLibrary(response.data);
                 
             }

    async function addSongToLibrary(song) {
        try {
            await axios.post("http://localhost:3001/api/library/song", {
                userId: currentUser._id,
                song: {
                    videoId: song.videoId,
                    title: song.title,
                    artists: song.artists,
                    thumbnail: song.thumbnails?.[0]?.url
                }
            });
            

            console.log("Song added!");
        } catch (err) {
            console.error(err);
        }
    }

    async function removeSongFromLibrary(videoId) {
        try {
            await axios.delete("http://localhost:3001/api/library/song", {
                data:{
                    userId: currentUser._id,
                    videoId
                }
            });
            

            console.log("Song removed");
            setLibrary(prev => ({
                ...prev,
                likedSongs: prev.likedSongs.filter(
                    song => song.videoId !== videoId
                )
            }))
            // loadLibrary()
        } catch (err) {
            console.error(err);
        }
    }



          return(
            <PlayerContext.Provider
                value={{
                    playSong,
                    playAlbum,
                    nextSong,
                    previousSong,
                    streamUrl,
                    currentSong,
                    currentAlbum,
                    queue,
                    currentIndex,
                    upscaleImage,
                    shuffle, 
                    toggleShuffle,
                    library,
                    loadLibrary,
                    addSongToLibrary,
                    removeSongFromLibrary
                }}
                >
                    {children}
            </PlayerContext.Provider>
          )
      
}

export function usePlayer(){
    return useContext(PlayerContext);
}
