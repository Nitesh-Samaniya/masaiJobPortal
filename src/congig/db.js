const mongoose = require("mongoose");

const Connect = async ()=>{
    return await mongoose.connect(process.env.DB_URL);
}

module.exports = Connect;