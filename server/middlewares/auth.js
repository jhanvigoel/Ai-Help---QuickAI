import { clerkClient } from "@clerk/express";



const DISABLE_AUTH = process.env.USE_AUTH === "false";

export const auth = async (req, res, next)=>{

    if (DISABLE_AUTH) {
    req.user = { id: "debug-user" }; 
    req.plan = "premium"; 
    req.free_usage = 0; 
    return next();
  }

    try {
    const { userId } = await req.auth();
    if (!userId) {
      return res.json({ success: false, message: "No userId found" });
    }
    
    
    const user = await clerkClient.users.getUser(userId);
    const privateMetadata = user.privateMetadata || {};
    
    req.user = { id: userId }; 
    req.plan = privateMetadata.plan || "free"; 
    req.free_usage = privateMetadata.free_usage || 0; 
    
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}