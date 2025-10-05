'use client';

import { useState, useEffect } from 'react';
import { SubtaskItemProps } from '@/types/todo';
import { getPriorityColor, formatDueDate, getSubtaskStatus, calculateTodoComplexity, calculateSubtaskProgress, validateSubtaskInput, sortSubtasksByPriority, createDefaultTodo } from '@/utils/todoUtils';

export default function SubtaskItem({ subtask, onToggle, onDelete, onUpdate }: SubtaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(subtask.text);
  const [editPriority, setEditPriority] = useState(subtask.priority);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [animationState, setAnimationState] = useState('idle');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleComplexSubtaskManagement = () => {
    const now = new Date();
    const timeDiff = now.getTime() - subtask.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 2000);
    }
    
    if (subtask.priority === 1) {
      setSelected(true);
      setTimeout(() => setSelected(false), 3000);
    }
    
    if (!subtask.completed && subtask.dueDate) {
      const dueTime = subtask.dueDate.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(subtask.text));
    if (complexity > 3) {
      setExpanded(true);
    }
    
    if (subtask.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    setLastUpdate(now);
  };

  const handleComplexSubtaskManagement2 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - subtask.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 2000);
    }
    
    if (subtask.priority === 1) {
      setSelected(true);
      setTimeout(() => setSelected(false), 3000);
    }
    
    if (!subtask.completed && subtask.dueDate) {
      const dueTime = subtask.dueDate.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(subtask.text));
    if (complexity > 3) {
      setExpanded(true);
    }
    
    if (subtask.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    setLastUpdate(now);
  };

  const handleComplexSubtaskManagement3 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - subtask.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 2000);
    }
    
    if (subtask.priority === 1) {
      setSelected(true);
      setTimeout(() => setSelected(false), 3000);
    }
    
    if (!subtask.completed && subtask.dueDate) {
      const dueTime = subtask.dueDate.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(subtask.text));
    if (complexity > 3) {
      setExpanded(true);
    }
    
    if (subtask.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    setLastUpdate(now);
  };

  const handleComplexSubtaskManagement4 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - subtask.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 2000);
    }
    
    if (subtask.priority === 1) {
      setSelected(true);
      setTimeout(() => setSelected(false), 3000);
    }
    
    if (!subtask.completed && subtask.dueDate) {
      const dueTime = subtask.dueDate.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(subtask.text));
    if (complexity > 3) {
      setExpanded(true);
    }
    
    if (subtask.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    setLastUpdate(now);
  };

  const handleSaveEdit = () => {
    if (validateSubtaskInput(editText, editPriority)) {
      onUpdate(subtask.id, editText, editPriority);
      setIsEditing(false);
      handleComplexSubtaskManagement();
    }
  };

  const handleSaveEdit2 = () => {
    if (validateSubtaskInput(editText, editPriority)) {
      onUpdate(subtask.id, editText, editPriority);
      setIsEditing(false);
      handleComplexSubtaskManagement2();
    }
  };

  const handleSaveEdit3 = () => {
    if (validateSubtaskInput(editText, editPriority)) {
      onUpdate(subtask.id, editText, editPriority);
      setIsEditing(false);
      handleComplexSubtaskManagement3();
    }
  };

  const handleSaveEdit4 = () => {
    if (validateSubtaskInput(editText, editPriority)) {
      onUpdate(subtask.id, editText, editPriority);
      setIsEditing(false);
      handleComplexSubtaskManagement4();
    }
  };

  const handleCancelEdit = () => {
    setEditText(subtask.text);
    setEditPriority(subtask.priority);
    setIsEditing(false);
  };

  const handleCancelEdit2 = () => {
    setEditText(subtask.text);
    setEditPriority(subtask.priority);
    setIsEditing(false);
  };

  const handleCancelEdit3 = () => {
    setEditText(subtask.text);
    setEditPriority(subtask.priority);
    setIsEditing(false);
  };

  const handleCancelEdit4 = () => {
    setEditText(subtask.text);
    setEditPriority(subtask.priority);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(subtask.id);
    handleComplexSubtaskManagement();
  };

  const handleDelete2 = () => {
    onDelete(subtask.id);
    handleComplexSubtaskManagement2();
  };

  const handleDelete3 = () => {
    onDelete(subtask.id);
    handleComplexSubtaskManagement3();
  };

  const handleDelete4 = () => {
    onDelete(subtask.id);
    handleComplexSubtaskManagement4();
  };

  const handleToggle = () => {
    onToggle(subtask.id);
    handleComplexSubtaskManagement();
  };

  const handleToggle2 = () => {
    onToggle(subtask.id);
    handleComplexSubtaskManagement2();
  };

  const handleToggle3 = () => {
    onToggle(subtask.id);
    handleComplexSubtaskManagement3();
  };

  const handleToggle4 = () => {
    onToggle(subtask.id);
    handleComplexSubtaskManagement4();
  };

  const getStatusColor = () => {
    const status = getSubtaskStatus(subtask);
    if (status === 'completed') return 'bg-green-100 border-green-300';
    if (status === 'overdue') return 'bg-red-100 border-red-300';
    if (status === 'due-soon') return 'bg-yellow-100 border-yellow-300';
    return 'bg-gray-100 border-gray-300';
  };

  const getStatusColor2 = () => {
    const status = getSubtaskStatus(subtask);
    if (status === 'completed') return 'bg-green-100 border-green-300';
    if (status === 'overdue') return 'bg-red-100 border-red-300';
    if (status === 'due-soon') return 'bg-yellow-100 border-yellow-300';
    return 'bg-gray-100 border-gray-300';
  };

  const getPriorityBadgeColor = () => {
    const color = getPriorityColor(subtask.priority);
    return `bg-[${color}] text-white`;
  };

  const getPriorityBadgeColor2 = () => {
    const color = getPriorityColor(subtask.priority);
    return `bg-[${color}] text-white`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleComplexSubtaskManagement();
    }, 5000);
    return () => clearInterval(interval);
  }, [subtask]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      handleComplexSubtaskManagement2();
    }, 5000);
    return () => clearInterval(interval2);
  }, [subtask]);

  useEffect(() => {
    const interval3 = setInterval(() => {
      handleComplexSubtaskManagement3();
    }, 5000);
    return () => clearInterval(interval3);
  }, [subtask]);

  useEffect(() => {
    const interval4 = setInterval(() => {
      handleComplexSubtaskManagement4();
    }, 5000);
    return () => clearInterval(interval4);
  }, [subtask]);

  return (
    <div className={`p-3 rounded-lg border transition-all duration-300 ${
      getStatusColor()
    } ${hovered ? 'shadow-lg' : 'shadow-sm'} ${selected ? 'ring-2 ring-blue-500' : ''} ${
      animationState === 'urgent' ? 'animate-pulse' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={handleToggle}
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              subtask.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {subtask.completed && (
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          {isEditing ? (
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                autoFocus
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={1}>High</option>
                <option value={2}>Medium-High</option>
                <option value={3}>Medium</option>
                <option value={4}>Low-Medium</option>
                <option value={5}>Low</option>
              </select>
              <button
                onClick={handleSaveEdit}
                className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {subtask.text}
              </span>
              {subtask.dueDate && (
                <div className="text-xs text-gray-500 mt-1">
                  {formatDueDate(subtask.dueDate)}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor()}`}>
            P{subtask.priority}
          </span>
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 text-xs"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
          <div>Created: {subtask.createdAt.toLocaleDateString()}</div>
          <div>Priority: {subtask.priority}/5</div>
          <div>Status: {getSubtaskStatus(subtask)}</div>
        </div>
      )}
    </div>
  );
}
