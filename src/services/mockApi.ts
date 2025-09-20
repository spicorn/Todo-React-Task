/**
 * Mock API service that simulates REST API calls with delays and error handling
 */

import { 
  Todo, 
  CreateTodoRequest, 
  UpdateTodoRequest, 
  TodoListResponse, 
  TodoResponse, 
  DeleteResponse 
} from '../types/todo';

// Mock data storage (simulates database)
let todos: Todo[] = [
  {
    id: '1',
    title: 'Go to the gym',
    description: 'Build up my body for summer time',
    completed: false,
    createdAt: '2025-09-01T11:00:00Z',
    updatedAt: '2025-09-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Wait fo FC26 to be launched',
    description: 'Cant wait to see the new features',
    completed: true,
    createdAt: '2025-09-07T11:00:00Z',
    updatedAt: '2025-09-08T12:00:00Z'
  },
  {
    id: '3',
    title: 'Update my portfolio',
    description: 'Add my recent projects',
    completed: false,
    createdAt: '2025-09-03T13:00:00Z',
    updatedAt: '2025-09-05T13:00:00Z'
  }
];

// Simulate network delay
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Simulate random API failures (0% for fetchTodos, 5% for other operations)
const shouldFail = (operation?: string): boolean => {
  if (operation === 'fetch') return false; // Never fail on initial fetch
  return Math.random() < 0.05; // 5% chance for other operations
};

// Generate unique ID
const generateId = (): string => 
  Date.now().toString(36) + Math.random().toString(36).substr(2);

/**
 * Simulates a GET request to fetch all todos
 */
export const fetchTodos = async (): Promise<TodoListResponse> => {
  try {
    await delay(800); // Simulate network delay
    
    if (shouldFail('fetch')) {
      throw new Error('Failed to fetch todos. Please try again.');
    }

    return {
      success: true,
      data: [...todos], // Return a copy to avoid mutations
      message: 'Todos fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Simulates a POST request to create a new todo
 */
export const createTodo = async (todoData: CreateTodoRequest): Promise<TodoResponse> => {
  try {
    await delay(600); // Simulate network delay
    
    if (shouldFail()) {
      throw new Error('Failed to create todo. Please try again.');
    }

    const newTodo: Todo = {
      id: generateId(),
      title: todoData.title.trim(),
      description: todoData.description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);

    return {
      success: true,
      data: newTodo,
      message: 'Todo created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Simulates a PUT request to update an existing todo
 */
export const updateTodo = async (todoData: UpdateTodoRequest): Promise<TodoResponse> => {
  try {
    await delay(500); // Simulate network delay
    
    if (shouldFail()) {
      throw new Error('Failed to update todo. Please try again.');
    }

    const todoIndex = todos.findIndex(todo => todo.id === todoData.id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...todoData,
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;

    return {
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Simulates a DELETE request to remove a todo
 */
export const deleteTodo = async (id: string): Promise<DeleteResponse> => {
  try {
    await delay(400); // Simulate network delay
    
    if (shouldFail()) {
      throw new Error('Failed to delete todo. Please try again.');
    }

    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    todos.splice(todoIndex, 1);

    return {
      success: true,
      data: null,
      message: 'Todo deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to delete todo'
    };
  }
};
