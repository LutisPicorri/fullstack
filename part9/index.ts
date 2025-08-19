import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res): void => {
  const { height, weight } = req.query;
  
  // Check if parameters are provided and are valid numbers
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }
  
  const heightNum = Number(height);
  const weightNum = Number(weight);
  
  // Check if values are positive
  if (heightNum <= 0 || weightNum <= 0) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }
  
  const bmi = calculateBmi(heightNum, weightNum);
  
  res.json({
    weight: weightNum,
    height: heightNum,
    bmi: bmi
  });
});

app.post('/exercises', (req, res): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body as any;
  
  // Check if parameters are missing
  if (!daily_exercises || target === undefined) {
    res.status(400).json({
      error: 'parameters missing'
    });
    return;
  }
  
  // Check if daily_exercises is an array
  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }
  
  // Check if target is a number
  if (typeof target !== 'number' || isNaN(target)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }
  
  // Check if all daily_exercises values are numbers
  for (const exercise of daily_exercises) {
    if (typeof exercise !== 'number' || isNaN(exercise)) {
      res.status(400).json({
        error: 'malformatted parameters'
      });
      return;
    }
  }
  
  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
