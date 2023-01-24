const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{value} this is email is not valid`,
            isAsync: false
        }        
    },
    password: {
        type: String,
        required: true,
    }, 
    role: {
        type: String,
        enum: ["admin", "user"],
        default : "user"
    }
});

const UserModel = new model("user",UserSchema);

module.exports = UserModel;