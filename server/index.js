
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/User')
const LibraryModel = require('./models/Library')
const app = express()
const musicRoutes = require("./routes/musicRoutes");
const libraryRoutes = require("./routes/LibraryRoutes");

require("dotenv").config(); 
app.use(express.json())
app.use(cors())
app.use("/api/music", musicRoutes);
app.use("/api/library", libraryRoutes);

// mongoose.connect("mongodb://127.0.0.1:27017/user")
mongoose.connect(process.env.MONGODB_URI)
.then( () => {
    console.log("Connected to MongoDB!!")
}).catch((err) => {
        console.error("MongoDB Error:", err);
    });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB Error:', err);
});

app.get("/", (req, res) =>{
    res.send("server is running")
})
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email: email})
       
        if(!user){
            return res.json({ success: false, message: "No record existed"});
        }
        if (user.password !== password) {
            return res.json({ success: false, message: "Incorrect password"});
        }
        res.json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }catch (err){
        res.status(500).json(err);
    }
})


app.post('/register', async (req, res) => {
    try{
        const user = await UserModel.create(req.body);
        await LibraryModel.create({
            userId: user._id,
            likedSongs: [],
            likedAlbums: [],
            recentlyPlayed: [] 
        });

        res.json(user);
    }catch (err) {
        res.status(500).json(err)
    }
})

const PORT = process.env.PORT ||3001

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})