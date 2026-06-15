const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: String,
    userId: String,
    songs: Array
});

PlaylistModel = mongoose.model("Playlist", PlaylistSchema);
module.exports = PlaylistModel