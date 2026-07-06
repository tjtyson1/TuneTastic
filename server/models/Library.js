const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    browseId: String,
    title: String,
    artists: [{
        name: String
        }],
    thumbnail: String


}, {_id: false});
const SongSchema = new mongoose.Schema({
    videoId: String,
    title: String,
    artists: [{
        name: String
        }],
    thumbnail: String


}, {_id: false});

const LibrarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  likedSongs: [SongSchema],
  likedAlbums: [AlbumSchema],
  recentlyPlayed: [SongSchema]
}, {
    timestamps: true
});

const LibraryModel = mongoose.model("Library", LibrarySchema);
module.exports = LibraryModel