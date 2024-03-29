import express from 'express';
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
const app = express()
Hello(app)
app.use(cors());
app.use(express.json());

Lab5(app)
app.listen(4000)