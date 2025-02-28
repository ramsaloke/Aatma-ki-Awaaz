import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;
// REGISTER CONTROLLER
const registerUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const userDetails = await User.create({ userName, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { userName: userDetails.userName },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// LOGIN CONTROLLER
const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Finding user in DB
        const user = await User.findOne({ userName });
        if (!user || !user.password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, userName: user.userName },
            process.env.JWT_SECRET,  // ✅ Use env variable
            { expiresIn: "7d" }
        );

        // ✅ Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,   // ✅ Prevents XSS attacks
            secure: process.env.NODE_ENV === "production", // ✅ True for HTTPS
            sameSite: "none", // ✅ Required for cross-origin requests
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { userName: user.userName }, // ✅ Return only safe data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// logout 
const logoutUser = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
    res.json({ success: true, message: "Logged out successfully" });
};


export default { registerUser, loginUser , logoutUser };
