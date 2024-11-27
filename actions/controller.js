"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const login = async (username, password) => {
    const errors = {};

    // Validate inputs
    if (!username) errors.username = "Please enter a username";
    if (!password) errors.password = "Please enter a password";

    if (errors.username || errors.password) {
        return { errors, success: false };
    }

    // Simulate user validation
    if (username === "user" && password === "password") {
        // Create JWT token
        const token = jwt.sign({ username, userID: 123, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, process.env.JWTSECRET);

        // Set cookie
        cookies().set("vehicle", token, {
            httpOnly: true,
            samesite: "strict",
            maxAge: 60 * 60 * 24,  // 1 day
            secure: true  // Only set secure cookie in production
        });

        return { success: true };
    } else {
        return { errors: { username: "Invalid credentials" }, success: false };
    }
};