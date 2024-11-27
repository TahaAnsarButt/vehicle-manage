"use server";
import { cookies } from "next/headers";
import { headers } from "../next.config"
import jwt from "jsonwebtoken"
export async function getUserFromCookie() {
    const theCookie = cookies().get("vehicle")?.value;
    if (theCookie) {
        try {
            console.log("Cookie")
            const decoded = jwt.verify(theCookie, process.env.JWTSECRET)
            return decoded;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}