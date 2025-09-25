export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
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
