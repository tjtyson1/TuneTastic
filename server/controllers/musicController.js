const veromeService = require("../services/verome");
const {resolveStreamUrl} = require("../services/resolver")


async function searchSongs(req, res) {

    try{
        const query = req.query.q;
        const queryType = req.query.filter    
        
        const songs = 
            await veromeService.searchSongs(query, queryType);
        
        res.json(songs);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Search failed"
        });
    }
}

async function streamSongs(req, res) {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Missing video id"
            });
        }

        const streamUrl = await veromeService.streamSongs(id);

        return res.json({
            success: true,
            streamingUrls: [
                { url: streamUrl }
            ]
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

async function getAlbum(req, res){

    try{
        const browseId = req.params.id;

        const album = 
            await veromeService.getAlbum(browseId)
        res.json(album)
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Search failed"
        });
    }
}

async function getArtist(req, res){

    try{
        const browseId = req.params.id;

        const album =
            await veromeService.getArtist(browseId)
        res.json(album)
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Search failed"
        });
    }
}
module.exports ={
    searchSongs,
    streamSongs,
    getAlbum,
    getArtist,
}