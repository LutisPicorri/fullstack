import express from 'express';
import cors from 'cors';
import diaries from './data/diaries';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all diaries
app.get('/api/diaries', (_req, res) => {
  res.json(diaries);
});

// POST new diary entry
app.post('/api/diaries', (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body as NewDiaryEntry;

    // Basic validation
    if (!date || !weather || !visibility || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate weather
    if (!Object.values(Weather).includes(weather)) {
      return res.status(400).json({ error: 'Invalid weather value' });
    }

    // Validate visibility
    if (!Object.values(Visibility).includes(visibility)) {
      return res.status(400).json({ error: 'Invalid visibility value' });
    }

    // Validate date format (basic check)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const newDiary: DiaryEntry = {
      id: Math.max(...diaries.map(d => d.id)) + 1,
      date,
      weather,
      visibility,
      comment
    };

    diaries.push(newDiary);
    res.json(newDiary);
  } catch (error) {
    console.error('Error creating diary entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
