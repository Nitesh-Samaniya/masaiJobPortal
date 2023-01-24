const express = require("express");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const UserModel = require("../models/user.model");

const app = express.Router();

app.get("/", (req,res)=>{
    return res.send("user's route")
});

app.post("/signup", async(req,res)=>{
    const {name, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        return res.status(400).send("try with another email");
    }else{
        try{
            const [a,domain] = email.split('@');
            const hash = await argon2.hash(password);
            if(domain === "masaischool.com"){
                const newUser = new UserModel({name, email, password: hash, role: "admin"});
                await newUser.save();
                return res.status(201).send(newUser);
            }else{
                const newUser = new UserModel({name, email, password: hash, role: "user"});
                await newUser.save();
                return res.status(201).send(newUser);
            }
        }catch(e){
            return res.status(409).send(e.message);
        }
    }
})

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    if(await argon2.verify(user.password, password)){
        const token = jwt.sign(
            {id: user._id, name: user.name, email: user.email},
            "SecrectToken",
            {expiresIn: "7 days"}
        );

        const refreshToken = jwt.sign(
            {id: user._id, name: user.name, email: user.email},
            "RefreshToken",
            {expiresIn: "28 days"}
        );

        return res.status(200).send({
            token: token,
            user
        })
    }else{  
        return res.status(401).send("wrong credentials");
    }
})

module.exports = app;