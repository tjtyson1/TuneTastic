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

 async function getLibrary(req, res) {

    try{
        const library = await LibraryModel.findOne({
            userId: req.params.userId
        });

        res.json(library)
    }catch(err){
        res.status(500).json(err);
    }
 };

 module.exports = {
    addSong, getLibrary, removeSong
 }
    