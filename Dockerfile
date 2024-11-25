# Use Node.js as base image for frontend build
FROM node:20-alpine as frontend-builder

# Set working directory
WORKDIR /frontend

# Copy frontend-related files
COPY package*.json ./
COPY app ./app
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY tsconfig.json ./

# Install dependencies and build
RUN npm install
RUN npm run build

# Use Python image for the final container
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY genai-functions ./genai-functions

# Copy frontend files from builder
COPY --from=frontend-builder /frontend/package*.json ./
COPY --from=frontend-builder /frontend/.next ./.next
COPY --from=frontend-builder /frontend/node_modules ./node_modules
COPY --from=frontend-builder /frontend/app ./app
COPY --from=frontend-builder /frontend/tailwind.config.js ./
COPY --from=frontend-builder /frontend/postcss.config.js ./

# Set environment variables
ENV HOST=0.0.0.0
ENV BACKEND_PORT=8000
ENV FRONTEND_PORT=3000

# Start both backend and frontend services
CMD ["sh", "-c", "cd genai-functions && uvicorn main:app --host $HOST --port $BACKEND_PORT & PORT=$FRONTEND_PORT npm run start"]
