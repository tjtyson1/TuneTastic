const express = require("express");
const router = express.Router();

const {addSong, getLibrary, removeSong, addAlbum, removeAlbum, addPlaylist, removePlaylist, addSongToPlaylist, removeSongFromPlaylist, getPlaylist
} = require("../controllers/LibraryController");

router.post("/song", addSong);
router.post("/album", addAlbum)
router.get("/:userId", getLibrary);
router.delete("/song",removeSong)
router.delete("/album", removeAlbum)
router.post("/playlist", addPlaylist)
router.post("/playlist/song", addSongToPlaylist)
router.delete("/playlist", removePlaylist)
router.delete("/playlist/song", removeSongFromPlaylist),
router.get("/playlist/:userId/:playlistId", getPlaylist)

module.exports = router;