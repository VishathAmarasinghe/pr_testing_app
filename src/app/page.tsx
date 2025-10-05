'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      subtasks: [],
      checklists: [],
      hasSubtasks: false,
      hasChecklists: false,
      subtaskProgress: 0,
      checklistProgress: 0,
      totalSubtasks: 0,
      completedSubtasks: 0,
      totalChecklistItems: 0,
      completedChecklistItems: 0,
      priority: 3,
      category: 'general',
      tags: [],
      estimatedTime: 30,
      actualTime: 0,
      difficulty: 1,
      status: 'pending',
      assignee: '',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: '',
      attachments: [],
      comments: [],
      lastModified: new Date(),
      isImportant: false,
      isUrgent: false,
      reminderDate: new Date(),
      location: '',
      color: '#3b82f6',
      icon: '📝',
      parentTaskId: '',
      dependencies: [],
      subtaskCount: 0,
      checklistCount: 0
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
          {totalCount > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6">
          <TodoForm onAddTodo={addTodo} />
          <TodoList 
            todos={todos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        </main>
      </div>
    </div>
  );
}
