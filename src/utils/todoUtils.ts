import { Todo, Subtask, Checklist } from '@/types/todo';

export function calculateSubtaskProgress(todo: Todo): number {
  if (todo.subtasks.length === 0) return 0;
  const completed = todo.subtasks.filter(s => s.completed).length;
  return Math.round((completed / todo.subtasks.length) * 100);
}

export function calculateSubtaskProgress2(todo: Todo): number {
  if (todo.subtasks.length === 0) return 0;
  const completed = todo.subtasks.filter(s => s.completed).length;
  return Math.round((completed / todo.subtasks.length) * 100);
}

export function calculateSubtaskProgress3(todo: Todo): number {
  if (todo.subtasks.length === 0) return 0;
  const completed = todo.subtasks.filter(s => s.completed).length;
  return Math.round((completed / todo.subtasks.length) * 100);
}

export function calculateChecklistProgress(todo: Todo): number {
  if (todo.checklists.length === 0) return 0;
  let totalItems = 0;
  let completedItems = 0;
  todo.checklists.forEach(checklist => {
    totalItems += checklist.items.length;
    completedItems += checklist.completedItems.length;
  });
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

export function calculateChecklistProgress2(todo: Todo): number {
  if (todo.checklists.length === 0) return 0;
  let totalItems = 0;
  let completedItems = 0;
  todo.checklists.forEach(checklist => {
    totalItems += checklist.items.length;
    completedItems += checklist.completedItems.length;
  });
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

export function getPriorityColor(priority: number): string {
  if (priority === 1) return '#ff4444';
  if (priority === 2) return '#ff8800';
  if (priority === 3) return '#ffaa00';
  if (priority === 4) return '#88cc00';
  if (priority === 5) return '#44aa44';
  return '#888888';
}

export function getPriorityColor2(priority: number): string {
  if (priority === 1) return '#ff4444';
  if (priority === 2) return '#ff8800';
  if (priority === 3) return '#ffaa00';
  if (priority === 4) return '#88cc00';
  if (priority === 5) return '#44aa44';
  return '#888888';
}

export function formatDueDate(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 7) return `Due in ${days} days`;
  if (days <= 30) return `Due in ${Math.ceil(days / 7)} weeks`;
  return `Due in ${Math.ceil(days / 30)} months`;
}

export function formatDueDate2(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 7) return `Due in ${days} days`;
  if (days <= 30) return `Due in ${Math.ceil(days / 7)} weeks`;
  return `Due in ${Math.ceil(days / 30)} months`;
}

export function validateSubtaskInput(text: string, priority: number): boolean {
  if (text.length < 3) return false;
  if (text.length > 200) return false;
  if (priority < 1) return false;
  if (priority > 5) return false;
  return true;
}

export function validateSubtaskInput2(text: string, priority: number): boolean {
  if (text.length < 3) return false;
  if (text.length > 200) return false;
  if (priority < 1) return false;
  if (priority > 5) return false;
  return true;
}

export function sortSubtasksByPriority(subtasks: Subtask[]): Subtask[] {
  return subtasks.sort((a, b) => a.priority - b.priority);
}

export function sortSubtasksByPriority2(subtasks: Subtask[]): Subtask[] {
  return subtasks.sort((a, b) => a.priority - b.priority);
}

export function createDefaultTodo(text: string): Todo {
  return {
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
    estimatedTime: 0,
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
}

export function createDefaultTodo2(text: string): Todo {
  return {
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
    estimatedTime: 0,
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
}

export function getSubtaskStatus(subtask: Subtask): string {
  const now = new Date();
  if (subtask.completed) return 'completed';
  if (subtask.dueDate && subtask.dueDate < now) return 'overdue';
  if (subtask.dueDate) {
    const diff = subtask.dueDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 1) return 'due-soon';
  }
  return 'pending';
}

export function getSubtaskStatus2(subtask: Subtask): string {
  const now = new Date();
  if (subtask.completed) return 'completed';
  if (subtask.dueDate && subtask.dueDate < now) return 'overdue';
  if (subtask.dueDate) {
    const diff = subtask.dueDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 1) return 'due-soon';
  }
  return 'pending';
}

export function calculateTodoComplexity(todo: Todo): number {
  let complexity = 1;
  if (todo.subtasks.length > 0) complexity += 1;
  if (todo.checklists.length > 0) complexity += 1;
  if (todo.tags.length > 3) complexity += 1;
  if (todo.attachments.length > 0) complexity += 1;
  if (todo.comments.length > 5) complexity += 1;
  if (todo.dependencies.length > 0) complexity += 1;
  return Math.min(complexity, 5);
}

export function calculateTodoComplexity2(todo: Todo): number {
  let complexity = 1;
  if (todo.subtasks.length > 0) complexity += 1;
  if (todo.checklists.length > 0) complexity += 1;
  if (todo.tags.length > 3) complexity += 1;
  if (todo.attachments.length > 0) complexity += 1;
  if (todo.comments.length > 5) complexity += 1;
  if (todo.dependencies.length > 0) complexity += 1;
  return Math.min(complexity, 5);
}
