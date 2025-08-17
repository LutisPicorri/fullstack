# Unicafe Redux

A simplified version of the unicafe exercise from part 1, with state management handled by Redux.

## Exercise 6.1-6.2: Unicafe Revisited

This project implements a feedback collection application using Redux for state management.

## Features

- Feedback collection (good, ok, bad)
- Statistics display
- Reset functionality
- Redux state management

## State Structure

The Redux store maintains the following state:

```javascript
{
  good: 5,
  ok: 4,
  bad: 2
}
```

## Actions

- `GOOD`: Increments the good counter
- `OK`: Increments the ok counter  
- `BAD`: Increments the bad counter
- `ZERO`: Resets all counters to zero

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Project Structure

- `src/reducer.js` - Redux reducer for counter state
- `src/reducer.test.js` - Tests for the reducer
- `src/App.js` - Main application component with Redux Provider
- `src/components/Unicafe.js` - UI component for feedback collection and statistics
- `src/index.js` - Application entry point
