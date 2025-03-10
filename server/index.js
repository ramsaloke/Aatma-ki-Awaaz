import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import express from 'express';
import authRoutes from './routes/auth-routes.js';
import profileRoutes from './routes/profile-router.js';
import path from 'path';
import cors from 'cors';
import connectToDB from './database/db.js';
const app = express();
import { fileURLToPath } from "url";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the "uploads" folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true })); // Add this middleware



connectToDB();


const PORT = process.env.PORT || 8080;
//middleware
const allowedOrigins = [
    "https://aatma-ki-awaaz-1.onrender.com",  // ✅ Your frontend URL
    "http://localhost:5173"  // ✅ Local development
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Allows cookies
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors()); // Handle preflight requests


app.use(express.json());
app.use(cookieParser());

//middleware
app.use('/api/auth',authRoutes)
app.use('/api/auth',profileRoutes)

app.listen(PORT,()=>{
    console.log(`server is running at port http://localhost:${PORT}`);
    
})