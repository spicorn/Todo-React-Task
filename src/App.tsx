/**
 * Main App component with state management and API integration
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoRequest } from './types/todo';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './services/mockApi';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  // State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingTodoId, setUpdatingTodoId] = useState<string | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Load todos from API
  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchTodos();
      
      if (response.success && response.data) {
        setTodos(response.data);
      } else {
        setError(response.error || 'Failed to load todos');
      }
    } catch (err) {
      setError('An unexpected error occurred while loading todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new todo
  const handleCreateTodo = useCallback(async (todoData: CreateTodoRequest) => {
    try {
      setIsCreating(true);
      setError(null);
      
      const response = await createTodo(todoData);
      
      if (response.success && response.data) {
        setTodos(prev => [response.data!, ...prev]);
      } else {
        setError(response.error || 'Failed to create todo');
      }
    } catch (err) {
      setError('An unexpected error occurred while creating todo');
    } finally {
      setIsCreating(false);
    }
  }, []);

  // Update existing todo
  const handleUpdateTodo = useCallback(async (
    id: string, 
    updates: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>
  ) => {
    try {
      setUpdatingTodoId(id);
      setError(null);
      
      const response = await updateTodo({ id, ...updates });
      
      if (response.success && response.data) {
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? response.data! : todo
          )
        );
      } else {
        setError(response.error || 'Failed to update todo');
      }
    } catch (err) {
      setError('An unexpected error occurred while updating todo');
    } finally {
      setUpdatingTodoId(null);
    }
  }, []);

  // Delete todo
  const handleDeleteTodo = useCallback(async (id: string) => {
    try {
      setDeletingTodoId(id);
      setError(null);
      
      const response = await deleteTodo(id);
      
      if (response.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } else {
        setError(response.error || 'Failed to delete todo');
      }
    } catch (err) {
      setError('An unexpected error occurred while deleting todo');
    } finally {
      setDeletingTodoId(null);
    }
  }, []);

  // Clear error
  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  // Retry loading todos
  const handleRetry = useCallback(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo App
          </h1>
          <p className="text-lg text-gray-600">
            Manage your tasks with ease using React and TypeScript
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage 
              message={error} 
              onRetry={handleRetry}
              onDismiss={handleClearError}
            />
          </div>
        )}

        {/* Add Todo Form */}
        <AddTodoForm 
          onSubmit={handleCreateTodo} 
          isLoading={isCreating}
        />

        {/* Main Content */}
        <main>
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <LoadingSpinner 
                size="large" 
                message="Loading your todos..." 
              />
            </div>
          ) : (
            <TodoList
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
              isUpdating={updatingTodoId}
              isDeleting={deletingTodoId}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built by Ngoni Dancel Mautsa😊
          </p>
          <a href="https://www.dancel.co.zw" className="mt-1">
           www.dancel.co.zw
          </ a>
        </footer>
      </div>
    </div>
  );
};

export default App;
