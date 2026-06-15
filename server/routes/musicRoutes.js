const express = require("express");
const router = express.Router();


const {
    searchSongs,
    streamSongs
} = require("../controllers/musicController");


router.get("/search", searchSongs);
router.get("/stream", streamSongs)
module.exports = router