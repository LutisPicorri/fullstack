# Part 1 - React Basics

This part introduces React fundamentals and component-based development.

## 📚 Content Overview

Part 1 covers the basics of React development with three main projects:

- **1.1**: Course information app - Basic React components
- **anecdotes**: Anecdote voting app - State management with useState
- **unicafe**: Restaurant feedback app - Complex state management

## 🗂️ Project Structure

```
part1/
├── 1.1/                 # Course information app
├── anecdotes/           # Anecdote voting application
└── unicafe/            # Restaurant feedback application
```

## 🚀 Getting Started

### Course Information App (1.1)

```bash
cd part1/1.1
npm install
npm run dev
```

**Features:**
- Basic React components
- Props and component composition
- JSX syntax

### Anecdotes App

```bash
cd part1/anecdotes
npm install
npm run dev
```

**Features:**
- State management with useState
- Event handling
- Conditional rendering
- Array methods in React

### Unicafe App

```bash
cd part1/unicafe
npm install
npm run dev
```

**Features:**
- Complex state management
- Multiple state variables
- Form handling
- Statistics display

## 🎯 Learning Objectives

By completing Part 1, you will learn:

- **React Fundamentals**
  - Component-based architecture
  - JSX syntax and expressions
  - Props and component composition
  - Component lifecycle

- **State Management**
  - useState hook
  - State updates and immutability
  - Complex state objects
  - State lifting

- **Event Handling**
  - Click events
  - Form submissions
  - Event handlers and callbacks

- **Conditional Rendering**
  - Conditional JSX
  - Ternary operators
  - Logical AND operator

## 📋 Key Concepts

### React Components

```jsx
const Header = ({ course }) => {
  return <h1>{course}</h1>
}
```

### State Management

```jsx
const [count, setCount] = useState(0)

const handleClick = () => {
  setCount(count + 1)
}
```

### Event Handling

```jsx
<button onClick={handleClick}>
  Click me
</button>
```

### Conditional Rendering

```jsx
{showContent && <div>Content to show</div>}
```

## 🔧 Development Tools

- **Vite**: Fast build tool and dev server
- **React DevTools**: Browser extension for debugging
- **ESLint**: Code linting and formatting

## 📖 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🐛 Debugging Tips

- Use React DevTools to inspect component state
- Check browser console for errors
- Use console.log() for debugging state changes
- Verify props are being passed correctly

## 📖 Next Steps

After completing Part 1, proceed to:

- [Part 2 - Forms and State](../part2/README.md)

## 💡 Best Practices

- Keep components small and focused
- Use descriptive component and prop names
- Handle state updates immutably
- Use conditional rendering for dynamic content
- Organize code with proper file structure

---

**React basics mastered! Ready for more advanced concepts! 🚀**
