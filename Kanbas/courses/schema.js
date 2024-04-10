import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
        course_number: { type: String, required: true, unique: true},
        name: {
            type: String,
            default: "New Course"
        },
        number: {
            type: String,
            default: "RS4550"
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: Date.now
        },
        image: {
            type: String,
            default: "clown.jpg"
        },
        color: {
            type: String,
            default: "#f542e3"
        },
        code: {
            type: String,
            default: "69420"
        },
        label: {
            type: String,
            default: "SEC 07 Spring 2024 [BOS-2-TR]"
        },
        description: {
            type: String,
            default: "202430_2 Spring 2024 Semester Full Term Grad"
        },
    },
    {collection: "courses"});

export default courseSchema;