# Flight Recommendation System

A modern web application that provides flight recommendations using AI-powered natural language processing. The system allows users to query flights using natural language and provides relevant flight information based on their requests.

## Features

- Natural language processing for flight queries
- Airport code detection from city/country names
- Automatic date handling with fallback to current date
- Real-time chat interface
- Cross-Origin Resource Sharing (CORS) enabled API

## Prerequisites

- Python 3.x
- Node.js and npm (for the frontend)
- Fireworks AI API key
- SerpAPI key (for search functionality)

## Project Structure

```
Flight_Recommendation/
├── genai-functions/
│   └── main.py          # FastAPI backend server
├── page.tsx             # Frontend Next.js component
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Flight_Recommendation
```

2. Install Python dependencies:
```bash
pip install fastapi openai serpapi uvicorn
```

3. Install frontend dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
export FIREWORKS_API_KEY="your-fireworks-api-key"
```

## Running the Application

1. Start the backend server:
```bash
cd genai-functions
uvicorn main:app --reload
```
The API server will start at `http://localhost:8000`

2. Start the frontend development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your flight query in natural language (e.g., "Show me flights from Paris to Zurich on 21st Oct 2024")
3. The system will process your request and display relevant flight information

## API Endpoints

- POST `/chat`: Main endpoint for processing flight queries
  - Accepts: JSON with messages array
  - Returns: Flight recommendations based on the processed query

## Technologies Used

- Backend:
  - FastAPI
  - OpenAI/Fireworks AI
  - SerpAPI
  - Pydantic
- Frontend:
  - Next.js
  - React
  - Vercel AI SDK

## Contributing

Feel free to submit issues and enhancement requests!
