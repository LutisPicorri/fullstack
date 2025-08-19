interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  
  let rating: number;
  let ratingDescription: string;
  
  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent work, target achieved!';
  } else if (average >= target * 0.7) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'need to work harder to reach target';
  }
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// Helper function to check if argument is a number
const isNotNumber = (argument: unknown): boolean => {
  return isNaN(Number(argument));
};

// Command line functionality
const parseArguments = (args: string[]): { target: number; dailyHours: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  
  if (isNotNumber(target)) {
    throw new Error('Target value was not a number!');
  }

  if (target <= 0) {
    throw new Error('Target must be a positive number!');
  }

  const dailyHours = args.slice(3).map(arg => {
    const hours = Number(arg);
    if (isNotNumber(hours)) {
      throw new Error('Daily hours values must be numbers!');
    }
    if (hours < 0) {
      throw new Error('Daily hours cannot be negative!');
    }
    return hours;
  });

  return { target, dailyHours };
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
