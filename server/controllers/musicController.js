const veromeService = require("../services/verome");

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

async function streamSongs(req, res){

    try{
        const streamId = req.query.id;

        const songs = 
            await veromeService.streamSongs(streamId);
        res.json(songs)
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Search failed"
        });
    }
}
module.exports ={
    searchSongs,
    streamSongs
}