# Overview

The backend template that uses FastAPI and Supabase.

Note: This setup is for Mac users. A future item will include other operating systems.

## Setup

### Setup Virtual Environment & Install Dependencies

1. `python3 -m venv venv`
2. `source venv/bin/activate`
3. `pip3 install -r requirements.txt`

### Install Postman [Optional]

In order to call routes to your backend, you can download a free service like Postman to send requests.

### Create .env file

Create a .env file under mvp-backend to configure your local dev env variables

```
DOMAIN=localhost
FRONTEND_HOST=http://localhost:5173

# Environment: local, staging, production
ENVIRONMENT=local
BACKEND_CORS_ORIGINS="http://localhost,http://localhost:5173,https://localhost,https://localhost:5173
OPENAI_API_KEY="<API_KEY_HERE>

# Supabase

SUPABASE_URL = "http://localhost:54321"
SUPABASE_KEY = "your-service-role-key"

# Any other external environment variables.
```

## Dev Workflow

1. `uvicorn main:app --reload` (starts BE)