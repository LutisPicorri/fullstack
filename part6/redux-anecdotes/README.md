# Redux Anecdotes

A voting application for anecdotes built with React and Redux.

## Exercise 6.3-6.19: Anecdotes with Redux

This project implements a complete anecdotes voting application using Redux Toolkit for state management with full backend integration and enhanced notifications.

## Features

- **Vote for anecdotes** - Click the vote button to increment vote count
- **Add new anecdotes** - Use the form to create new anecdotes
- **Filter anecdotes** - Use the filter input to search through anecdotes
- **Sorted by votes** - Anecdotes are automatically sorted by vote count (highest first)
- **Notifications** - Shows notifications when voting or creating anecdotes
- **Backend Integration** - Fetches anecdotes from json-server backend
- **Async Operations** - Uses Redux Toolkit's createAsyncThunk for all API calls
- **Enhanced Notifications** - Improved notification system with automatic timeout
- **Full Backend Sync** - All operations (create, vote) are synchronized with backend
- **Redux Toolkit** - Modern Redux with simplified state management
- **Redux DevTools** - Built-in debugging tools enabled

## Implementation Details

### Exercise 6.3: Voting functionality
- Implemented `VOTE` action in reducer
- Vote button increments vote count for specific anecdote
- State updates are immutable

### Exercise 6.4: Adding new anecdotes
- Implemented `NEW_ANECDOTE` action in reducer
- Uncontrolled form for adding new anecdotes
- New anecdotes start with 0 votes

### Exercise 6.5: Sorting by votes
- Anecdotes are sorted by vote count in descending order
- Sorting happens in the selector within AnecdoteList component

### Exercise 6.6: Action creators
- `voteAnecdote(id)` - Creates VOTE action
- `createAnecdote(content)` - Creates NEW_ANECDOTE action
- All action creation logic moved to action creators

### Exercise 6.7: AnecdoteForm component
- Separated form logic into AnecdoteForm component
- Handles form submission and dispatching createAnecdote action
- Uncontrolled form implementation

### Exercise 6.8: AnecdoteList component
- Separated list rendering into AnecdoteList component
- Handles voting logic and dispatching voteAnecdote action
- Includes sorting logic in selector

### Exercise 6.9: Filtering functionality
- Implemented filter reducer with SET_FILTER action
- Created Filter component for user input
- Updated store to use combineReducers for multiple reducers
- AnecdoteList now filters anecdotes based on content
- Case-insensitive filtering implemented

### Exercise 6.10: Redux Toolkit migration
- Installed and configured Redux Toolkit
- Updated store to use configureStore with DevTools enabled
- Migrated filter reducer to use createSlice
- Simplified action creators and reducers

### Exercise 6.11: Anecdote reducer migration
- Migrated anecdote reducer to use createSlice
- Updated action creators to use Redux Toolkit patterns
- Fixed sorting to avoid mutation with spread operator
- Simplified state updates with immer integration

### Exercise 6.12: Notification component
- Created notification reducer using createSlice
- Implemented Notification component with Redux integration
- Added setNotification and clearNotification actions
- Component displays messages from Redux store

### Exercise 6.13: Smart notifications
- Added notification functionality to voting and creation
- Notifications show for 5 seconds then auto-clear
- Integrated notifications with existing actions
- Enhanced user experience with feedback

### Exercise 6.14: Backend integration - Fetching anecdotes
- Installed and configured json-server
- Created db.json with initial anecdotes data
- Implemented anecdoteService for API calls
- Added initializeAnecdotes async thunk for fetching data
- Updated App component to fetch anecdotes on mount
- Migrated from static data to backend data

### Exercise 6.15: Backend integration - Creating anecdotes
- Implemented createNew API call in anecdoteService
- Added createAnecdote async thunk for creating anecdotes
- Updated AnecdoteForm to use async operations with error handling
- Anecdotes are now persisted to backend database
- Enhanced error handling with try-catch blocks

### Exercise 6.16-6.17: Async action creators
- All operations now use Redux Toolkit's createAsyncThunk
- initializeAnecdotes fetches data from backend on app startup
- createAnecdote persists new anecdotes to backend
- Proper error handling for all async operations

### Exercise 6.18: Backend voting synchronization
- Added update API call in anecdoteService for PUT requests
- Implemented voteAnecdote async thunk for voting operations
- Votes are now synchronized with backend database
- Updated AnecdoteList to handle async voting with error handling

### Exercise 6.19: Enhanced notification system
- Created setNotificationWithTimeout action creator
- Simplified notification usage with automatic timeout
- Replaced manual setTimeout calls with enhanced action creator
- All notifications now use the improved system
- Support for custom timeout duration (default 5 seconds)

## State Structure

```javascript
{
  anecdotes: [
    {
      content: "If it hurts, do it more often",
      id: "12345",
      votes: 5
    },
    // ... more anecdotes
  ],
  filter: "search term",
  notification: "Welcome to anecdotes app!"
}
```

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   npm run server
   ```

3. Start the development server (in a new terminal):
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

**Note**: The backend server runs on http://localhost:3001 and the frontend on http://localhost:5173

## Project Structure

- `src/reducers/anecdoteReducer.js` - Redux Toolkit slice with async thunks for all operations
- `src/reducers/filterReducer.js` - Redux Toolkit slice for filtering
- `src/reducers/notificationReducer.js` - Redux Toolkit slice with enhanced notification system
- `src/store.js` - Redux Toolkit store configuration with DevTools
- `src/services/anecdotes.js` - API service for backend communication (GET, POST, PUT)
- `src/components/AnecdoteForm.jsx` - Form for adding new anecdotes with enhanced notifications
- `src/components/AnecdoteList.jsx` - List of anecdotes with async voting and enhanced notifications
- `src/components/Filter.jsx` - Filter input component
- `src/components/Notification.jsx` - Notification display component
- `src/App.jsx` - Main application component with async data initialization
- `src/main.jsx` - Application entry point with Redux Provider
- `db.json` - Backend data file for json-server
