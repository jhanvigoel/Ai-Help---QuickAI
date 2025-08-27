import { clerkClient } from "@clerk/express";

//Middleware to check user plan and free usage

const USE_AUTH = process.env.USE_AUTH === "false";

export const auth = async (req, res, next)=>{

    if (USE_AUTH) {
    req.user = { id: "debug-user" }; // fake user for local testing
    return next();
  }

    try {
    const { userId } = await req.auth();
    if (!userId) {
      return res.json({ success: false, message: "No userId found" });
    }
    req.user = { id: userId }; // Set user for downstream use
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}