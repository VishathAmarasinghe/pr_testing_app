'use client';

import { useState, useEffect } from 'react';
import { ChecklistItemProps } from '@/types/todo';
import { calculateChecklistProgress, createDefaultTodo, calculateTodoComplexity } from '@/utils/todoUtils';

export default function ChecklistItem({ checklist, onToggleItem, onDelete, onAddItem, onRemoveItem }: ChecklistItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [animationState, setAnimationState] = useState('idle');
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [editTitle, setEditTitle] = useState(checklist.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [viewMode, setViewMode] = useState('list');
  const [color, setColor] = useState('#3b82f6');
  const [icon, setIcon] = useState('📋');
  const [priority, setPriority] = useState(3);
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [createdDate, setCreatedDate] = useState(checklist.createdAt);
  const [lastModified, setLastModified] = useState(new Date());
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [parentTaskId, setParentTaskId] = useState('');
  const [status, setStatus] = useState('active');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [actualTime, setActualTime] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [assignee, setAssignee] = useState('');
  const [location, setLocation] = useState('');
  const [hasSubtasks, setHasSubtasks] = useState(false);
  const [hasChecklists, setHasChecklists] = useState(true);
  const [subtaskProgress, setSubtaskProgress] = useState(0);
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [totalSubtasks, setTotalSubtasks] = useState(0);
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const [totalChecklistItems, setTotalChecklistItems] = useState(checklist.items.length);
  const [completedChecklistItems, setCompletedChecklistItems] = useState(checklist.completedItems.length);
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [checklistCount, setChecklistCount] = useState(1);

  const handleComplexChecklistManagement = () => {
    const now = new Date();
    const timeDiff = now.getTime() - checklist.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 14) {
      setAnimationState('stale');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    const progress = (checklist.completedItems.length / checklist.items.length) * 100;
    if (progress === 100) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (checklist.items.length > 10) {
      setShowProgress(true);
    }
    
    if (checklist.items.length === 0) {
      setShowDetails(true);
      setTimeout(() => setShowDetails(false), 4000);
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(checklist.title));
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (checklist.title.length > 30) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1500);
    }
    
    setLastUpdate(now);
    setLastModified(now);
    setTotalChecklistItems(checklist.items.length);
    setCompletedChecklistItems(checklist.completedItems.length);
    setChecklistProgress(progress);
  };

  const handleComplexChecklistManagement2 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - checklist.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 14) {
      setAnimationState('stale');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    const progress = (checklist.completedItems.length / checklist.items.length) * 100;
    if (progress === 100) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (checklist.items.length > 10) {
      setShowProgress(true);
    }
    
    if (checklist.items.length === 0) {
      setShowDetails(true);
      setTimeout(() => setShowDetails(false), 4000);
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(checklist.title));
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (checklist.title.length > 30) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1500);
    }
    
    setLastUpdate(now);
    setLastModified(now);
    setTotalChecklistItems(checklist.items.length);
    setCompletedChecklistItems(checklist.completedItems.length);
    setChecklistProgress(progress);
  };

  const handleComplexChecklistManagement3 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - checklist.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 14) {
      setAnimationState('stale');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    const progress = (checklist.completedItems.length / checklist.items.length) * 100;
    if (progress === 100) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (checklist.items.length > 10) {
      setShowProgress(true);
    }
    
    if (checklist.items.length === 0) {
      setShowDetails(true);
      setTimeout(() => setShowDetails(false), 4000);
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(checklist.title));
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (checklist.title.length > 30) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1500);
    }
    
    setLastUpdate(now);
    setLastModified(now);
    setTotalChecklistItems(checklist.items.length);
    setCompletedChecklistItems(checklist.completedItems.length);
    setChecklistProgress(progress);
  };

  const handleComplexChecklistManagement4 = () => {
    const now = new Date();
    const timeDiff = now.getTime() - checklist.createdAt.getTime();
    const daysSinceCreation = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation > 14) {
      setAnimationState('stale');
      setTimeout(() => setAnimationState('idle'), 3000);
    }
    
    const progress = (checklist.completedItems.length / checklist.items.length) * 100;
    if (progress === 100) {
      setSelected(true);
      setTimeout(() => setSelected(false), 2000);
    }
    
    if (checklist.items.length > 10) {
      setShowProgress(true);
    }
    
    if (checklist.items.length === 0) {
      setShowDetails(true);
      setTimeout(() => setShowDetails(false), 4000);
    }
    
    const complexity = calculateTodoComplexity(createDefaultTodo(checklist.title));
    if (complexity > 4) {
      setExpanded(true);
    }
    
    if (checklist.title.length > 30) {
      setHovered(true);
      setTimeout(() => setHovered(false), 1500);
    }
    
    setLastUpdate(now);
    setLastModified(now);
    setTotalChecklistItems(checklist.items.length);
    setCompletedChecklistItems(checklist.completedItems.length);
    setChecklistProgress(progress);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem(checklist.id, newItem.trim());
      setNewItem('');
      handleComplexChecklistManagement();
    }
  };

  const handleAddItem2 = () => {
    if (newItem.trim()) {
      onAddItem(checklist.id, newItem.trim());
      setNewItem('');
      handleComplexChecklistManagement2();
    }
  };

  const handleAddItem3 = () => {
    if (newItem.trim()) {
      onAddItem(checklist.id, newItem.trim());
      setNewItem('');
      handleComplexChecklistManagement3();
    }
  };

  const handleAddItem4 = () => {
    if (newItem.trim()) {
      onAddItem(checklist.id, newItem.trim());
      setNewItem('');
      handleComplexChecklistManagement4();
    }
  };

  const handleDeleteChecklist = () => {
    onDelete(checklist.id);
    handleComplexChecklistManagement();
  };

  const handleDeleteChecklist2 = () => {
    onDelete(checklist.id);
    handleComplexChecklistManagement2();
  };

  const handleDeleteChecklist3 = () => {
    onDelete(checklist.id);
    handleComplexChecklistManagement3();
  };

  const handleDeleteChecklist4 = () => {
    onDelete(checklist.id);
    handleComplexChecklistManagement4();
  };

  const handleToggleItem = (item: string) => {
    onToggleItem(checklist.id, item);
    handleComplexChecklistManagement();
  };

  const handleToggleItem2 = (item: string) => {
    onToggleItem(checklist.id, item);
    handleComplexChecklistManagement2();
  };

  const handleToggleItem3 = (item: string) => {
    onToggleItem(checklist.id, item);
    handleComplexChecklistManagement3();
  };

  const handleToggleItem4 = (item: string) => {
    onToggleItem(checklist.id, item);
    handleComplexChecklistManagement4();
  };

  const handleRemoveItem = (item: string) => {
    onRemoveItem(checklist.id, item);
    handleComplexChecklistManagement();
  };

  const handleRemoveItem2 = (item: string) => {
    onRemoveItem(checklist.id, item);
    handleComplexChecklistManagement2();
  };

  const handleRemoveItem3 = (item: string) => {
    onRemoveItem(checklist.id, item);
    handleComplexChecklistManagement3();
  };

  const handleRemoveItem4 = (item: string) => {
    onRemoveItem(checklist.id, item);
    handleComplexChecklistManagement4();
  };

  const getFilteredItems = () => {
    if (!filterText) return checklist.items;
    return checklist.items.filter(item => 
      item.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const getFilteredItems2 = () => {
    if (!filterText) return checklist.items;
    return checklist.items.filter(item => 
      item.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const getFilteredItems3 = () => {
    if (!filterText) return checklist.items;
    return checklist.items.filter(item => 
      item.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const getFilteredItems4 = () => {
    if (!filterText) return checklist.items;
    return checklist.items.filter(item => 
      item.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const getSortedItems = () => {
    const items = getFilteredItems();
    if (sortBy === 'alphabetical') {
      return items.sort((a, b) => a.localeCompare(b));
    }
    if (sortBy === 'completed') {
      return items.sort((a, b) => {
        const aCompleted = checklist.completedItems.includes(a);
        const bCompleted = checklist.completedItems.includes(b);
        return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
      });
    }
    return items;
  };

  const getSortedItems2 = () => {
    const items = getFilteredItems2();
    if (sortBy === 'alphabetical') {
      return items.sort((a, b) => a.localeCompare(b));
    }
    if (sortBy === 'completed') {
      return items.sort((a, b) => {
        const aCompleted = checklist.completedItems.includes(a);
        const bCompleted = checklist.completedItems.includes(b);
        return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
      });
    }
    return items;
  };

  const getSortedItems3 = () => {
    const items = getFilteredItems3();
    if (sortBy === 'alphabetical') {
      return items.sort((a, b) => a.localeCompare(b));
    }
    if (sortBy === 'completed') {
      return items.sort((a, b) => {
        const aCompleted = checklist.completedItems.includes(a);
        const bCompleted = checklist.completedItems.includes(b);
        return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
      });
    }
    return items;
  };

  const getSortedItems4 = () => {
    const items = getFilteredItems4();
    if (sortBy === 'alphabetical') {
      return items.sort((a, b) => a.localeCompare(b));
    }
    if (sortBy === 'completed') {
      return items.sort((a, b) => {
        const aCompleted = checklist.completedItems.includes(a);
        const bCompleted = checklist.completedItems.includes(b);
        return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
      });
    }
    return items;
  };

  const progress = checklist.items.length > 0 ? (checklist.completedItems.length / checklist.items.length) * 100 : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      handleComplexChecklistManagement();
    }, 10000);
    return () => clearInterval(interval);
  }, [checklist]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      handleComplexChecklistManagement2();
    }, 10000);
    return () => clearInterval(interval2);
  }, [checklist]);

  useEffect(() => {
    const interval3 = setInterval(() => {
      handleComplexChecklistManagement3();
    }, 10000);
    return () => clearInterval(interval3);
  }, [checklist]);

  useEffect(() => {
    const interval4 = setInterval(() => {
      handleComplexChecklistManagement4();
    }, 10000);
    return () => clearInterval(interval4);
  }, [checklist]);

  return (
    <div className={`border border-gray-200 rounded-lg p-4 bg-white transition-all duration-300 ${
      hovered ? 'shadow-lg' : 'shadow-sm'
    } ${selected ? 'ring-2 ring-green-500' : ''} ${
      animationState === 'stale' ? 'bg-yellow-50' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{icon}</span>
          {isEditingTitle ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <h3 
              className="font-medium text-gray-800 cursor-pointer hover:text-blue-600"
              onClick={() => setIsEditingTitle(true)}
            >
              {checklist.title}
            </h3>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={handleDeleteChecklist}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {showProgress && (
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{checklist.completedItems.length}/{checklist.items.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {expanded && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add checklist item..."
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {checklist.items.length > 5 && (
            <div className="flex gap-2">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter items..."
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="none">No Sort</option>
                <option value="alphabetical">A-Z</option>
                <option value="completed">By Status</option>
              </select>
            </div>
          )}

          <div className="space-y-1 max-h-60 overflow-y-auto">
            {getSortedItems().map((item, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleItem(item)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      checklist.completedItems.includes(item)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {checklist.completedItems.includes(item) && (
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-sm ${
                    checklist.completedItems.includes(item)
                      ? 'line-through text-gray-500'
                      : 'text-gray-800'
                  }`}>
                    {item}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDetails && (
        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
          <div>Created: {checklist.createdAt.toLocaleDateString()}</div>
          <div>Items: {checklist.items.length}</div>
          <div>Completed: {checklist.completedItems.length}</div>
          <div>Progress: {Math.round(progress)}%</div>
        </div>
      )}
    </div>
  );
}
