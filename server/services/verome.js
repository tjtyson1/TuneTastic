const axios = require('axios');
require("dotenv").config(); 
const VEROME_URL = process.env.VEROME_URL

async function searchSongs(query, queryType){
    const response = await axios.get(
        `${VEROME_URL}/api/search?q=${query}&filter=${queryType}` 
    );

    return response.data;
}

async function streamSongs(streamId){
    const response = await axios.get(
        `${VEROME_URL}/api/stream?id=${streamId}`
    );
    return response.data;
}

async function getAlbum(browseId){
    const response = await axios.get(
        `${VEROME_URL}/api/albums/${browseId}`
    );
    return response.data;
}

async function getArtist(browseId){
    const response = await axios.get(
        `${VEROME_URL}/api/artists/${browseId}`
    )
    return response.data
}
module.exports = {
    searchSongs,
    streamSongs,
    getAlbum,
    getArtist,
};
