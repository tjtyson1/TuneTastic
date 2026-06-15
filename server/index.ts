
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/User')
const app = express()
const musicRoutes = require("./routes/musicRoutes");


app.use(express.json())
app.use(cors())
app.use("/api/music", musicRoutes);
mongoose.connect("mongodb://127.0.0.1:27017/user")

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB Error:', err);
});


app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user =>{
        if(user){
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else{
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})