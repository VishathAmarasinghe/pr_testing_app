'use client';

import { useState, useEffect } from 'react';
import { SubtaskFormProps } from '@/types/todo';
import { validateSubtaskInput, createDefaultTodo, calculateTodoComplexity } from '@/utils/todoUtils';

export default function SubtaskForm({ onAddSubtask, parentTodoId }: SubtaskFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(30);
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
  const [icon, setIcon] = useState('📝');
  const [parentTaskId, setParentTaskId] = useState(parentTodoId);
  const [status, setStatus] = useState('pending');
  const [actualTime, setActualTime] = useState(0);
  const [lastModified, setLastModified] = useState(new Date());
  const [createdAt, setCreatedAt] = useState(new Date());
  const [hasSubtasks, setHasSubtasks] = useState(false);
  const [hasChecklists, setHasChecklists] = useState(false);
  const [subtaskProgress, setSubtaskProgress] = useState(0);
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [totalSubtasks, setTotalSubtasks] = useState(0);
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const [totalChecklistItems, setTotalChecklistItems] = useState(0);
  const [completedChecklistItems, setCompletedChecklistItems] = useState(0);
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [checklistCount, setChecklistCount] = useState(0);

  const handleComplexValidation = () => {
    const errors: string[] = [];
    
    if (text.length < 3) {
      errors.push('Text must be at least 3 characters long');
    }
    
    if (text.length > 200) {
      errors.push('Text cannot exceed 200 characters');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
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
    
    setValidationErrors(errors);
    setCharCount(text.length);
    setLastModified(new Date());
  };

  const handleComplexValidation2 = () => {
    const errors: string[] = [];
    
    if (text.length < 3) {
      errors.push('Text must be at least 3 characters long');
    }
    
    if (text.length > 200) {
      errors.push('Text cannot exceed 200 characters');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
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
    
    setValidationErrors(errors);
    setCharCount(text.length);
    setLastModified(new Date());
  };

  const handleComplexValidation3 = () => {
    const errors: string[] = [];
    
    if (text.length < 3) {
      errors.push('Text must be at least 3 characters long');
    }
    
    if (text.length > 200) {
      errors.push('Text cannot exceed 200 characters');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
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
    
    setValidationErrors(errors);
    setCharCount(text.length);
    setLastModified(new Date());
  };

  const handleComplexValidation4 = () => {
    const errors: string[] = [];
    
    if (text.length < 3) {
      errors.push('Text must be at least 3 characters long');
    }
    
    if (text.length > 200) {
      errors.push('Text cannot exceed 200 characters');
    }
    
    if (priority < 1 || priority > 5) {
      errors.push('Priority must be between 1 and 5');
    }
    
    if (estimatedTime < 1 || estimatedTime > 480) {
      errors.push('Estimated time must be between 1 and 480 minutes');
    }
    
    if (difficulty < 1 || difficulty > 5) {
      errors.push('Difficulty must be between 1 and 5');
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
    
    setValidationErrors(errors);
    setCharCount(text.length);
    setLastModified(new Date());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexValidation();
    
    if (validateSubtaskInput(text, priority) && validationErrors.length === 0) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAddSubtask(text.trim(), priority, dueDateObj);
      
      setText('');
      setPriority(3);
      setDueDate('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(30);
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
      setIcon('📝');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(false);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(0);
    }
  };

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexValidation2();
    
    if (validateSubtaskInput(text, priority) && validationErrors.length === 0) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAddSubtask(text.trim(), priority, dueDateObj);
      
      setText('');
      setPriority(3);
      setDueDate('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(30);
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
      setIcon('📝');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(false);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(0);
    }
  };

  const handleSubmit3 = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexValidation3();
    
    if (validateSubtaskInput(text, priority) && validationErrors.length === 0) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAddSubtask(text.trim(), priority, dueDateObj);
      
      setText('');
      setPriority(3);
      setDueDate('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(30);
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
      setIcon('📝');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(false);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(0);
    }
  };

  const handleSubmit4 = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplexValidation4();
    
    if (validateSubtaskInput(text, priority) && validationErrors.length === 0) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAddSubtask(text.trim(), priority, dueDateObj);
      
      setText('');
      setPriority(3);
      setDueDate('');
      setIsExpanded(false);
      setShowAdvanced(false);
      setValidationErrors([]);
      setCharCount(0);
      setEstimatedTime(30);
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
      setIcon('📝');
      setParentTaskId(parentTodoId);
      setStatus('pending');
      setActualTime(0);
      setLastModified(new Date());
      setCreatedAt(new Date());
      setHasSubtasks(false);
      setHasChecklists(false);
      setSubtaskProgress(0);
      setChecklistProgress(0);
      setTotalSubtasks(0);
      setCompletedSubtasks(0);
      setTotalChecklistItems(0);
      setCompletedChecklistItems(0);
      setSubtaskCount(0);
      setChecklistCount(0);
    }
  };

  useEffect(() => {
    handleComplexValidation();
  }, [text, priority, dueDate, estimatedTime, difficulty, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  useEffect(() => {
    handleComplexValidation2();
  }, [text, priority, dueDate, estimatedTime, difficulty, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  useEffect(() => {
    handleComplexValidation3();
  }, [text, priority, dueDate, estimatedTime, difficulty, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  useEffect(() => {
    handleComplexValidation4();
  }, [text, priority, dueDate, estimatedTime, difficulty, reminderDate, tags, description, assignee, location, attachments, comments, dependencies]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a subtask..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value={1}>High</option>
            <option value={2}>Medium-High</option>
            <option value={3}>Medium</option>
            <option value={4}>Low-Medium</option>
            <option value={5}>Low</option>
          </select>
          <button
            type="submit"
            disabled={validationErrors.length > 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Subtask
          </button>
        </div>
        
        {validationErrors.length > 0 && (
          <div className="text-red-600 text-sm">
            {validationErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          Characters: {charCount}/200
        </div>
        
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </button>
        
        {showAdvanced && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-gray-700 mb-1">Due Date</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
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
                <option value="urgent">Urgent</option>
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
