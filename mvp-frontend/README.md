# Overview

The Frontend MVP Template. A lot of this code is just stitched together shadcn examples. As this progresses, I imagine it will be customized or stripped down.

## Features

- Sidebar Navigation
- Context Switching
- User Navigation
- Login/Logout

## Dev Workflow

### Getting Started

```
npm install
npm run dev
```

### Environment Variables

Create a .env.local file in the mvp-frontend directory. These will be environment specific (local, staging, prod) variables for the frontend code. In the local .env, you can put these contents to work with the backend.

```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local anon key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deploy on Vercel

Currently set to auto-deploy on Vercel. No tests. Has a preview environment for Pull Requests.
