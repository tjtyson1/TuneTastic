const LibraryModel = require("../models/Library");

 async function addSong(req, res) {

    try{
        const { userId, song } = req.body;
        console.log("userId:", userId);
        console.log("song:", song);

        const library = await LibraryModel.findOne({userId});
        console.log("library before:", library);

        if (!library){
              library = new LibraryModel({
                userId,
                likedSongs: [],
                likedAlbums: [],
                playlists: [],
                recentlyPlayed: []
            });
        }

        const exists = library.likedSongs.some(s => s.videoId === song.videoId);

        if (!exists) { 
            library.likedSongs.push(song);

            console.log("after push:", library.likedSongs);

            await library.save();

            console.log("after save:", library)
        }

        res.json(library);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }
};

async function removeSong(req, res) {

    try{
        const { userId, videoId } = req.body;
        console.log("userId:", userId);
        

        const library = await LibraryModel.findOne({userId});
        console.log("library before:", library);

        if (!library){
              return res.status(404)
        }

        
        library.likedSongs = library.likedSongs.filter(song => song.videoId !==videoId);

        console.log("after filter:", library.likedSongs);

        await library.save();

        console.log("after save:", library)


        res.json(library);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }
};

 async function addAlbum(req, res) {

    try{
        const { userId, album } = req.body;
        console.log("userId:", userId);
        console.log("Album:", album);

        const library = await LibraryModel.findOne({userId});
        console.log("library before:", library);

        if (!library){
              library = new LibraryModel({
                userId,
                likedAlbums: [],
                likedAlbums: [],
                playlists: [],
                recentlyPlayed: []
            });
        }

        const exists = library.likedAlbums.some(a => a.browseId === album.browseId);

        if (!exists) { 
            library.likedAlbums.push(album);

            console.log("after push:", library.likedAlbums);

            await library.save();

            console.log("after save:", library)
        }

        res.json(library);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }
};

async function removeAlbum(req, res) {

    try{
        const { userId,  browseId } = req.body;
        console.log("userId:", userId);
        

        const library = await LibraryModel.findOne({userId});
        console.log("library before:", library);

        if (!library){
              return res.status(404)
        }

        
        library.likedAlbums = library.likedAlbums.filter(album => album.browseId !== browseId);

        console.log("after filter:", library.likedAlbums);

        await library.save();

        console.log("after save:", library)


        res.json(library);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }
};

async function addPlaylist(req,res){
    try{
        const {userId, name} = req.body
        console.log(req.body);
        let library = await LibraryModel.findOne({userId});

         if (!library){
              library = new LibraryModel({
                userId,
                likedSongs: [],
                likedAlbums: [],
                playlists: [],
                recentlyPlayed: []
            });
        }

       const exists = library.playlists.some( p => p.name  === name);

       if (!exists){
            library.playlists.push({name, songs: []});
            await library.save()
       }
       res.json(library)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}
async function removePlaylist(req,res){
    try{
        const {userId, playlistId} = req.body
        
        let library = await LibraryModel.findOne({userId});

         if (!library){
              return res.status(404)
            };

        library.playlists = library.playlists.filter(p => p._id.toString()  !== playlistId);

        await library.save();

        res.json(library)

    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

async function addSongToPlaylist(req, res){
    try{
        const { userId, playlistId, song } = req.body;
        console.log("song", song)

        let library = await LibraryModel.findOne({ userId });

        if (!library) {
            return res.status(404).json({ message: "Library not found" });
        }
        
        const playlist = library.playlists.id(playlistId)
        if (!playlist){
            return res.status(404).json({message: "Playlist not found"})
        }
        const exists = playlist.songs.some(s=> s.videoId === song.videoId);
        if (!exists) {
            playlist.songs.push(song);
            await library.save();
        }
        res.json(playlist)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

}

async function removeSongFromPlaylist(req, res){
    try{
        const { userId, playlistId, videoId } = req.body;
        
        let library = await LibraryModel.findOne({ userId });

        if (!library) {
            return res.status(404).json({ message: "Library not found" });
        }

        
         const playlist = library.playlists.id(playlistId)
        
            if (!playlist){
            return res.status(404).json({message: "Playlist not found"})
        }

        playlist.songs = playlist.songs.filter( song => song.videoId !== videoId) 
        
        await library.save();
        res.json(playlist)

        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

}

 async function getLibrary(req, res) {

    try{
        let library = await LibraryModel.findOne({
            userId: req.params.userId
        });

        res.json(library)
    }catch(err){
        res.status(500).json(err);
    }
 };

 async function getPlaylist(req, res) {


    try{

        let library = await LibraryModel.findOne({ userId: req.params.userId })
        const playlist = library.playlists.id(req.params.playlistId);
        
        if (!playlist){
            return res.status(404).json({message: "Playlist not found"})
        }

        res.json(playlist)
    }catch(err){
        res.status(500).json(err);
    }
 }

 module.exports = {
    addSong, getLibrary, removeSong, addAlbum, removeAlbum, addPlaylist, removePlaylist, addSongToPlaylist, removeSongFromPlaylist, getPlaylist
}
    