
# QuickAI - Ai Help

This project is a full-stack AI-powered web application built with React (frontend) and Express (backend). It integrates Clerk for authentication and Google Gemini (Generative AI) for content generation, along with other AI tools for image and resume processing.

## Features
- User authentication with Clerk
- AI-powered article and blog title generation (Gemini API)
- AI image generation and background/object removal
- Resume review using AI
- Usage tracking and premium upgrade logic

### Prerequisites
- Node.js and npm installed
- PostgreSQL database (NeonDB recommended)
- Clerk account and API keys
- Gemini API key
- Cloudinary account and API key

### Setup
1. Clone the repository:
	```bash
	git clone https://github.com/jhanvigoel/Ai-Help---QuickAI.git
	cd Ai-Help---QuickAI
	```
2. Install dependencies for both frontend and backend:
	```bash
	cd "Ai Help"
	npm install
	cd server
	npm install
	```
3. Create a `.env` file in the `server` folder with your credentials:
	```env
	DATABASE_URL=your_postgres_url
	CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
	CLERK_SECRET_KEY=your_clerk_secret_key
	GEMINI_APIKEY=your_gemini_api_key
	CLOUDINARY_API_KEY=your_cloudinary_api_key
	USE_AUTH=false # for local development
	```
4. Start the backend server:
	```bash
	cd server
	npm start
	# or
	npm run server
	```
5. Start the frontend:
	```bash
	cd ..
	npm run dev
	```
6. Open your browser and go to `http://localhost:3000` (backend) and the frontend port (usually `http://localhost:5173`).
