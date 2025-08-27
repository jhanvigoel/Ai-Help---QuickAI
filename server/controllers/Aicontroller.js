import { OpenAI } from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_APIKEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
})

export const generateArticle = async (req,res)=>{
    try{
        const {userId} = req.auth();
        const {prompt, length} = req.body;

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
            });

            const content = response.choices[0].message.content

            await sql` INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

            res.json({ success: true, content})

    }catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}
