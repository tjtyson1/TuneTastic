import { createContext, useContext, useState, useEffect} from "react";
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
    const [isVisible, setVisible] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [library, setLibrary] = useState({
            likedSongs: [],
            likedAlbums: [],
            playlists: [],
            recentlyPlayed: [],
        }) 
    const [playlistName, setPlaylistName] = useState("")

    const API_URL = import.meta.env.VITE_API_URL;

    const [showNotification, setShowNotification] = useState({
        show: false,
        message: "",
        showTime: 3
    })

    const [loadedPlayer ,setLoadedPlayer] = useState(false)

    const [currentTime, setCurrentTime] = useState(0)
    
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(localStorage.getItem("user")) : null;
    });
    
    console.log(currentSong)
    
    useEffect(() => {
    if (currentSong) {
        localStorage.setItem(
            "currentSong",
            JSON.stringify(currentSong)
        );
    }
}, [currentSong]);

    useEffect(() =>{
        if (!loadedPlayer) return
        localStorage.setItem("history", JSON.stringify(history))
    },[history]);

     useEffect(() => {
        if (!loadedPlayer) return
        localStorage.setItem("queue", JSON.stringify(queue));
    }, [queue]);
     
    useEffect(() => {
        if (!loadedPlayer) return
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    }, [currentIndex]);

    

    useEffect(() => {
    const savedQueue = JSON.parse(localStorage.getItem("queue") || "[]");
    
    const savedSong = JSON.parse(localStorage.getItem("currentSong"));

    const savedHistory = JSON.parse(localStorage.getItem("history" || []));
    
    const savedIndex = JSON.parse(localStorage.getItem("currentIndex" ));
    

    if (savedQueue?.length) {
        setQueue(savedQueue);
    }
    if (savedHistory?.length){
        setHistory(savedHistory);
    }
    if (savedIndex !== null){
        setCurrentIndex(savedIndex);
    }
     if (savedSong) {
        playSong(normalizeSong(savedSong), savedQueue, true);
     }
     setLoadedPlayer(true)
    }, []);


useEffect(() => {
    if(currentUser)
        {loadLibrary();}
}, [currentUser]);


     async function playAlbum(album, index = 0, shuffle = false) {
            if (!album || !album.tracks?.length) {
        console.warn("Invalid album passed to playAlbum:", album);
        return;
    }
        
        setCurrentAlbum(album)
        console.log(album?.tracks?.length)
        
        const albumTracks = album?.tracks?.map(track => normalizeSong(track,album))
        const playlist = shuffle ? shuffleSongs([...albumTracks]) : albumTracks 
        const albumArtist = album?.artist?.name
        
        setQueue(playlist);
        console.log(queue)
        setCurrentIndex(index);
        await playSong (normalizeSong(playlist[index], album), playlist);
    }

    function upscaleImage(url, size) {
            //   if (!url) return albumPlaceHolder;
              return url?.replace(/w\d+-h\d+/, `w${size}-h${size}`);
          }
    
    async function selectSong(song, queue){
        
    }

     async function playSong(song, songList = [], restore = false){
        
        if (currentSong?.videoId !== song.videoId) {
            setCurrentTime(0);
        }

         if (!restore && currentSong?.videoId !== song.videoId) {
            setCurrentTime(0);
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
                  `${API_URL}/api/music/stream?id=${song.videoId}`
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
        
         if (currentSong){
                setHistory(prev => {
                    const last = prev[prev.length - 1];
                    const updated = [...prev, currentSong]
                    if (last?.videoId === currentSong.videoId){
                        return prev;
                    }
                return updated.slice(-50)
                });
              }
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
          playSong(normalizeSong(next), queue);
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
                  playSong(normalizeSong(lastSong), queue, false);
              
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
             if (!currentUser) return;
                 const response = await axios.get(
                     `${API_URL}/api/library/${currentUser?._id}`
                 );
                 console.log("GET DATA:", response.data)
                 setLibrary(response.data);
                 
             }

    async function addSongToLibrary(song) {
        try {
            await axios.post(`${API_URL}/api/library/song`, {
                userId: currentUser?._id,
                song: {
                    videoId: song.videoId,
                    title: song.title,
                     artists: Array.isArray(song.artists)
                    ? song.artists.map(artist => ({
                        name: artist.name || "",
                        browseId: artist.browseId || artist.id || ""
                    }))
                    : [
                        {
                            name: song.artists?.name || "",
                            browseId: song.artists?.browseId || ""
                        }
                    ],

                thumbnail: song.thumbnails?.[0]?.url || song.thumbnail
            }
        });

            

            setShowNotification({show: true, message: `${song.title} added`, showTime: 3})
        } catch (err) {
            console.error(err);
        }
    }
    async function addAlbumToLibrary(album) {
        try {
            await axios.post(`${API_URL}/api/library/album`, {
                userId: currentUser?._id,
                album: {
                    browseId: album?.album?.browseId || album.browseId,
                    title: album?.album?.title || album.title,
                    artists: [{name: album?.artist?.name || album?.artists?.[0]?.name, browseId: album?.artist?.browseId || album.artistBrowseId || album.artists?.[0]?.browseId}],
                    thumbnail: album?.album?.thumbnail || album?.thumbnails?.[0]?.url
                }
            });
            

            setShowNotification({show: true, message: `${album?.album?.title || album.title} added to Library`, showTime: 3})
        } catch (err) {
            console.error(err);
        }
    }

    async function removeSongFromLibrary(videoId) {
        try {
            await axios.delete(`${API_URL}/api/library/song`, {
                data:{
                    userId: currentUser?._id,
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
     async function removeAlbumFromLibrary(browseId) {
        try {
            await axios.delete(`${API_URL}/api/library/album`, {
                data:{
                    userId: currentUser?._id,
                    browseId
                }
            });
            

            console.log("Song removed");
            setLibrary(prev => ({
                ...prev,
                likedAlbums: prev.likedAlbums.filter(
                    album => album.browseId !== browseId
                )
            }))
            // loadLibrary()
        } catch (err) {
            console.error(err);
        }
    }

    async function addPlaylist(name){
        try {
            const response = await axios.post(`${API_URL}/api/library/playlist`, {
                userId: currentUser?._id,
                name
                
            });
            console.log("playlist added");
            setShowNotification({show: true, message: `${name} added`, showTime: 3})

            setLibrary(response.data)
            
        }catch(error){
            console.error(error)
        }
        
    }
    async function removePlaylist(playlistId){
        try {
             await axios.delete(`${API_URL}/api/library/playlist`, {
                data:{
                     userId: currentUser?._id,
                    playlistId
                }
            });
            

             setLibrary(prev => ({
                ...prev,
                playlists: prev.playlists.filter(
                    p => p._id !== playlistId
                )
            }))
            console.log("playlist removed");
            
        }catch(error){
            console.error(error)
        }
        
    }

    async function addSongToPlaylist(song, playlistId, playlistName){
        try {
            await axios.post(`${API_URL}/api/library/playlist/song`, {
                userId: currentUser?._id,
                playlistId,
                song: {
                    videoId: song.videoId,
                    title: song.title,
                     artists: Array.isArray(song.artists)
                    ? song.artists.map(artist => ({
                        name: artist.name || "",
                        browseId: artist.browseId || artist.id || ""
                    }))
                    : [
                        {
                            name: song.artists?.name || "",
                            browseId: song.artists?.browseId || ""
                        }
                    ],

                thumbnail: song.thumbnails?.[0]?.url || song.thumbnail
            }
        });

            

            setShowNotification({show: true, message: `${song.title} added  to ${playlistName}`, showTime: 3})
        } catch (err) {
            console.error(err);
        }
    }

    async function removeSongFromPlaylist(playlistId, videoId){
         try {
            await axios.delete(`${API_URL}/api/library/playlist/song`, {
                 data:{
                    userId: currentUser?._id,
                    playlistId,
                    videoId
                }
            });
           
            setLibrary(prev => ({
                ...prev,
                playlists: prev.playlists.map(playlist => 
                    playlist._id === playlistId ? 
                    {
                        ...playlist,
                        songs: playlist.songs.filter(
                            song => song.videoId !== videoId
                        ),
                    }
                    : playlist
                ),
                
                 
            }));
            

            console.log("Song removed!");
        } catch (err) {
            console.error(err);
        }


    }

    function addSongToQueue(song){
        
        
        setQueue(prev => { const updatedQueue = prev.filter( queue => queue?.videoId !== song.videoId );
    
        return [...updatedQueue.slice(0, currentIndex + 1),song, ...updatedQueue.slice(currentIndex + 1)];
    });
    }

    function openDropdown(event, song){

        const rect = event.currentTarget.getBoundingClientRect();

        const menuHeight = 180;
        const menuWidth = 180

        const openUp = rect.bottom + menuHeight > window.innerHeight;
        const openLeft = rect.right + menuWidth > window.innerWidth;

        setOpenMenu({
            song, 
            x: openLeft ? rect.right - menuWidth : rect.left,
            
            y: openUp ? rect.top - menuHeight : rect.bottom,
            openUp,
            openLeft,
        });
    }

    function normalizeSong(song, album = null) {
        return {
            ...song,

            artists: Array.isArray(song.artists)
                ? song.artists.map(artist => ({
                    name: artist.name,
                    browseId: artist.browseId ?? null
                }))
                : song.artists?.name
                    ? [song.artists]
                    : song.artist
                        ? [{
                            name: song.artist,
                            browseId: song.artistBrowseId ?? null
                        }]
                        : album?.artist
                            ? [{
                                name: album.artist.name,
                                browseId: album.artist.browseId
                            }]
                            : [],
            
            thumbnails: song.thumbnails?.length
            ? song.thumbnails 
            : album?.album?.thumbnail
                ? [{ url: upscaleImage(album.album.thumbnail, 60)}]
                : [],

            album: song.album ?? (
                album
                    ? {
                        title: album.album.title,
                        browseId: album.album.browseId,
                        thumbnail: album.album.thumbnail,
                    }
                    : null
            ),

                videoId: song.videoId,
        };
    }
        
        
    
    


          return(
            <PlayerContext.Provider
                value={{
                    playSong,
                    playAlbum,
                    nextSong,
                    previousSong,
                    streamUrl,
                    setStreamUrl,
                    currentSong,
                    setCurrentSong,
                    currentAlbum,
                    queue,
                    setQueue,
                    history,
                    setHistory,
                    currentIndex,
                    upscaleImage,
                    shuffle, 
                    toggleShuffle,
                    library,
                    setLibrary,
                    loadLibrary,
                    addSongToLibrary,
                    removeSongFromLibrary,
                    addAlbumToLibrary,
                    removeAlbumFromLibrary,
                    setVisible,
                    isVisible,
                    addPlaylist,
                    playlistName,
                    setPlaylistName,
                    removePlaylist, 
                    addSongToPlaylist,
                    setShowDropdown,
                    showDropdown,
                    openMenu,
                    setOpenMenu,
                    currentUser,
                    setCurrentUser,
                    removeSongFromPlaylist,
                    showNotification, setShowNotification,
                    currentTime,setCurrentTime,
                    addSongToQueue, openDropdown,
                    normalizeSong,API_URL
                    

                }}
                >
                    {children}
            </PlayerContext.Provider>
          )
}


export function usePlayer(){
    return useContext(PlayerContext);
}
