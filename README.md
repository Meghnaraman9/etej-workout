# ETEJ — Workout Schedule

**Train. Earn. Evolve. Justify.**

A full-stack dark-theme gym workout tracker for men — 7-day weekly schedule with checklist progress tracking.

---

## Project Structure

```
etej/
├── backend/
│   ├── server.js        # Express API server
│   ├── package.json
│   └── progress.json    # Auto-created on first save
└── frontend/
    └── public/
        └── index.html   # Single-file frontend (no build step)
```

---

## Setup & Run

### 1. Backend (Express API)

```bash
cd backend
npm install
npm start
```

Server runs at: `http://localhost:3001`

### 2. Frontend

Open `frontend/public/index.html` in your browser directly, OR serve it:

```bash
cd frontend/public
npx serve .
# or
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

> **Offline mode**: If the backend isn't running, the app automatically falls back to localStorage — no data is lost.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schedule` | Full 7-day workout schedule |
| GET | `/api/progress` | All saved progress data |
| POST | `/api/progress` | Save/update a checkbox |
| DELETE | `/api/progress/reset` | Reset all progress |
| GET | `/api/stats` | Summary stats |

### POST /api/progress — Body
```json
{
  "week": "week_1",
  "day": "Monday",
  "exerciseId": "mon_1",
  "checked": true
}
```

---

## Features

- **7-day schedule**: Mon–Sun with dedicated muscle groups
- **Per-exercise checklist**: Check off each set/exercise as done
- **Week tracking**: Switch between weeks (Week 1, 2, 3…)
- **Progress bar**: Live weekly completion percentage
- **Reset**: Clear week progress in one tap
- **Offline-first**: Falls back to localStorage automatically
- **Dark theme**: Full dark UI, zero white surfaces
- **Responsive**: Works on mobile and laptop

---

## Workout Split

| Day | Focus |
|-----|-------|
| Monday | Chest + Triceps |
| Tuesday | Back + Biceps |
| Wednesday | Legs |
| Thursday | Rest / Active Recovery |
| Friday | Shoulders + Abs |
| Saturday | Full Body Power |
| Sunday | Rest Day |
