import React, {useState} from 'react'

function Home(){
    
    const [songs, setSongs] = useState(["song1"]);

    //for(let i =0; i<songs.length; i++){updateSongs}
    function handleAddSong(){
        const newSong = document.getElementById("songInput").value;
        document.getElementById("songInput").value = "";
        setSongs(s => [ ...s, {songTitle: newSongTitle,
                               artist: newArtist,
                               album: newAlbum,
                               songCover: newSongCover,

        }])
    }

    function handleRemoveSong(index){
        setSongs(songs.filter((_,i) => i !==index))

    }
    return(
        <div>
            <nav className="bg-blue-500 text-white">
                <div className="h-16 flex justify-around items-center hidden:sm">
                    <div className="text-3xl font-bold px-4">LOGO</div>
                    <div className=" flex w-full justify-around items-center">
                        <a href="/library" className="text-xl px-4  border rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center hover:scale-105 ">LIBRARY</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">PLAYLIST</a>
                        <a href="/search" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SEARCH</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SETTINGS</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">LOG IN/SIGN UP</a>
                    </div>
                   
                </div>
            </nav>
            <div>Library</div>
            <div> 
                <ul>{songs.map((song, index) => 
                    <li key={index} onClick={() => handleRemoveSong(index)}>{song}</li>)}</ul>
                <input type="text"  id="songInput" placeholder=' enter song'/>
                <button onClick={handleAddSong}> Add Song</button>
                </div>
        </div>
    )

}

export default Home