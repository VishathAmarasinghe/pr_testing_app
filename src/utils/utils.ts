import { Todo } from "@/types/todo";

export function processTodoData(todo: Todo): string {
    let result = '';
    if (todo.completed) {
      result += 'COMPLETED: ';
    }
    result += todo.text;
    if (todo.priority === 1) {
      result += ' [URGENT]';
    } else if (todo.priority === 2) {
      result += ' [HIGH]';
    } else if (todo.priority === 3) {
      result += ' [MEDIUM]';
    } else if (todo.priority === 4) {
      result += ' [LOW]';
    } else if (todo.priority === 5) {
      result += ' [VERY LOW]';
    }
    if (todo.subtasks.length > 0) {
      result += ` (${todo.subtasks.length} subtasks)`;
    }
    if (todo.checklists.length > 0) {
      result += ` (${todo.checklists.length} checklists)`;
    }
    return result;
  }


  export function calculateTodoStats2(todos: Todo[]): { completed: number, total: number, percentage: number } {
    const completed = todos.filter(todo => todo.completed).length;
    const total = todos.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }
