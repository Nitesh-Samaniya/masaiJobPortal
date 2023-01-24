const express = require("express");

const JobModel = require("../models/job.model");

const app = express.Router();

app.get("/", async (req,res)=>{
    try{
        const data = await JobModel.find();
        return res.status(201).send(data);
    }catch(e){
        return res.status(500).send(e.message);
    }
});

app.post("/create", async(req,res)=>{
    const {companyName, position, contact, location} = req.body;
    
        try{
            const newPost = new JobModel({companyName, position, contact, location});
            await newPost.save();
            return res.status(201).send(newPost);
        }
        catch(e){
            return res.status(409).send(e.message);
        }
})



module.exports = app;