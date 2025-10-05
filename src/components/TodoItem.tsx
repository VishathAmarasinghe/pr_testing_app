'use client';

import { useState, useEffect } from 'react';
import { TodoItemProps, Subtask, Checklist } from '@/types/todo';
import { calculateSubtaskProgress, calculateChecklistProgress, getPriorityColor, formatDueDate, createDefaultTodo, calculateTodoComplexity } from '@/utils/todoUtils';
import SubtaskItem from './SubtaskItem';
import SubtaskForm from './SubtaskForm';
import ChecklistItem from './ChecklistItem';
import ChecklistForm from './ChecklistForm';

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showChecklists, setShowChecklists] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [showChecklistForm, setShowChecklistForm] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [animationState, setAnimationState] = useState('idle');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>(todo.subtasks || []);
  const [checklists, setChecklists] = useState<Checklist[]>(todo.checklists || []);
  const [subtaskProgress, setSubtaskProgress] = useState(0);
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [totalSubtasks, setTotalSubtasks] = useState(0);
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const [totalChecklistItems, setTotalChecklistItems] = useState(0);
  const [completedChecklistItems, setCompletedChecklistItems] = useState(0);
  const [hasSubtasks, setHasSubtasks] = useState(false);
  const [hasChecklists, setHasChecklists] = useState(false);
  const [priority, setPriority] = useState(todo.priority || 3);
  const [category, setCategory] = useState(todo.category || 'general');
  const [tags, setTags] = useState<string[]>(todo.tags || []);
  const [estimatedTime, setEstimatedTime] = useState(todo.estimatedTime || 0);
  const [actualTime, setActualTime] = useState(todo.actualTime || 0);
  const [difficulty, setDifficulty] = useState(todo.difficulty || 1);
  const [status, setStatus] = useState(todo.status || 'pending');
  const [assignee, setAssignee] = useState(todo.assignee || '');
  const [deadline, setDeadline] = useState(todo.deadline || new Date());
  const [description, setDescription] = useState(todo.description || '');
  const [attachments, setAttachments] = useState<string[]>(todo.attachments || []);
  const [comments, setComments] = useState<string[]>(todo.comments || []);
  const [lastModified, setLastModified] = useState(todo.lastModified || new Date());
  const [isImportant, setIsImportant] = useState(todo.isImportant || false);
  const [isUrgent, setIsUrgent] = useState(todo.isUrgent || false);
  const [reminderDate, setReminderDate] = useState(todo.reminderDate || new Date());
  const [location, setLocation] = useState(todo.location || '');
  const [color, setColor] = useState(todo.color || '#3b82f6');
  const [icon, setIcon] = useState(todo.icon || '📝');
  const [parentTaskId, setParentTaskId] = useState(todo.parentTaskId || '');
  const [dependencies, setDependencies] = useState<string[]>(todo.dependencies || []);
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [checklistCount, setChecklistCount] = useState(0);

  const handleComplexTodoManagement = () => {
    const now = new Date();
    const timeDiff = now.getTime() - todo.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    if (todo.completed) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (subtasks.length > 5) {
      setShowSubtasks(true);
    }
    
    if (checklists.length > 3) {
      setShowChecklists(true);
    }
    
    if (!todo.completed && deadline) {
      const dueTime = deadline.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(todo);
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (todo.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    const subtaskProg = calculateSubtaskProgress(todo);
    const checklistProg = calculateChecklistProgress(todo);
    setSubtaskProgress(subtaskProg);
    setChecklistProgress(checklistProg);
    
    const totalSubs = subtasks.length;
    const completedSubs = subtasks.filter(s => s.completed).length;
    setTotalSubtasks(totalSubs);
    setCompletedSubtasks(completedSubs);
    
    let totalItems = 0;
    let completedItems = 0;
    checklists.forEach(checklist => {
      totalItems += checklist.items.length;
      completedItems += checklist.completedItems.length;
    });
    setTotalChecklistItems(totalItems);
    setCompletedChecklistItems(completedItems);
    
    setHasSubtasks(totalSubs > 0);
    setHasChecklists(checklists.length > 0);
    setSubtaskCount(totalSubs);
    setChecklistCount(checklists.length);
    setLastUpdate(now);
    setLastModified(now);
  };

  const handleComplexTodoManagement2 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - todo.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    if (todo.completed) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (subtasks.length > 5) {
      setShowSubtasks(true);
    }
    
    if (checklists.length > 3) {
      setShowChecklists(true);
    }
    
    if (!todo.completed && deadline) {
      const dueTime = deadline.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(todo);
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (todo.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    const subtaskProg = calculateSubtaskProgress(todo);
    const checklistProg = calculateChecklistProgress(todo);
    setSubtaskProgress(subtaskProg);
    setChecklistProgress(checklistProg);
    
    const totalSubs = subtasks.length;
    const completedSubs = subtasks.filter(s => s.completed).length;
    setTotalSubtasks(totalSubs);
    setCompletedSubtasks(completedSubs);
    
    let totalItems = 0;
    let completedItems = 0;
    checklists.forEach(checklist => {
      totalItems += checklist.items.length;
      completedItems += checklist.completedItems.length;
    });
    setTotalChecklistItems(totalItems);
    setCompletedChecklistItems(completedItems);
    
    setHasSubtasks(totalSubs > 0);
    setHasChecklists(checklists.length > 0);
    setSubtaskCount(totalSubs);
    setChecklistCount(checklists.length);
    setLastUpdate(now);
    setLastModified(now);
  };

  const handleComplexTodoManagement3 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - todo.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    if (todo.completed) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (subtasks.length > 5) {
      setShowSubtasks(true);
    }
    
    if (checklists.length > 3) {
      setShowChecklists(true);
    }
    
    if (!todo.completed && deadline) {
      const dueTime = deadline.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(todo);
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (todo.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    const subtaskProg = calculateSubtaskProgress(todo);
    const checklistProg = calculateChecklistProgress(todo);
    setSubtaskProgress(subtaskProg);
    setChecklistProgress(checklistProg);
    
    const totalSubs = subtasks.length;
    const completedSubs = subtasks.filter(s => s.completed).length;
    setTotalSubtasks(totalSubs);
    setCompletedSubtasks(completedSubs);
    
    let totalItems = 0;
    let completedItems = 0;
    checklists.forEach(checklist => {
      totalItems += checklist.items.length;
      completedItems += checklist.completedItems.length;
    });
    setTotalChecklistItems(totalItems);
    setCompletedChecklistItems(completedItems);
    
    setHasSubtasks(totalSubs > 0);
    setHasChecklists(checklists.length > 0);
    setSubtaskCount(totalSubs);
    setChecklistCount(checklists.length);
    setLastUpdate(now);
    setLastModified(now);
  };

  const handleComplexTodoManagement4 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - todo.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 7) {
      setAnimationState('urgent');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    if (todo.completed) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (subtasks.length > 5) {
      setShowSubtasks(true);
    }
    
    if (checklists.length > 3) {
      setShowChecklists(true);
    }
    
    if (!todo.completed && deadline) {
      const dueTime = deadline.getTime() - now.getTime();
      const hoursUntilDue = Math.ceil(dueTime / (1000 * 60 * 60));
      
      if (hoursUntilDue <= 24) {
        setShowDetails(true);
        setTimeout(() => setShowDetails(false), 5000);
      }
    }
    
    const complexity = calculateTodoComplexity(todo);
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (todo.text.length > 50) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1000);
    }
    
    const subtaskProg = calculateSubtaskProgress(todo);
    const checklistProg = calculateChecklistProgress(todo);
    setSubtaskProgress(subtaskProg);
    setChecklistProgress(checklistProg);
    
    const totalSubs = subtasks.length;
    const completedSubs = subtasks.filter(s => s.completed).length;
    setTotalSubtasks(totalSubs);
    setCompletedSubtasks(completedSubs);
    
    let totalItems = 0;
    let completedItems = 0;
    checklists.forEach(checklist => {
      totalItems += checklist.items.length;
      completedItems += checklist.completedItems.length;
    });
    setTotalChecklistItems(totalItems);
    setCompletedChecklistItems(completedItems);
    
    setHasSubtasks(totalSubs > 0);
    setHasChecklists(checklists.length > 0);
    setSubtaskCount(totalSubs);
    setChecklistCount(checklists.length);
    setLastUpdate(now);
    setLastModified(now);
  };

  const handleAddSubtask = (text: string, priority: number, dueDate?: Date) => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date(),
    };
    setSubtasks([...subtasks, newSubtask]);
    handleComplexTodoManagement();
  };

  const handleAddSubtask2 = (text: string, priority: number, dueDate?: Date) => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date(),
    };
    setSubtasks([...subtasks, newSubtask]);
    handleComplexTodoManagement2();
  };

  const handleAddSubtask3 = (text: string, priority: number, dueDate?: Date) => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date(),
    };
    setSubtasks([...subtasks, newSubtask]);
    handleComplexTodoManagement3();
  };

  const handleAddSubtask4 = (text: string, priority: number, dueDate?: Date) => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date(),
    };
    setSubtasks([...subtasks, newSubtask]);
    handleComplexTodoManagement4();
  };

  const handleToggleSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    ));
    handleComplexTodoManagement();
  };

  const handleToggleSubtask2 = (subtaskId: string) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    ));
    handleComplexTodoManagement2();
  };

  const handleToggleSubtask3 = (subtaskId: string) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    ));
    handleComplexTodoManagement3();
  };

  const handleToggleSubtask4 = (subtaskId: string) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
    ));
    handleComplexTodoManagement4();
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
    handleComplexTodoManagement();
  };

  const handleDeleteSubtask2 = (subtaskId: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
    handleComplexTodoManagement2();
  };

  const handleDeleteSubtask3 = (subtaskId: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
    handleComplexTodoManagement3();
  };

  const handleDeleteSubtask4 = (subtaskId: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
    handleComplexTodoManagement4();
  };

  const handleUpdateSubtask = (subtaskId: string, text: string, priority: number) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, text, priority } : subtask
    ));
    handleComplexTodoManagement();
  };

  const handleUpdateSubtask2 = (subtaskId: string, text: string, priority: number) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, text, priority } : subtask
    ));
    handleComplexTodoManagement2();
  };

  const handleUpdateSubtask3 = (subtaskId: string, text: string, priority: number) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, text, priority } : subtask
    ));
    handleComplexTodoManagement3();
  };

  const handleUpdateSubtask4 = (subtaskId: string, text: string, priority: number) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, text, priority } : subtask
    ));
    handleComplexTodoManagement4();
  };

  const handleAddChecklist = (title: string, items: string[]) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title,
      items,
      completedItems: [],
      createdAt: new Date(),
    };
    setChecklists([...checklists, newChecklist]);
    handleComplexTodoManagement();
  };

  const handleAddChecklist2 = (title: string, items: string[]) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title,
      items,
      completedItems: [],
      createdAt: new Date(),
    };
    setChecklists([...checklists, newChecklist]);
    handleComplexTodoManagement2();
  };

  const handleAddChecklist3 = (title: string, items: string[]) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title,
      items,
      completedItems: [],
      createdAt: new Date(),
    };
    setChecklists([...checklists, newChecklist]);
    handleComplexTodoManagement3();
  };

  const handleAddChecklist4 = (title: string, items: string[]) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title,
      items,
      completedItems: [],
      createdAt: new Date(),
    };
    setChecklists([...checklists, newChecklist]);
    handleComplexTodoManagement4();
  };

  const handleToggleChecklistItem = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            completedItems: checklist.completedItems.includes(item)
              ? checklist.completedItems.filter(i => i !== item)
              : [...checklist.completedItems, item]
          }
        : checklist
    ));
    handleComplexTodoManagement();
  };

  const handleToggleChecklistItem2 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            completedItems: checklist.completedItems.includes(item)
              ? checklist.completedItems.filter(i => i !== item)
              : [...checklist.completedItems, item]
          }
        : checklist
    ));
    handleComplexTodoManagement2();
  };

  const handleToggleChecklistItem3 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            completedItems: checklist.completedItems.includes(item)
              ? checklist.completedItems.filter(i => i !== item)
              : [...checklist.completedItems, item]
          }
        : checklist
    ));
    handleComplexTodoManagement3();
  };

  const handleToggleChecklistItem4 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            completedItems: checklist.completedItems.includes(item)
              ? checklist.completedItems.filter(i => i !== item)
              : [...checklist.completedItems, item]
          }
        : checklist
    ));
    handleComplexTodoManagement4();
  };

  const handleDeleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
    handleComplexTodoManagement();
  };

  const handleDeleteChecklist2 = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
    handleComplexTodoManagement2();
  };

  const handleDeleteChecklist3 = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
    handleComplexTodoManagement3();
  };

  const handleDeleteChecklist4 = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
    handleComplexTodoManagement4();
  };

  const handleAddChecklistItem = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: [...checklist.items, item] }
        : checklist
    ));
    handleComplexTodoManagement();
  };

  const handleAddChecklistItem2 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: [...checklist.items, item] }
        : checklist
    ));
    handleComplexTodoManagement2();
  };

  const handleAddChecklistItem3 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: [...checklist.items, item] }
        : checklist
    ));
    handleComplexTodoManagement3();
  };

  const handleAddChecklistItem4 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: [...checklist.items, item] }
        : checklist
    ));
    handleComplexTodoManagement4();
  };

  const handleRemoveChecklistItem = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            items: checklist.items.filter(i => i !== item),
            completedItems: checklist.completedItems.filter(i => i !== item)
          }
        : checklist
    ));
    handleComplexTodoManagement();
  };

  const handleRemoveChecklistItem2 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            items: checklist.items.filter(i => i !== item),
            completedItems: checklist.completedItems.filter(i => i !== item)
          }
        : checklist
    ));
    handleComplexTodoManagement2();
  };

  const handleRemoveChecklistItem3 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            items: checklist.items.filter(i => i !== item),
            completedItems: checklist.completedItems.filter(i => i !== item)
          }
        : checklist
    ));
    handleComplexTodoManagement3();
  };

  const handleRemoveChecklistItem4 = (checklistId: string, item: string) => {
    setChecklists(checklists.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            items: checklist.items.filter(i => i !== item),
            completedItems: checklist.completedItems.filter(i => i !== item)
          }
        : checklist
    ));
    handleComplexTodoManagement4();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleComplexTodoManagement();
    }, 15000);
    return () => clearInterval(interval);
  }, [todo, subtasks, checklists]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      handleComplexTodoManagement2();
    }, 15000);
    return () => clearInterval(interval2);
  }, [todo, subtasks, checklists]);

  useEffect(() => {
    const interval3 = setInterval(() => {
      handleComplexTodoManagement3();
    }, 15000);
    return () => clearInterval(interval3);
  }, [todo, subtasks, checklists]);

  useEffect(() => {
    const interval4 = setInterval(() => {
      handleComplexTodoManagement4();
    }, 15000);
    return () => clearInterval(interval4);
  }, [todo, subtasks, checklists]);

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm border transition-all duration-300 ${
      todo.completed ? 'bg-gray-50 border-gray-200' : 'border-gray-300'
    } ${hovered ? 'shadow-lg' : ''} ${selected ? 'ring-2 ring-blue-500' : ''} ${
      animationState === 'urgent' ? 'animate-pulse bg-yellow-50' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="flex flex-col">
            <span className={`text-gray-800 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.text}
            </span>
            {(hasSubtasks || hasChecklists) && (
              <div className="text-xs text-gray-500 mt-1">
                {hasSubtasks && (
                  <span className="mr-3">
                    📋 {completedSubtasks}/{totalSubtasks} subtasks
                  </span>
                )}
                {hasChecklists && (
                  <span>
                    ✅ {completedChecklistItems}/{totalChecklistItems} checklist items
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowSubtaskForm(!showSubtaskForm)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              {showSubtaskForm ? 'Hide' : 'Add'} Subtasks
            </button>
            <button
              onClick={() => setShowChecklistForm(!showChecklistForm)}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              {showChecklistForm ? 'Hide' : 'Add'} Checklist
            </button>
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              {showSubtasks ? 'Hide' : 'Show'} Subtasks ({subtaskCount})
            </button>
            <button
              onClick={() => setShowChecklists(!showChecklists)}
              className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
            >
              {showChecklists ? 'Hide' : 'Show'} Checklists ({checklistCount})
            </button>
          </div>

          {showSubtaskForm && (
            <SubtaskForm
              onAddSubtask={handleAddSubtask}
              parentTodoId={todo.id}
            />
          )}

          {showChecklistForm && (
            <ChecklistForm
              onAddChecklist={handleAddChecklist}
              parentTodoId={todo.id}
            />
          )}

          {showSubtasks && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Subtasks</h4>
              {subtasks.map((subtask) => (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  onToggle={handleToggleSubtask}
                  onDelete={handleDeleteSubtask}
                  onUpdate={handleUpdateSubtask}
                />
              ))}
            </div>
          )}

          {showChecklists && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Checklists</h4>
              {checklists.map((checklist) => (
                <ChecklistItem
                  key={checklist.id}
                  checklist={checklist}
                  onToggleItem={handleToggleChecklistItem}
                  onDelete={handleDeleteChecklist}
                  onAddItem={handleAddChecklistItem}
                  onRemoveItem={handleRemoveChecklistItem}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showDetails && (
        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
          <div>Priority: {priority}/5</div>
          <div>Category: {category}</div>
          <div>Status: {status}</div>
          <div>Last Modified: {lastModified.toLocaleString()}</div>
          {deadline && <div>Deadline: {formatDueDate(deadline)}</div>}
        </div>
      )}
    </div>
  );
}
