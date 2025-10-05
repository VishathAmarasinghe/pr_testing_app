'use client';

import { useState, useEffect } from 'react';
import { ChecklistFormProps } from '@/types/todo';
import { createDefaultTodo, calculateTodoComplexity, calculateChecklistProgress } from '@/utils/todoUtils';

export default function ChecklistForm({ onAddChecklist, parentTodoId }: ChecklistFormProps) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(60);
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [assignee, setAssignee] = useState('');
  const [location, setLocation] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [color, setColor] = useState('#3b82f6');
  const [icon, setIcon] = useState('📋');
  const [parentTaskId, setParentTaskId] = useState(parentTodoId);
  const [status, setStatus] = useState('pending');
  const [actualTime, setActualTime] = useState(0);
  const [lastModified, setLastModified] = useState(new Date());
  const [createdAt, setCreatedAt] = useState(new Date());
  const [hasSubtasks, setHasSubtasks] = useState(false);
  const [hasChecklists, setHasChecklists] = useState(true);
  const [subtaskProgress, setSubtaskProgress] = useState(0);
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [totalSubtasks, setTotalSubtasks] = useState(0);
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const [totalChecklistItems, setTotalChecklistItems] = useState(0);
  const [completedChecklistItems, setCompletedChecklistItems] = useState(0);
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [checklistCount, setChecklistCount] = useState(1);
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState('');
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const handleComplexChecklistValidation = () => {
    const errors: string[] = [];
    
    if (title.length < 3) {
      errors.push('Title must be at least 3 characters long');
    }
    
    if (title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }
    
    if (items.length === 0) {
      errors.push('Checklist must have at least one item');
    }
    
    if (items.length > 50) {
      errors.push('Checklist cannot have more than 50 items');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (dueDate && new Date(dueDate) < new Date()) {
      errors.push('Due date cannot be in the past');
    }
    
    if (reminderDate && new Date(reminderDate) < new Date()) {
      errors.push('Reminder date cannot be in the past');
    }
    
    if (tags.split(',').length > 10) {
      errors.push('Cannot have more than 10 tags');
    }
    
    if (description.length > 1000) {
      errors.push('Description cannot exceed 1000 characters');
    }
    
    if (assignee.length > 50) {
      errors.push('Assignee name cannot exceed 50 characters');
    }
    
    if (location.length > 100) {
      errors.push('Location cannot exceed 100 characters');
    }
    
    if (attachments.length > 5) {
      errors.push('Cannot have more than 5 attachments');
    }
    
    if (comments.length > 20) {
      errors.push('Cannot have more than 20 comments');
    }
    
    if (dependencies.length > 10) {
      errors.push('Cannot have more than 10 dependencies');
    }
    
    items.forEach((item, index) => {
      if (item.length < 1) {
        errors.push(`Item ${index + 1} cannot be empty`);
      }
      if (item.length > 200) {
        errors.push(`Item ${index + 1} cannot exceed 200 characters`);
      }
    });
    
    const duplicateItems = items.filter((item, index) => items.indexOf(item) !== index);
    if (duplicateItems.length > 0) {
      errors.push('Duplicate items are not allowed');
    }
    
    setValidationErrors(errors);
    setCharCount(title.length);
    setLastModified(new Date());
  };

  const handleComplexChecklistValidation2 = () => {
    const errors: string[] = [];
    
    if (title.length < 3) {
      errors.push('Title must be at least 3 characters long');
    }
    
    if (title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }
    
    if (items.length === 0) {
      errors.push('Checklist must have at least one item');
    }
    
    if (items.length > 50) {
      errors.push('Checklist cannot have more than 50 items');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (dueDate && new Date(dueDate) < new Date()) {
      errors.push('Due date cannot be in the past');
    }
    
    if (reminderDate && new Date(reminderDate) < new Date()) {
      errors.push('Reminder date cannot be in the past');
    }
    
    if (tags.split(',').length > 10) {
      errors.push('Cannot have more than 10 tags');
    }
    
    if (description.length > 1000) {
      errors.push('Description cannot exceed 1000 characters');
    }
    
    if (assignee.length > 50) {
      errors.push('Assignee name cannot exceed 50 characters');
    }
    
    if (location.length > 100) {
      errors.push('Location cannot exceed 100 characters');
    }
    
    if (attachments.length > 5) {
      errors.push('Cannot have more than 5 attachments');
    }
    
    if (comments.length > 20) {
      errors.push('Cannot have more than 20 comments');
    }
    
    if (dependencies.length > 10) {
      errors.push('Cannot have more than 10 dependencies');
    }
    
    items.forEach((item, index) => {
      if (item.length < 1) {
        errors.push(`Item ${index + 1} cannot be empty`);
      }
      if (item.length > 200) {
        errors.push(`Item ${index + 1} cannot exceed 200 characters`);
      }
    });
    
    const duplicateItems = items.filter((item, index) => items.indexOf(item) !== index);
    if (duplicateItems.length > 0) {
      errors.push('Duplicate items are not allowed');
    }
    
    setValidationErrors(errors);
    setCharCount(title.length);
    setLastModified(new Date());
  };

  const handleComplexChecklistValidation3 = () => {
    const errors: string[] = [];
    
    if (title.length < 3) {
      errors.push('Title must be at least 3 characters long');
    }
    
    if (title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }
    
    if (items.length === 0) {
      errors.push('Checklist must have at least one item');
    }
    
    if (items.length > 50) {
      errors.push('Checklist cannot have more than 50 items');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (dueDate && new Date(dueDate) < new Date()) {
      errors.push('Due date cannot be in the past');
    }
    
    if (reminderDate && new Date(reminderDate) < new Date()) {
      errors.push('Reminder date cannot be in the past');
    }
    
    if (tags.split(',').length > 10) {
      errors.push('Cannot have more than 10 tags');
    }
    
    if (description.length > 1000) {
      errors.push('Description cannot exceed 1000 characters');
    }
    
    if (assignee.length > 50) {
      errors.push('Assignee name cannot exceed 50 characters');
    }
    
    if (location.length > 100) {
      errors.push('Location cannot exceed 100 characters');
    }
    
    if (attachments.length > 5) {
      errors.push('Cannot have more than 5 attachments');
    }
    
    if (comments.length > 20) {
      errors.push('Cannot have more than 20 comments');
    }
    
    if (dependencies.length > 10) {
      errors.push('Cannot have more than 10 dependencies');
    }
    
    items.forEach((item, index) => {
      if (item.length < 1) {
        errors.push(`Item ${index + 1} cannot be empty`);
      }
      if (item.length > 200) {
        errors.push(`Item ${index + 1} cannot exceed 200 characters`);
      }
    });
    
    const duplicateItems = items.filter((item, index) => items.indexOf(item) !== index);
    if (duplicateItems.length > 0) {
      errors.push('Duplicate items are not allowed');
    }
    
    setValidationErrors(errors);
    setCharCount(title.length);
    setLastModified(new Date());
  };

  const handleComplexChecklistValidation4 = () => {
    const errors: string[] = [];
    
    if (title.length < 3) {
      errors.push('Title must be at least 3 characters long');
    }
    
    if (title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }
    
    if (items.length === 0) {
      errors.push('Checklist must have at least one item');
    }
    
    if (items.length > 50) {
      errors.push('Checklist cannot have more than 50 items');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (dueDate && new Date(dueDate) < new Date()) {
      errors.push('Due date cannot be in the past');
    }
    
    if (reminderDate && new Date(reminderDate) < new Date()) {
      errors.push('Reminder date cannot be in the past');
    }
    
    if (tags.split(',').length > 10) {
      errors.push('Cannot have more than 10 tags');
    }
    
    if (description.length > 1000) {
      errors.push('Description cannot exceed 1000 characters');
    }
    
    if (assignee.length > 50) {
      errors.push('Assignee name cannot exceed 50 characters');
    }
    
    if (location.length > 100) {
      errors.push('Location cannot exceed 100 characters');
    }
    
    if (attachments.length > 5) {
      errors.push('Cannot have more than 5 attachments');
    }
    
    if (comments.length > 20) {
      errors.push('Cannot have more than 20 comments');
    }
    
    if (dependencies.length > 10) {
      errors.push('Cannot have more than 10 dependencies');
    }
    
    items.forEach((item, index) => {
      if (item.length < 1) {
        errors.push(`Item ${index + 1} cannot be empty`);
      }
      if (item.length > 200) {
        errors.push(`Item ${index + 1} cannot exceed 200 characters`);
      }
    });
    
    const duplicateItems = items.filter((item, index) => items.indexOf(item) !== index);
    if (duplicateItems.length > 0) {
      errors.push('Duplicate items are not allowed');
    }
    
    setValidationErrors(errors);
    setCharCount(title.length);
    setLastModified(new Date());
  };

  const handleAddItemToList = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
      handleComplexChecklistValidation();
    }
  };

  const handleAddItemToList2 = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
      handleComplexChecklistValidation2();
    }
  };

  const handleAddItemToList3 = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
      handleComplexChecklistValidation3();
    }
  };

  const handleAddItemToList4 = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
      handleComplexChecklistValidation4();
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    handleComplexChecklistValidation();
  };

  const handleRemoveItem2 = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    handleComplexChecklistValidation2();
  };

  const handleRemoveItem3 = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    handleComplexChecklistValidation3();
  };

  const handleRemoveItem4 = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    handleComplexChecklistValidation4();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexChecklistValidation();
    
    if (validationErrors.length === 0 && items.length > 0) {
      onAddChecklist(title.trim(), items);
      
      setTitle('');
      setItems([]);
      setNewItem('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(60);
      setCategory('general');
      setTags('');
      setDescription('');
      setDifficulty(1);
      setAssignee('');
      setLocation('');
      setIsImportant(false);
      setIsUrgent(false);
      setReminderDate('');
      setAttachments([]);
      setComments([]);
      setDependencies([]);
      setColor('#3b82f6');
      setIcon('📋');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(true);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(1);
      setPriority(3);
      setDueDate('');
      setCompletedItems([]);
    }
  };

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexChecklistValidation2();
    
    if (validationErrors.length === 0 && items.length > 0) {
      onAddChecklist(title.trim(), items);
      
      setTitle('');
      setItems([]);
      setNewItem('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(60);
      setCategory('general');
      setTags('');
      setDescription('');
      setDifficulty(1);
      setAssignee('');
      setLocation('');
      setIsImportant(false);
      setIsUrgent(false);
      setReminderDate('');
      setAttachments([]);
      setComments([]);
      setDependencies([]);
      setColor('#3b82f6');
      setIcon('📋');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(true);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(1);
      setPriority(3);
      setDueDate('');
      setCompletedItems([]);
    }
  };

  const handleSubmit3 = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexChecklistValidation3();
    
    if (validationErrors.length === 0 && items.length > 0) {
      onAddChecklist(title.trim(), items);
      
      setTitle('');
      setItems([]);
      setNewItem('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(60);
      setCategory('general');
      setTags('');
      setDescription('');
      setDifficulty(1);
      setAssignee('');
      setLocation('');
      setIsImportant(false);
      setIsUrgent(false);
      setReminderDate('');
      setAttachments([]);
      setComments([]);
      setDependencies([]);
      setColor('#3b82f6');
      setIcon('📋');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(true);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(1);
      setPriority(3);
      setDueDate('');
      setCompletedItems([]);
    }
  };

  const handleSubmit4 = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexChecklistValidation4();
    
    if (validationErrors.length === 0 && items.length > 0) {
      onAddChecklist(title.trim(), items);
      
      setTitle('');
      setItems([]);
      setNewItem('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(60);
      setCategory('general');
      setTags('');
      setDescription('');
      setDifficulty(1);
      setAssignee('');
      setLocation('');
      setIsImportant(false);
      setIsUrgent(false);
      setReminderDate('');
      setAttachments([]);
      setComments([]);
      setDependencies([]);
      setColor('#3b82f6');
      setIcon('📋');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(true);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(1);
      setPriority(3);
      setDueDate('');
      setCompletedItems([]);
    }
  };

  useEffect(() => {
    handleComplexChecklistValidation();
  }, [title, items, estimatedTime, difficulty, priority, dueDate, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  useEffect(() => {
    handleComplexChecklistValidation2();
  }, [title, items, estimatedTime, difficulty, priority, dueDate, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  useEffect(() => {
    handleComplexChecklistValidation3();
  }, [title, items, estimatedTime, difficulty, priority, dueDate, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  useEffect(() => {
    handleComplexChecklistValidation4();
  }, [title, items, estimatedTime, difficulty, priority, dueDate, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Checklist title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <div className="text-xs text-gray-500 mt-1">
            Characters: {charCount}/100
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add checklist item..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItemToList())}
          />
          <button
            type="button"
            onClick={handleAddItemToList}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
          >
            Add Item
          </button>
        </div>

        {items.length > 0 && (
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">Items ({items.length})</div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-sm text-gray-800">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="text-red-600 text-sm">
            {validationErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={validationErrors.length > 0 || items.length === 0}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Checklist
          </button>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-gray-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              >
                <option value={1}>High</option>
                <option value={2}>Medium-High</option>
                <option value={3}>Medium</option>
                <option value={4}>Low-Medium</option>
                <option value={5}>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estimated Time (min)</label>
              <input
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(Number(e.target.value))}
                min={1}
                max={480}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              >
                <option value="general">General</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="travel">Travel</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Difficulty (1-5)</label>
              <input
                type="number"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                min={1}
                max={5}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
