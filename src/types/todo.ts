/**
 * TypeScript interfaces for the Todo application
 */

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
}

export interface UpdateTodoRequest {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TodoListResponse extends ApiResponse<Todo[]> {}

export interface TodoResponse extends ApiResponse<Todo> {}

export interface DeleteResponse extends ApiResponse<null> {
  message: string;
}
