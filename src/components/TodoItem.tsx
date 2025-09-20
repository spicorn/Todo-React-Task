/**
 * Individual todo item component with edit, delete, and complete functionality
 */

import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onUpdate, 
  onDelete, 
  isUpdating = false,
  isDeleting = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description
  });
  const [editErrors, setEditErrors] = useState<{ title?: string; description?: string }>({});

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: todo.title,
      description: todo.description
    });
    setEditErrors({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description
    });
    setEditErrors({});
  };

  const validateEditForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    if (!editData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (editData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!editData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (editData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters long';
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEdit = () => {
    if (validateEditForm()) {
      onUpdate(todo.id, {
        title: editData.title.trim(),
        description: editData.description.trim()
      });
      setIsEditing(false);
      setEditErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (editErrors[name as keyof typeof editErrors]) {
      setEditErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              disabled={isUpdating}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 ${
                editErrors.title ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {editErrors.title && (
              <p className="mt-1 text-sm text-red-600">{editErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              disabled={isUpdating}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 resize-none ${
                editErrors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {editErrors.description && (
              <p className="mt-1 text-sm text-red-600">{editErrors.description}</p>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isUpdating}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-200 ${
      todo.completed ? 'opacity-75' : ''
    } ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={isUpdating || isDeleting}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:cursor-not-allowed"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {todo.title}
              </h3>
              <p className={`mt-1 text-sm ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
              <div className="mt-2 text-xs text-gray-400">
                <p>Created: {formatDate(todo.createdAt)}</p>
                {todo.updatedAt !== todo.createdAt && (
                  <p>Updated: {formatDate(todo.updatedAt)}</p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 ml-4">
              <button
                onClick={handleEdit}
                disabled={isUpdating || isDeleting}
                className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 text-sm font-medium transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                disabled={isUpdating || isDeleting}
                className="text-red-600 hover:text-red-800 disabled:text-gray-400 text-sm font-medium transition-colors duration-200"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
