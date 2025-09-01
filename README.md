🚀 QuickAI – AI Help

QuickAI is a full-stack AI-powered web application built with React (frontend) and Express (backend). It integrates Clerk for authentication and Google Gemini (Generative AI) for content generation, along with additional AI services for image editing and resume review.

⚠️ Note: This project is not hosted online. You must run both the frontend and backend locally on your machine.

✨ Features

🔑 User Authentication with Clerk

💡 AI Article & Blog Title Generator (Gemini API)

🎨 AI Image Tools – image generation, background/object removal

📄 AI Resume Review & Suggestions

📊 Usage Tracking with free & premium upgrade logic

🛠️ Getting Started
Prerequisites

1) Node.js + npm

2) PostgreSQL database (NeonDB recommended)

3) Clerk account & API keys

4) Gemini API key

5) Cloudinary account & API key

⚡ Setup Instructions

1) Clone the repository:

git clone https://github.com/jhanvigoel/Ai-Help---QuickAI.git
cd Ai-Help---QuickAI


2) Install dependencies for frontend and backend:

cd "Ai Help"
npm install
cd server
npm install


3) Create a .env file in the server folder:

DATABASE_URL=your_postgres_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_APIKEY=your_gemini_api_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
USE_AUTH=false   # for local development


4) Start the backend:

cd server
npm start
# or
npm run server


5) Start the frontend:

cd ..
npm run dev


6) Open in your browser:

Backend → http://localhost:3000

Frontend → usually http://localhost:5173

📌 Notes

All API calls are handled through the local backend.

Ensure valid API keys & environment variables are set.

Clerk authentication requires a valid session token (can be bypassed locally using USE_AUTH=false).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
