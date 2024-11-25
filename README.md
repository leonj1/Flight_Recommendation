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

## Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Flight_Recommendation
```

2. Set up environment variables:
```bash
export FIREWORKS_API_KEY="your-fireworks-api-key"
export SERPAPI_API_KEY="your-serpapi-key"
```

## Building and Running

The application uses Docker and can be easily built and run using the provided Makefile:

1. Build the Docker image:
```bash
make build
```

2. Run the application:
```bash
make run
```

This will start both the backend and frontend services. By default:
- Backend will be available at http://localhost:2325
- Frontend will be available at http://localhost:3000

To stop the application:
```bash
make stop
```

To clean up Docker resources:
```bash
make clean
```

You can customize the ports by setting environment variables:
```bash
BACKEND_PORT=8000 FRONTEND_PORT=3001 make run
```

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
