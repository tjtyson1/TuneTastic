const express = require("express");
const router = express.Router();

const {addSong, getLibrary, removeSong} = require("../controllers/LibraryController");

router.post("/song", addSong);
router.get("/:userId", getLibrary);
router.delete("/song",removeSong)

module.exports = router;