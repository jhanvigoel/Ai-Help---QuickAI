import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
    apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
  try {
    console.log('generateArticle called with:', { body: req.body, user: req.user, plan: req.plan, free_usage: req.free_usage });
    
    const userId = req.user?.id || "debug-user";
    const {prompt,length} = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt) {
      return res.json({success:false,message:"Prompt is required"});
    }

    if(plan !== 'premium' && free_usage >=10){
      return res.json({success:false,message:"You have reached your free usage limit. Upgrade to premium for unlimited access."});
    }

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens:length,
});

const content = response.choices[0].message.content

console.log('AI response received, saving to database...');

try {
  await sql` INSERT INTO creations (user_id, prompt, content, type)
  VALUES  (${userId}, ${prompt}, ${content}, 'article')`;
  console.log('Article saved to database successfully');
} catch (dbError) {
  console.error('Database error:', dbError);
  // Continue with response even if database save fails
}

    if(plan !== 'premium'){
      try {
        await clerkClient.users.updateUserMetadata(userId,{
          privateMetadata:{
            free_usage: free_usage + 1
          }
        });
        console.log('User metadata updated successfully');
      } catch (clerkError) {
        console.error('Clerk error:', clerkError);
        // Continue with response even if metadata update fails
      }
    }

    res.json({success:true,content});


  } catch (error) {
      console.log(error.message);
      res.json({success:false,message:error.message});
  }
};


export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.user?.id || "debug-user";
    const {prompt} = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if(plan !== 'premium' && free_usage >=10){
      return res.json({success:false,message:"You have reached your free usage limit. Upgrade to premium for unlimited access."});
    }


    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{role: "user", content: prompt}],
      temperature: 0.7,
      max_tokens: 100,
    });

    console.log('Gemini raw response:', response);
    const content = response.choices?.[0]?.message?.content;
    console.log('Gemini content:', content);
    // Try to split content into array of titles
    let titles = [];
    if (content) {
      // If Gemini returns numbered or bulleted list, split accordingly
      titles = content.split(/\n|\r|\d+\. |\- /).map(t => t.trim()).filter(t => t.length > 0);
      // If only one title, wrap in array
      if (titles.length === 0 && content.trim()) {
        titles = [content.trim()];
      }
    }
    console.log('Parsed titles:', titles);

    await sql` INSERT INTO creations (user_id, prompt, content, type)
    VALUES  (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      })
    }

    res.json({ success: true, titles });


  } catch (error) {
      console.log(error.message);
      res.json({success:false,message:error.message});
  }
};

export const generateImage = async (req, res) => {
  try {
    console.log('generateImage called with:', { body: req.body, user: req.user, plan: req.plan });
    
    const userId = req.user?.id || "debug-user";
    const {prompt, publish} = req.body;
    const plan = req.plan;

    if (!prompt) {
      return res.json({success:false,message:"Prompt is required"});
    }

    if(plan !== 'premium'){
      return res.json({success:false,message:"This feature is only available for premium users. Upgrade to premium for unlimited access."});
    }

    if (!process.env.STABILITY_API_KEY) {
      console.error('STABILITY_API_KEY is not set');
      return res.json({success:false,message:"Image generation service is not configured. Please set STABILITY_API_KEY in your environment variables."});
    }

    console.log('Calling Stability AI API with prompt:', prompt);
    
    let imageUrl;
    try {
      const response = await axios.post("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const imageData = response.data.artifacts[0].base64;
      console.log('Stability AI response received, generating image...');
      
      // Convert base64 to buffer and upload to Cloudinary
      const imageBuffer = Buffer.from(imageData, 'base64');
      const base64Image = `data:image/png;base64,${imageData}`;
      
      const result = await cloudinary.uploader.upload(base64Image);
      imageUrl = result.secure_url;
      console.log('Image uploaded to Cloudinary:', imageUrl);
      
    } catch (stabilityError) {
      console.error('Stability AI error:', stabilityError.response?.status, stabilityError.response?.data);
      return res.json({success:false,message:`Image generation failed: ${stabilityError.response?.data?.message || stabilityError.message}`});
    }

    // Save to database
    try {
      await sql` INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES  (${userId}, ${prompt}, ${imageUrl}, 'image', ${publish ?? false})`;
      console.log('Image saved to database successfully');
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with response even if database save fails
    }

    res.json({success:true,content:imageUrl});


  } catch (error) {
      console.log(error.message);
      res.json({success:false,message:error.message});
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    console.log('removeImageBackground called with:', { user: req.user, plan: req.plan, file: req.file });
    
    const userId = req.user?.id || "debug-user";
    const image = req.file;
    const plan = req.plan;

    if (!image) {
      return res.json({success:false,message:"No image file provided"});
    }

    if(plan !== 'premium'){
      return res.json({success:false,message:"This feature is only available for premium users. Upgrade to premium for unlimited access."});
    }

    console.log('Processing image with Cloudinary background removal...');
    
    const {secure_url} = await cloudinary.uploader.upload(image.path,{
      transformation:[
        {
          effect:'background_removal',
          background_removal: 'remove_the_background'
        }
      ]
    });

    console.log('Background removed successfully:', secure_url);

    // Save to database
    try {
      await sql` INSERT INTO creations (user_id, prompt, content, type)
      VALUES  (${userId}, 'Remove background from image', ${secure_url}, 'image')`;
      console.log('Image saved to database successfully');
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with response even if database save fails
    }

    res.json({success:true,content:secure_url,image:secure_url});

  } catch (error) {
      console.error('Background removal error:', error);
      res.json({success:false,message:error.message});
  }
};

export const removeImageObject = async (req, res) => {
  try {
    console.log('removeImageObject called with:', { user: req.user, plan: req.plan, file: req.file, body: req.body });
    
    const userId = req.user?.id || "debug-user";
    const {object} = req.body;
    const image = req.file;
    const plan = req.plan;

    if (!image) {
      return res.json({success:false,message:"No image file provided"});
    }

    if (!object) {
      return res.json({success:false,message:"No object specified to remove"});
    }

    if(plan !== 'premium'){
      return res.json({success:false,message:"This feature is only available for premium users. Upgrade to premium for unlimited access."});
    }

    console.log('Processing image with Cloudinary object removal for:', object);
    
    const {public_id} = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id,{
      transformation:[{effect: `gen_remove:${object}`}],
      resource_type:'image'
    });

    console.log('Object removed successfully:', imageUrl);

    // Save to database
    try {
      await sql` INSERT INTO creations (user_id, prompt, content, type)
      VALUES  (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;
      console.log('Image saved to database successfully');
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with response even if database save fails
    }

    res.json({success:true,content:imageUrl,url:imageUrl});

  } catch (error) {
      console.error('Object removal error:', error);
      res.json({success:false,message:error.message});
  }
};

export const resumeReview = async (req, res) => {
  try {
    const userId = req.user?.id || "debug-user";
    const resume = req.file;
    const plan = req.plan;

    if(plan !== 'premium'){
      return res.json({success:false,message:"This feature is only available for premium users. Upgrade to premium for unlimited access."});
    }

    if(resume.size > 5 * 1024 * 1024){
      return res.json({success:false,message:"Resume file size exceeds 5MB limit."});
    }

    const dataBuffer = fs.readFileSync(resume.path)
    const pdfData = await pdf(dataBuffer)

    const prompt = `Review the following resume and provide constructive feedback
    on its strengths, weakness, and areas for improvement. Resume Content:\n\n${pdfData.text}`

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens:1000,
});

const content = response.choices[0].message.content

await sql` INSERT INTO creations (user_id, prompt, content, type)
VALUES  (${userId},'Review the uploaded resume', ${content}, 'resume-review')`;

    res.json({success:true,content});

  } catch (error) {
      console.log(error.message);
      res.json({success:false,message:error.message});
  }
};