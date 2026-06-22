const express = require("express");
const router = express.Router();


const {
    searchSongs,
    streamSongs,
    getAlbum
} = require("../controllers/musicController");


router.get("/search", searchSongs);
router.get("/stream", streamSongs);
router.get("/albums/:id", getAlbum);
module.exports = router