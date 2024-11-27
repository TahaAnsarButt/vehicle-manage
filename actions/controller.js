"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getCollection } from "../lib/db"; // Ensure you import getCollection

export const login = async (username, password) => {
    const errors = {};

    // Validate inputs
    if (!username) errors.username = "Please enter a username";
    if (!password) errors.password = "Please enter a password";

    if (errors.username || errors.password) {
        return { errors, success: false };
    }

    const usersCollection = await getCollection("users"); // Get the 'users' collection from DB

    // Look for a user with the provided username
    const user = await usersCollection.findOne({ username });

    // If no user found, return error
    if (!user) {
        return { errors: { username: "User not found" }, success: false };
    }

    // If the user is found, compare the password (use bcrypt or another hashing method in real scenarios)
    if (user.password !== password) { // You should use bcrypt here for hashing passwords
        return { errors: { password: "Invalid password" }, success: false };
    }

    // Create JWT token (you can store additional user data in the token as needed)
    const token = jwt.sign({ username, userID: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, process.env.JWTSECRET);

    // Set cookie
    cookies().set("vehicle", token, {
        httpOnly: true,
        samesite: "strict",
        maxAge: 60 * 60 * 24,  // 1 day
        secure: process.env.NODE_ENV === 'production',  // Only set secure cookie in production
    });

    return { success: true };
};
