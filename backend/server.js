const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'progress.json');

app.use(cors());
app.use(express.json());

const workoutSchedule = {
  Monday: {
    label: 'CHEST + TRICEPS',
    icon: '💪',
    color: '#E63946',
    exercises: [
      { id: 'mon_1', name: 'Barbell Bench Press', sets: 4, reps: '8–10', rest: '90s', muscle: 'Chest' },
      { id: 'mon_2', name: 'Incline Dumbbell Press', sets: 3, reps: '10–12', rest: '75s', muscle: 'Upper Chest' },
      { id: 'mon_3', name: 'Cable Chest Flyes', sets: 3, reps: '12–15', rest: '60s', muscle: 'Chest' },
      { id: 'mon_4', name: 'Dips (Chest Variation)', sets: 3, reps: '10–12', rest: '75s', muscle: 'Chest/Triceps' },
      { id: 'mon_5', name: 'Tricep Pushdown (Rope)', sets: 3, reps: '12–15', rest: '60s', muscle: 'Triceps' },
      { id: 'mon_6', name: 'Overhead Tricep Extension', sets: 3, reps: '10–12', rest: '60s', muscle: 'Triceps' },
    ]
  },
  Tuesday: {
    label: 'BACK + BICEPS',
    icon: '🏋️',
    color: '#2EC4B6',
    exercises: [
      { id: 'tue_1', name: 'Deadlift', sets: 4, reps: '5–6', rest: '120s', muscle: 'Back/Hamstrings' },
      { id: 'tue_2', name: 'Pull-Ups / Lat Pulldown', sets: 4, reps: '8–10', rest: '90s', muscle: 'Lats' },
      { id: 'tue_3', name: 'Barbell Bent-Over Row', sets: 3, reps: '8–10', rest: '90s', muscle: 'Mid-Back' },
      { id: 'tue_4', name: 'Seated Cable Row', sets: 3, reps: '12–15', rest: '60s', muscle: 'Mid-Back' },
      { id: 'tue_5', name: 'Barbell Curl', sets: 3, reps: '10–12', rest: '60s', muscle: 'Biceps' },
      { id: 'tue_6', name: 'Hammer Curl', sets: 3, reps: '12–15', rest: '60s', muscle: 'Biceps/Brachialis' },
    ]
  },
  Wednesday: {
    label: 'LEGS',
    icon: '🦵',
    color: '#F4A261',
    exercises: [
      { id: 'wed_1', name: 'Barbell Back Squat', sets: 4, reps: '6–8', rest: '120s', muscle: 'Quads/Glutes' },
      { id: 'wed_2', name: 'Romanian Deadlift', sets: 3, reps: '10–12', rest: '90s', muscle: 'Hamstrings' },
      { id: 'wed_3', name: 'Leg Press', sets: 3, reps: '12–15', rest: '75s', muscle: 'Quads' },
      { id: 'wed_4', name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '75s', muscle: 'Quads/Glutes' },
      { id: 'wed_5', name: 'Leg Curl (Machine)', sets: 3, reps: '12–15', rest: '60s', muscle: 'Hamstrings' },
      { id: 'wed_6', name: 'Standing Calf Raises', sets: 4, reps: '15–20', rest: '45s', muscle: 'Calves' },
    ]
  },
  Thursday: {
    label: 'REST / ACTIVE RECOVERY',
    icon: '🧘',
    color: '#6A4C93',
    isRest: true,
    exercises: [
      { id: 'thu_1', name: '20 min Light Cardio / Walk', sets: 1, reps: '20 min', rest: '—', muscle: 'Cardio' },
      { id: 'thu_2', name: 'Full Body Stretching', sets: 1, reps: '15 min', rest: '—', muscle: 'Flexibility' },
      { id: 'thu_3', name: 'Foam Rolling', sets: 1, reps: '10 min', rest: '—', muscle: 'Recovery' },
    ]
  },
  Friday: {
    label: 'SHOULDERS + ABS',
    icon: '🎯',
    color: '#FF6B6B',
    exercises: [
      { id: 'fri_1', name: 'Overhead Press (Barbell)', sets: 4, reps: '8–10', rest: '90s', muscle: 'Shoulders' },
      { id: 'fri_2', name: 'Lateral Raises', sets: 3, reps: '12–15', rest: '60s', muscle: 'Side Delts' },
      { id: 'fri_3', name: 'Front Raises', sets: 3, reps: '12–15', rest: '60s', muscle: 'Front Delts' },
      { id: 'fri_4', name: 'Face Pulls (Cable)', sets: 3, reps: '15–20', rest: '60s', muscle: 'Rear Delts' },
      { id: 'fri_5', name: 'Hanging Leg Raises', sets: 3, reps: '12–15', rest: '60s', muscle: 'Core' },
      { id: 'fri_6', name: 'Cable Crunches', sets: 3, reps: '15–20', rest: '45s', muscle: 'Abs' },
    ]
  },
  Saturday: {
    label: 'FULL BODY POWER',
    icon: '⚡',
    color: '#FFD166',
    exercises: [
      { id: 'sat_1', name: 'Power Clean', sets: 4, reps: '5', rest: '120s', muscle: 'Full Body' },
      { id: 'sat_2', name: 'Weighted Pull-Ups', sets: 3, reps: '6–8', rest: '90s', muscle: 'Back/Biceps' },
      { id: 'sat_3', name: 'Dumbbell Shoulder Press', sets: 3, reps: '10–12', rest: '75s', muscle: 'Shoulders' },
      { id: 'sat_4', name: 'Bulgarian Split Squat', sets: 3, reps: '10 each', rest: '75s', muscle: 'Legs' },
      { id: 'sat_5', name: 'Plank Variations', sets: 3, reps: '45–60s', rest: '45s', muscle: 'Core' },
      { id: 'sat_6', name: 'Battle Ropes', sets: 3, reps: '30s', rest: '45s', muscle: 'Conditioning' },
    ]
  },
  Sunday: {
    label: 'REST DAY',
    icon: '🌙',
    color: '#4A4E69',
    isRest: true,
    exercises: [
      { id: 'sun_1', name: 'Full Rest & Recovery', sets: 1, reps: 'All day', rest: '—', muscle: 'Body' },
      { id: 'sun_2', name: 'Meal Prep', sets: 1, reps: '1–2 hr', rest: '—', muscle: 'Nutrition' },
      { id: 'sun_3', name: 'Sleep 8+ Hours', sets: 1, reps: '8 hrs', rest: '—', muscle: 'Recovery' },
    ]
  }
};

function loadProgress() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return {};
}

function saveProgress(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/schedule', (req, res) => {
  res.json(workoutSchedule);
});

app.get('/api/progress', (req, res) => {
  res.json(loadProgress());
});

app.post('/api/progress', (req, res) => {
  const { week, day, exerciseId, checked } = req.body;
  const progress = loadProgress();
  if (!progress[week]) progress[week] = {};
  if (!progress[week][day]) progress[week][day] = {};
  progress[week][day][exerciseId] = checked;
  saveProgress(progress);
  res.json({ success: true });
});

app.delete('/api/progress/reset', (req, res) => {
  saveProgress({});
  res.json({ success: true, message: 'Progress reset.' });
});

app.get('/api/stats', (req, res) => {
  const progress = loadProgress();
  const totalExercises = Object.values(workoutSchedule).reduce((acc, day) => acc + day.exercises.length, 0);
  let totalChecked = 0;
  const weeklyStats = {};
  for (const week in progress) {
    let weekChecked = 0;
    for (const day in progress[week]) {
      for (const ex in progress[week][day]) {
        if (progress[week][day][ex]) {
          weekChecked++;
          totalChecked++;
        }
      }
    }
    weeklyStats[week] = weekChecked;
  }
  res.json({ totalExercises, totalChecked, weeklyStats });
});

app.listen(PORT, () => {
  console.log(`ETEJ backend running on http://localhost:${PORT}`);
});
