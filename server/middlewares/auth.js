import { clerkClient } from "@clerk/express";

//Middleware to check user plan and free usage

const DISABLE_AUTH = process.env.USE_AUTH === "false";

export const auth = async (req, res, next)=>{

    if (DISABLE_AUTH) {
    req.user = { id: "debug-user" }; // fake user for local testing
    req.plan = "premium"; // Set default plan for testing
    req.free_usage = 0; // Set default free usage for testing
    return next();
  }

    try {
    const { userId } = await req.auth();
    if (!userId) {
      return res.json({ success: false, message: "No userId found" });
    }
    
    // Get user metadata to check plan and free usage
    const user = await clerkClient.users.getUser(userId);
    const privateMetadata = user.privateMetadata || {};
    
    req.user = { id: userId }; // Set user for downstream use
    req.plan = privateMetadata.plan || "free"; // Default to free plan
    req.free_usage = privateMetadata.free_usage || 0; // Default to 0 free usage
    
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}