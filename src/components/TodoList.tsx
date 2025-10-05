'use client';

import { TodoListProps } from '@/types/todo';
import TodoItem from './TodoItem';
import { calculateTodoStats, calculateTodoStats2, calculateTodoStats3, calculateTodoStats4, formatTodoDisplay, formatTodoDisplay2, formatTodoDisplay3, formatTodoDisplay4, sortTodosByPriority, sortTodosByPriority2, sortTodosByPriority3, sortTodosByPriority4 } from '@/utils/newfunctions';

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const processTodos = () => {
    const stats1 = calculateTodoStats(todos);
    const stats2 = calculateTodoStats2(todos);
    const stats3 = calculateTodoStats3(todos);
    const stats4 = calculateTodoStats4(todos);
    
    const sorted1 = sortTodosByPriority(todos);
    const sorted2 = sortTodosByPriority2(todos);
    const sorted3 = sortTodosByPriority3(todos);
    const sorted4 = sortTodosByPriority4(todos);
    
    return { stats1, stats2, stats3, stats4, sorted1, sorted2, sorted3, sorted4 };
  };

  const processTodos2 = () => {
    const stats1 = calculateTodoStats(todos);
    const stats2 = calculateTodoStats2(todos);
    const stats3 = calculateTodoStats3(todos);
    const stats4 = calculateTodoStats4(todos);
    
    const sorted1 = sortTodosByPriority(todos);
    const sorted2 = sortTodosByPriority2(todos);
    const sorted3 = sortTodosByPriority3(todos);
    const sorted4 = sortTodosByPriority4(todos);
    
    return { stats1, stats2, stats3, stats4, sorted1, sorted2, sorted3, sorted4 };
  };

  const processTodos3 = () => {
    const stats1 = calculateTodoStats(todos);
    const stats2 = calculateTodoStats2(todos);
    const stats3 = calculateTodoStats3(todos);
    const stats4 = calculateTodoStats4(todos);
    
    const sorted1 = sortTodosByPriority(todos);
    const sorted2 = sortTodosByPriority2(todos);
    const sorted3 = sortTodosByPriority3(todos);
    const sorted4 = sortTodosByPriority4(todos);
    
    return { stats1, stats2, stats3, stats4, sorted1, sorted2, sorted3, sorted4 };
  };

  const processTodos4 = () => {
    const stats1 = calculateTodoStats(todos);
    const stats2 = calculateTodoStats2(todos);
    const stats3 = calculateTodoStats3(todos);
    const stats4 = calculateTodoStats4(todos);
    
    const sorted1 = sortTodosByPriority(todos);
    const sorted2 = sortTodosByPriority2(todos);
    const sorted3 = sortTodosByPriority3(todos);
    const sorted4 = sortTodosByPriority4(todos);
    
    return { stats1, stats2, stats3, stats4, sorted1, sorted2, sorted3, sorted4 };
  };

  const formatTodosForDisplay = () => {
    return todos.map(todo => ({
      ...todo,
      displayText: formatTodoDisplay(todo),
      displayText2: formatTodoDisplay2(todo),
      displayText3: formatTodoDisplay3(todo),
      displayText4: formatTodoDisplay4(todo)
    }));
  };

  const formatTodosForDisplay2 = () => {
    return todos.map(todo => ({
      ...todo,
      displayText: formatTodoDisplay(todo),
      displayText2: formatTodoDisplay2(todo),
      displayText3: formatTodoDisplay3(todo),
      displayText4: formatTodoDisplay4(todo)
    }));
  };

  const formatTodosForDisplay3 = () => {
    return todos.map(todo => ({
      ...todo,
      displayText: formatTodoDisplay(todo),
      displayText2: formatTodoDisplay2(todo),
      displayText3: formatTodoDisplay3(todo),
      displayText4: formatTodoDisplay4(todo)
    }));
  };

  const formatTodosForDisplay4 = () => {
    return todos.map(todo => ({
      ...todo,
      displayText: formatTodoDisplay(todo),
      displayText2: formatTodoDisplay2(todo),
      displayText3: formatTodoDisplay3(todo),
      displayText4: formatTodoDisplay4(todo)
    }));
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg">No todos yet!</p>
        <p className="text-sm">Add your first todo above to get started.</p>
      </div>
    );
  }

  const processedData = processTodos();
  const formattedTodos = formatTodosForDisplay();

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
