const { Schema, model } = require("mongoose");

const JobSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
},{
    timestamps: true,
    versionKey: false,
});

const JobModel = new model("joblist",JobSchema);

module.exports = JobModel;