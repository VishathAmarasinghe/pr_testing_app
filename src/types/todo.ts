export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  priority: number;
  dueDate?: Date;
  createdAt: Date;
}

export interface Checklist {
  id: string;
  title: string;
  items: string[];
  completedItems: string[];
  createdAt: Date;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  subtasks: Subtask[];
  checklists: Checklist[];
  hasSubtasks: boolean;
  hasChecklists: boolean;
  subtaskProgress: number;
  checklistProgress: number;
  totalSubtasks: number;
  completedSubtasks: number;
  totalChecklistItems: number;
  completedChecklistItems: number;
  priority: number;
  category: string;
  tags: string[];
  estimatedTime: number;
  actualTime: number;
  difficulty: number;
  status: string;
  assignee: string;
  deadline: Date;
  description: string;
  attachments: string[];
  comments: string[];
  lastModified: Date;
  isImportant: boolean;
  isUrgent: boolean;
  reminderDate: Date;
  location: string;
  color: string;
  icon: string;
  parentTaskId: string;
  dependencies: string[];
  subtaskCount: number;
  checklistCount: number;
}

export interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface SubtaskFormProps {
  onAddSubtask: (text: string, priority: number, dueDate?: Date) => void;
  parentTodoId: string;
}

export interface SubtaskItemProps {
  subtask: Subtask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string, priority: number) => void;
}

export interface ChecklistFormProps {
  onAddChecklist: (title: string, items: string[]) => void;
  parentTodoId: string;
}

export interface ChecklistItemProps {
  checklist: Checklist;
  onToggleItem: (checklistId: string, item: string) => void;
  onDelete: (id: string) => void;
  onAddItem: (checklistId: string, item: string) => void;
  onRemoveItem: (checklistId: string, item: string) => void;
}
