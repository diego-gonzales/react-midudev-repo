import { TODO_FILTERS } from "./consts";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
};

// export type TodoId = Pick<Todo, 'id'>;
export type TodoFilter = typeof TODO_FILTERS[keyof typeof TODO_FILTERS];