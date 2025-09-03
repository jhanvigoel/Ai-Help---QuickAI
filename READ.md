# QuickAI - Ai Help

This project is a full-stack AI-powered web application built with React (frontend) and Express (backend). It integrates Clerk for authentication and Google Gemini (Generative AI) for content generation, along with other AI tools for image and resume processing.

## Features
- User authentication with Clerk
- Free and premium usage plans
- AI-powered article and blog title generation (Gemini API)
- AI image generation and background/object removal
- Resume review using AI
- Usage tracking and premium upgrade logic

## Getting Started

**Note:** This project is not hosted online. You must run both the frontend and backend locally on your machine.

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

## Notes
- All API calls are made to your local backend server.
- You must have valid API keys and environment variables set up for all integrations.
- Clerk authentication requires a valid session token for protected routes.
- For local development, you can bypass Clerk by setting `USE_AUTH=false` in your `.env`.

## License
This project is for educational and personal use. Not hosted or deployed online.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
