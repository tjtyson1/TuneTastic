const express = require("express");
const router = express.Router();


const {
    searchSongs,
    streamSongs,
    getAlbum,
    getArtist,
} = require("../controllers/musicController");


router.get("/search", searchSongs);
router.get("/stream", streamSongs);
router.get("/albums/:id", getAlbum);
router.get("/artists/:id", getArtist)
module.exports = router