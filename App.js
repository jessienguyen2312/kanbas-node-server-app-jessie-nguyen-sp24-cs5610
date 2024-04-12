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

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'

const branches = ["main", "a5", "a6"];
const strippedNetlifyUrl = process.env.NETLIFY_URL.replace("https://", "");
const allowedOrigins = [process.env.LOCAL_FRONTEND_URL, ...branches.map((branch) => `https://${branch}--${strippedNetlifyUrl}`)];

mongoose.connect(CONNECTION_STRING, {dbName: "kanbas"});
const app = express()
Hello(app)
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    }
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