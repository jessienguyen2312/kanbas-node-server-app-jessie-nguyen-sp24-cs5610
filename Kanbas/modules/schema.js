import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    module_number: {type: String, required: true, unique: true },
    name: {
        type: String,
        default: "New module"
    },
    description: String,
    course: String,
    lessons: [{
        _id: String,
        name: String,
        description: String,
        module: String
    }]

}, {collection: "modules"})

export default moduleSchema;