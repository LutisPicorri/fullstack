# Blog Application

A full-stack blog application built with React, Redux, and React Query.

## Exercises 7.9-7.21: Blog Application

This project implements a complete blog application with state management using Redux and React Query.

## Features

### State Management
- **Redux Toolkit**: For global state management
- **React Query**: For server state management
- **Context API**: For user authentication state

### Core Functionality
- **User Authentication**: Login/logout with JWT tokens
- **Blog Management**: Create, read, update, delete blogs
- **Liking System**: Like and unlike blog posts
- **Comments**: Add anonymous comments to blog posts
- **User Views**: View all users and individual user blogs
- **Navigation**: React Router for client-side routing

### UI/UX
- **Responsive Design**: Modern, clean interface
- **Notifications**: Success and error messages
- **Form Validation**: Input validation and error handling
- **Loading States**: Loading indicators for async operations

## Implementation Details

### Exercise 7.9: Automatic Code Formatting
- ✅ **Prettier**: Configured for automatic code formatting
- ✅ **ESLint**: Code linting and style enforcement
- ✅ **Editor Integration**: Format on save capability

### Exercise 7.10: Redux Step 1
- ✅ **Notification State**: Redux store for notification management
- ✅ **Actions & Reducers**: Redux Toolkit slices for state management

### Exercise 7.11: Redux Step 2
- ✅ **Blog State**: Redux store for blog data
- ✅ **CRUD Operations**: Create, read, update, delete blogs
- ✅ **Async Actions**: Redux Thunk for API calls

### Exercise 7.12: Redux Step 3
- ✅ **Like Functionality**: Like and unlike blog posts
- ✅ **Delete Functionality**: Remove blogs with confirmation
- ✅ **Optimistic Updates**: Immediate UI updates

### Exercise 7.13: Redux Step 4
- ✅ **User State**: Redux store for authenticated user
- ✅ **Authentication**: Login/logout with token management
- ✅ **Protected Routes**: Route protection based on auth state

### Exercise 7.14: Users View
- ✅ **Users Table**: Display all users with blog counts
- ✅ **User Statistics**: Show number of blogs per user
- ✅ **Clickable Links**: Navigate to individual user pages

### Exercise 7.15: Individual User View
- ✅ **User Blogs**: Display blogs by specific user
- ✅ **Conditional Rendering**: Handle loading states
- ✅ **Error Handling**: Graceful error handling for missing users

### Exercise 7.16: Blog View
- ✅ **Individual Blog Pages**: Dedicated blog post views
- ✅ **URL Routing**: Dynamic routes with blog IDs
- ✅ **Blog Details**: Full blog information display

### Exercise 7.17: Navigation
- ✅ **Navigation Menu**: Consistent navigation across app
- ✅ **Active States**: Visual feedback for current page
- ✅ **User Info**: Display logged-in user information

### Exercise 7.18: Comments Step 1
- ✅ **Comment Display**: Show existing comments
- ✅ **API Integration**: Fetch comments from backend
- ✅ **Comment List**: Display comments for each blog

### Exercise 7.19: Comments Step 2
- ✅ **Add Comments**: Form to add new comments
- ✅ **Real-time Updates**: Immediate comment display
- ✅ **Anonymous Comments**: No user association required

### Exercise 7.20: Styles Step 1
- ✅ **Modern CSS**: Clean, responsive styling
- ✅ **Component Styling**: Consistent design system
- ✅ **User Experience**: Intuitive interface design

### Exercise 7.21: Styles Step 2
- ✅ **Enhanced Styling**: Professional appearance
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Visual Hierarchy**: Clear information structure

## Technical Stack

- **Frontend**: React 18, React Router DOM
- **State Management**: Redux Toolkit, React Query
- **Styling**: CSS3 with modern design patterns
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite for fast development
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── components/          # React components
│   ├── BlogForm.jsx     # Create new blog form
│   ├── BlogList.jsx     # List all blogs
│   ├── BlogView.jsx     # Individual blog view
│   ├── LoginForm.jsx    # User authentication
│   ├── Navigation.jsx   # App navigation
│   ├── Notification.jsx # Success/error messages
│   ├── User.jsx         # Individual user view
│   └── Users.jsx        # All users table
├── services/            # API services
│   ├── blogs.js         # Blog API calls
│   ├── login.js         # Authentication API
│   └── users.js         # User API calls
├── store/               # Redux store
│   ├── index.js         # Store configuration
│   ├── blogsSlice.js    # Blog state management
│   ├── notificationSlice.js # Notification state
│   └── userSlice.js     # User state management
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## Running the Application

1. **Install Dependencies**:
   ```bash
   cd part7/blog-app
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Format Code**:
   ```bash
   npm run format
   ```

4. **Lint Code**:
   ```bash
   npm run lint
   ```

## API Endpoints

The application expects a backend API with the following endpoints:

- `POST /api/login` - User authentication
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/comments` - Add comment
- `GET /api/users` - Fetch all users
- `GET /api/users/:id` - Fetch specific user

## Key Features

### State Management
- **Redux Toolkit**: Simplified Redux with modern patterns
- **Async Actions**: Redux Thunk for API operations
- **Immutable Updates**: Proper state immutability
- **DevTools Integration**: Redux DevTools for debugging

### User Experience
- **Responsive Design**: Works on all device sizes
- **Loading States**: Visual feedback during operations
- **Error Handling**: Graceful error messages
- **Form Validation**: Input validation and feedback

### Code Quality
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting
- **Type Safety**: PropTypes for component validation
- **Clean Architecture**: Separation of concerns

## Learning Outcomes

1. **Redux State Management**: Global state with Redux Toolkit
2. **React Query**: Server state management
3. **React Router**: Client-side routing and navigation
4. **Modern React**: Hooks, functional components
5. **API Integration**: RESTful API communication
6. **Code Quality**: ESLint, Prettier, best practices
7. **User Experience**: Responsive design and UX patterns
