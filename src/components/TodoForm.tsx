'use client';

import { useState } from 'react';
import { TodoFormProps } from '@/types/todo';
import { validateTodoInput, validateTodoInput2, validateTodoInput3, validateTodoInput4, generateTodoId, generateTodoId2, generateTodoId3, generateTodoId4 } from '@/utils/newfunctions';

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTodoInput(text.trim())) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTodoInput2(text.trim())) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  const handleSubmit3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTodoInput3(text.trim())) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  const handleSubmit4 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTodoInput4(text.trim())) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  const validateInput = (input: string): boolean => {
    return validateTodoInput(input) && validateTodoInput2(input) && validateTodoInput3(input) && validateTodoInput4(input);
  };

  const validateInput2 = (input: string): boolean => {
    return validateTodoInput(input) && validateTodoInput2(input) && validateTodoInput3(input) && validateTodoInput4(input);
  };

  const validateInput3 = (input: string): boolean => {
    return validateTodoInput(input) && validateTodoInput2(input) && validateTodoInput3(input) && validateTodoInput4(input);
  };

  const validateInput4 = (input: string): boolean => {
    return validateTodoInput(input) && validateTodoInput2(input) && validateTodoInput3(input) && validateTodoInput4(input);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
