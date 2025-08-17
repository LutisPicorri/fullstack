# Part 7: React Router and Custom Hooks

This part contains exercises for React Router navigation and custom hooks implementation.

## Projects

### 1. Routed Anecdotes (`routed-anecdotes/`)

A React application for managing software anecdotes with React Router navigation.

**Exercises 7.1-7.3: Routed Anecdotes**

- **Exercise 7.1**: Added React Router with navigation menu and routing
- **Exercise 7.2**: Implemented single anecdote view with URL parameters
- **Exercise 7.3**: Added automatic navigation and notifications after creating anecdotes

**Exercises 7.4-7.6: Anecdotes and Hooks**

- **Exercise 7.4**: Simplified form with custom `useField` hook
- **Exercise 7.5**: Added reset functionality to clear form fields
- **Exercise 7.6**: Fixed console warning by using `inputProps` instead of spreading entire hook object

**Features:**
- React Router navigation
- Custom `useField` hook for form management
- Reset functionality for form fields
- Notifications system
- Individual anecdote views
- Voting functionality

### 2. Country Hook (`country-hook/`)

A React application for searching country information using a custom hook.

**Exercise 7.7: Country Hook**

- **Custom `useCountry` hook**: Fetches country data from REST Countries API
- **useEffect with dependencies**: Controls when API calls are made
- **Error handling**: Shows "not found" message for invalid countries
- **Country display**: Shows flag, capital, and population

**Features:**
- Real-time country search
- API integration with REST Countries
- Custom hook for data fetching
- Responsive UI with country flags

### 3. Ultimate Hooks (`ultimate-hooks/`)

A React application demonstrating reusable custom hooks for API communication.

**Exercise 7.8: Ultimate Hooks**

- **Custom `useResource` hook**: Generic hook for any REST API resource
- **Custom `useField` hook**: Reusable form field management
- **Multiple resources**: Handles both notes and persons
- **JSON Server backend**: Mock API for testing

**Features:**
- Generic resource management hook
- Reusable form field hook
- Multiple resource types (notes, persons)
- Real-time data updates

## Technical Stack

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **JSON Server** - Mock backend API
- **Vite** - Build tool and development server

## Running the Applications

### Routed Anecdotes
```bash
cd routed-anecdotes
npm install
npm run dev
```

### Country Hook
```bash
cd country-hook
npm install
npm run dev
```

### Ultimate Hooks
```bash
cd ultimate-hooks
npm install
npm run server  # Start JSON Server on port 3005
npm run dev     # Start React app in another terminal
```

## Key Learning Outcomes

1. **React Router**: Client-side routing with dynamic routes and navigation
2. **Custom Hooks**: Creating reusable logic with `useState` and `useEffect`
3. **Form Management**: Simplified form handling with custom hooks
4. **API Integration**: Generic hooks for REST API communication
5. **Error Handling**: Proper error states and user feedback
6. **Code Reusability**: Creating hooks that work with different data types

## Project Structure

Each project follows a similar structure:
- `src/components/` - React components
- `src/hooks/` - Custom hooks
- `src/main.jsx` - Application entry point
- `package.json` - Dependencies and scripts
- `.gitignore` - Git ignore configuration
