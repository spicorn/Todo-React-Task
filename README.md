# Todo App - React TypeScript

Completed Task

## Features

### Core Functionality
- ✅ **Todo List Display**: View all todos with title, description, and completion status
- ✅ **Add New Todo**: Create new todos with validation
- ✅ **Update Todo**: Edit existing todos inline
- ✅ **Mark as Complete**: Toggle completion status with checkboxes
- ✅ **Delete Todo**: Remove todos with confirmation

### Mock API Integration
- 🔄 **Simulated REST API**: Mock API calls with realistic delays
- ⏱️ **Network Latency**: Simulated delays (400-800ms) for realistic UX
- 🎲 **Random Failures**: 10% chance of API failures for error handling
- 📡 **Full CRUD Operations**: GET, POST, PUT, DELETE endpoints

### State Management & UX
- 🔄 **Loading States**: Spinners and skeleton loaders during API calls
- ❌ **Error Handling**: Clear error messages with retry functionality
- 🎯 **Strict Typing**: Comprehensive TypeScript interfaces
- 🧩 **Component Architecture**: Reusable, well-structured components
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS

### React Fundamentals
- ⚛️ **Modern Hooks**: useState, useEffect, useCallback, useMemo
- 🔄 **Component Lifecycles**: Proper side effect management
- 🎨 **Clean Code**: Well-commented, maintainable codebase

## Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTodoForm.tsx     # Form for creating new todos
│   ├── ErrorMessage.tsx    # Error display component
│   ├── LoadingSpinner.tsx  # Loading state component
│   ├── TodoItem.tsx        # Individual todo item
│   └── TodoList.tsx        # Todo list with filtering/sorting
├── services/           # API and business logic
│   └── mockApi.ts         # Mock API service
├── types/              # TypeScript type definitions
│   └── todo.ts            # Todo-related interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Explained

### Mock API Service
The `mockApi.ts` service simulates a real REST API with:
- **Realistic delays**: 400-800ms response times
- **Error simulation**: 10% random failure rate
- **CRUD operations**: Full create, read, update, delete functionality
- **Type safety**: Strongly typed request/response interfaces

### State Management
The app uses React hooks for state management:
- **useState**: Local component state
- **useEffect**: Side effects and API calls
- **useCallback**: Memoized functions for performance
- **useMemo**: Computed values and filtering

### Component Architecture
- **AddTodoForm**: Handles todo creation with validation
- **TodoItem**: Individual todo with edit/delete functionality
- **TodoList**: Manages todo display with filtering and sorting
- **LoadingSpinner**: Reusable loading state component
- **ErrorMessage**: Consistent error display

### Responsive Design
Built with mobile-first approach:
- **Tailwind CSS**: Utility-first styling
- **Responsive breakpoints**: sm, md, lg, xl
- **Touch-friendly**: Large tap targets on mobile
- **Accessible**: Proper ARIA labels and keyboard navigation

## API Endpoints (Mock)

- `GET /todos` - Fetch all todos
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update existing todo
- `DELETE /todos/:id` - Delete todo

## Error Handling

The application includes comprehensive error handling:
- **API errors**: Network failures and server errors
- **Validation errors**: Form input validation
- **User feedback**: Clear error messages with retry options
- **Graceful degradation**: App continues working despite errors

## Performance Optimizations

- **Memoized callbacks**: Prevent unnecessary re-renders
- **Efficient filtering**: useMemo for computed values
- **Lazy loading**: Components load as needed
- **Optimized re-renders**: Proper dependency arrays

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS (Dancel Ngonidzashe Mautsa)**
