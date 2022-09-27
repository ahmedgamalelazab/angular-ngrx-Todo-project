import { TodoState } from '../todo/state/todo.reducers';

export interface State {
  todo: TodoState;
  user: any;
}
