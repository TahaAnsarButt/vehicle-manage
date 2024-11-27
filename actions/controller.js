"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getCollection } from "../lib/db"; 

export const login = async (username, password) => {
    const errors = {};

    if (!username) errors.username = "Please enter a username";
    if (!password) errors.password = "Please enter a password";

    if (errors.username || errors.password) {
        return { errors, success: false };
    }

    const usersCollection = await getCollection("users"); 

    const user = await usersCollection.findOne({ username });
    console.log(user)
    
    if (!user) {
        return { errors: { username: "User not found" }, success: false };
    }

    if (user.password !== password) {
        return { errors: { password: "Invalid password" }, success: false };
    }

    const token = jwt.sign({ username, userID: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, process.env.JWTSECRET);

    console.log('token',token)
    cookies().set("vehicle", token, {
        httpOnly: true,
        samesite: "strict",
        maxAge: 60 * 60 * 24,  // 1 day
        secure: process.env.NODE_ENV === 'production',  
    });

    return { success: true };
};
