"use server";
import { getCollection } from "../lib/db";

import jwt from "jsonwebtoken";
export const Save = async (formData, token) => {
    const { phoneNumber, price, model, pictures } = formData;
    const errors = {};

    // Validate inputs
    if (!phoneNumber || !/^\d{11}$/.test(phoneNumber)) {
        errors.phoneNumber = "Phone number must be exactly 11 digits.";
    }
    if (!price || isNaN(price) || price <= 0) {
        errors.price = "Price must be a positive number.";
    }
    if (!model || typeof model !== "string" || model.trim().length === 0) {
        errors.model = "Model is required.";
    }
    if (!Array.isArray(pictures) || pictures.length === 0) {
        errors.pictures = "You must upload at least one picture.";
    }

    if (Object.keys(errors).length > 0) {
        return { errors, success: false };
    }

    let userID;
        const decoded = jwt.decode(token);
        userID = decoded?.userID; 

    const collection = await getCollection("vehicle");
    const result = await collection.insertOne({
        phoneNumber,
        price,
        model,
        pictures,
        userID
    });

    return { success: true, id: result.insertedId };
};
