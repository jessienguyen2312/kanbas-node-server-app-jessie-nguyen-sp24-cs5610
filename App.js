import "dotenv/config";
import express from 'express';
import mongoose from "mongoose"
import session from "express-session";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignment/routes.js";
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";


mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express()
Hello(app)
app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: "https://kanbas-node-server-app-jessie-nguyen.onrender.com"
    };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app)
app.listen(process.env.PORT || 4000)