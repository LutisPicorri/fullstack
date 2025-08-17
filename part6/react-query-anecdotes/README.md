# React Query Anecdotes

A voting application for anecdotes built with React and React Query (TanStack Query).

## Exercise 6.20-6.22: Anecdotes with React Query

This project implements a complete anecdotes voting application using React Query for server state management.

## Features

- **View anecdotes** - Fetches and displays anecdotes from the server
- **Add new anecdotes** - Create new anecdotes with validation (minimum 5 characters)
- **Vote for anecdotes** - Vote for anecdotes and see real-time updates
- **Error handling** - Displays error page when server is unavailable
- **Loading states** - Shows loading indicators during data fetching
- **Optimistic updates** - Immediate UI updates with background synchronization

## Implementation Details

### Exercise 6.20: Retrieving anecdotes with React Query
- Implemented `useAnecdotes` hook using `useQuery`
- Fetches anecdotes from the server on component mount
- Displays error page when server communication fails
- Shows loading state while fetching data
- Configured with `retry: false` and `refetchOnWindowFocus: false`

### Exercise 6.21: Adding new anecdotes with React Query
- Implemented `useCreateAnecdote` hook using `useMutation`
- Form validation ensures content is at least 5 characters long
- Optimistic updates immediately add new anecdote to the list
- Server validation prevents creation of short anecdotes
- Real-time UI updates without manual refetching

### Exercise 6.22: Voting for anecdotes with React Query
- Implemented `useVoteAnecdote` hook using `useMutation`
- Optimistic updates immediately increment vote count
- Background synchronization with server
- Automatic UI updates when server responds
- Disabled button during voting to prevent double-clicks

## Technical Stack

- **React 18** - UI framework
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client for API calls
- **JSON Server** - Mock backend API
- **Vite** - Build tool and development server

## API Endpoints

- `GET /anecdotes` - Fetch all anecdotes
- `POST /anecdotes` - Create new anecdote (requires min 5 characters)
- `PUT /anecdotes/:id` - Update anecdote (for voting)

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

- `src/hooks/useAnecdotes.js` - React Query hooks for data management
- `src/services/anecdotes.js` - API service using axios
- `src/components/AnecdoteList.jsx` - Component for displaying and voting on anecdotes
- `src/components/AnecdoteForm.jsx` - Component for creating new anecdotes
- `src/App.jsx` - Main application component
- `src/main.jsx` - Application entry point with React Query setup
- `server.js` - Modified JSON Server configuration
- `db.json` - Backend data file

## Key Benefits of React Query

- **Automatic caching** - Data is cached and shared across components
- **Background updates** - Data stays fresh automatically
- **Optimistic updates** - UI updates immediately, syncs in background
- **Error handling** - Built-in error states and retry logic
- **Loading states** - Automatic loading indicators
- **Server synchronization** - Keeps client and server data in sync
