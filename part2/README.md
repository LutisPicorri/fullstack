# Part 2 - Forms and State Management

This part focuses on form handling, debugging, and advanced state management in React applications.

## 📚 Content Overview

Part 2 covers advanced React concepts with two main projects:

- **course-info**: Enhanced course information app with forms
- **phonebook**: Contact management application with full CRUD operations

## 🗂️ Project Structure

```
part2/
├── course-info/         # Enhanced course information app
└── phonebook/          # Contact management application
```

## 🚀 Getting Started

### Course Information App

```bash
cd part2/course-info
npm install
npm run dev
```

**Features:**
- Form handling and validation
- Controlled components
- Event handling
- Component composition

### Phonebook App

```bash
cd part2/phonebook
npm install
npm run dev
```

**Features:**
- Full CRUD operations (Create, Read, Update, Delete)
- Form validation and error handling
- Search and filtering
- JSON server backend
- Notification system

## 🎯 Learning Objectives

By completing Part 2, you will learn:

- **Form Handling**
  - Controlled components
  - Form validation
  - Input handling
  - Form submission

- **Advanced State Management**
  - Complex state objects
  - State updates with functions
  - State lifting patterns
  - Immutable state updates

- **Debugging Techniques**
  - React DevTools usage
  - Console debugging
  - Error boundaries
  - Performance optimization

- **Data Management**
  - JSON server integration
  - HTTP requests (GET, POST, PUT, DELETE)
  - Error handling
  - Loading states

## 📋 Key Concepts

### Controlled Components

```jsx
const [name, setName] = useState('')

const handleNameChange = (event) => {
  setName(event.target.value)
}

<input 
  value={name}
  onChange={handleNameChange}
/>
```

### Form Handling

```jsx
const handleSubmit = (event) => {
  event.preventDefault()
  // Handle form submission
}

<form onSubmit={handleSubmit}>
  {/* form fields */}
</form>
```

### HTTP Requests

```jsx
const addPerson = async (person) => {
  try {
    const response = await axios.post('/api/persons', person)
    setPersons(persons.concat(response.data))
  } catch (error) {
    console.error('Error adding person:', error)
  }
}
```

### Notification System

```jsx
const [notification, setNotification] = useState({ message: null, type: null })

const showNotification = (message, type) => {
  setNotification({ message, type })
  setTimeout(() => setNotification({ message: null, type: null }), 5000)
}
```

## 🔧 Development Tools

- **JSON Server**: Mock REST API for development
- **Axios**: HTTP client for API requests
- **React DevTools**: Advanced debugging
- **Browser Network Tab**: API request monitoring

## 📖 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start JSON server (phonebook)
npx json-server --port 3001 --watch db.json

# Build for production
npm run build
```

## 🐛 Debugging Tips

- Use React DevTools to inspect component state and props
- Monitor network requests in browser DevTools
- Use console.log() strategically for debugging
- Check for common React warnings in console
- Verify API endpoints and data formats

## 🔍 JSON Server Setup

For the phonebook application:

```bash
# Install JSON server globally
npm install -g json-server

# Start the server
npx json-server --port 3001 --watch db.json
```

The server will be available at `http://localhost:3001`

## 📊 API Endpoints (Phonebook)

- `GET /api/persons` - Get all contacts
- `POST /api/persons` - Create new contact
- `PUT /api/persons/:id` - Update contact
- `DELETE /api/persons/:id` - Delete contact

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile and desktop
- **Notification System**: Success and error messages
- **Search Functionality**: Real-time filtering
- **Form Validation**: Client-side validation
- **Loading States**: User feedback during operations

## 📖 Next Steps

After completing Part 2, proceed to:

- [Part 3 - Backend Development](../part3/README.md)

## 💡 Best Practices

- Always handle form submissions with preventDefault()
- Use controlled components for form inputs
- Implement proper error handling for API calls
- Provide user feedback for all operations
- Keep state updates immutable
- Use meaningful variable and function names
- Implement proper validation before API calls

## 🚨 Common Issues

- **CORS errors**: Ensure JSON server is running on correct port
- **State updates**: Remember to use immutable updates
- **Form validation**: Always validate before submission
- **API errors**: Implement proper error handling
- **Component re-renders**: Optimize with proper dependencies

---

**Forms and state management mastered! Ready for backend development! 🚀**
