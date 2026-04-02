# moto-ohio-redo

This project has been scaffolded with a React frontend and an Express + SQLite backend.

## Available projects

- `client/` - React + Vite frontend
- `server/` - Express API with SQLite persistence

## Run backend

1. `cd server`
2. `npm install`
3. `npm run start` (or `npm run dev` with nodemon)

API endpoints:
- `GET /api/health`
- `GET /api/courses`
- `GET /api/instructors`
- `GET /api/resources`
- `POST /api/courses` (authenticated)
- `POST /api/auth/register` { name, email, password, role }
- `POST /api/auth/login` { email, password }
- `GET /api/me` (authenticated)

## Run frontend

1. `cd client`
2. `npm install`
3. `npm run dev`

Open `http://localhost:5173` and verify courses are fetched from backend.

## Notes

- Ensure Node.js >= 20.19 / 22.12 for Vite 4+, or this scaffold works using Vite 2.9 (configured in `client/package.json`).
- CORS is configured for `http://localhost:5173` in `server/index.js`.
