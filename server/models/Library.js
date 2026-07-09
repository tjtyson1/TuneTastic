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

const PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true    
    },
    songs: [SongSchema],

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const LibrarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  likedSongs: [SongSchema],
  likedAlbums: [AlbumSchema],
  playlists: [PlaylistSchema],
  recentlyPlayed: [SongSchema]
}, {
    timestamps: true
});

const LibraryModel = mongoose.model("Library", LibrarySchema);
module.exports = LibraryModel