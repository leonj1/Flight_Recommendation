# Image name and tag
IMAGE_NAME = flight-recommendation
IMAGE_TAG = latest

# Default ports (can be overridden by environment variables)
BACKEND_PORT ?= 2325
FRONTEND_PORT ?= 3000

# Default target
.DEFAULT_GOAL := build

.PHONY: build run stop clean

build: ## Build the Docker image
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

run: stop ## Run the Docker container
	@echo "Running Docker container..."
	docker run -d \
		--name $(IMAGE_NAME) \
		-p $(BACKEND_PORT):2325 \
		-p $(FRONTEND_PORT):3000 \
		-e FIREWORKS_API_KEY=${FIREWORKS_API_KEY} \
		-e SERPAPI_API_KEY=${SERPAPI_API_KEY} \
		-e BACKEND_PORT=2325 \
		-e FRONTEND_PORT=3000 \
		$(IMAGE_NAME):$(IMAGE_TAG)
	@echo "Services are starting..."
	@echo "Backend will be available at http://localhost:$(BACKEND_PORT)"
	@echo "Frontend will be available at http://localhost:$(FRONTEND_PORT)"

stop: ## Stop the running container
	@echo "Stopping Docker container..."
	docker stop -t 0 $(IMAGE_NAME) || true
	docker rm -f $(IMAGE_NAME) || true

clean: stop ## Remove the Docker image and container
	@echo "Cleaning up..."
	docker rmi $(IMAGE_NAME):$(IMAGE_TAG) || true
