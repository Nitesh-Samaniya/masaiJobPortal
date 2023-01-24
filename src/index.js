require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const connect = require("./congig/db");
const PORT = process.env.PORT;

const UserRoute = require("./routes/user.route");
const JobROute = require("./routes/job.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use("/user", UserRoute);
app.use("/job", JobROute);

mongoose.set("strictQuery", false);

app.get("/", (req,res)=>{
    return res.send("home page");
})

app.listen(PORT, ()=>{
    connect();
    console.log(`listening at http://localhost:${PORT}`);
})