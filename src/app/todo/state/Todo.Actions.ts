import { createAction, props } from '@ngrx/store';
import { Todo } from '../Types';
import { TodoState } from './todo.reducers';

// effects actions, but this action will be dispatched normally later on
export const loadTodosAction = createAction(
  '[Todo API] fetch todos from the server'
);

// pure actions
export const loadedTodosSuccess = createAction(
  '[Todo Page] todos loaded payload action',
  props<{ todos: Todo[] }>()
);

export const loadedCompletedTodosSuccessfully = createAction(
  '[completed Todos Page] todos loaded payload action',
  props<{ [key: string]: Todo[] }>()
);
export const loadedTodosFail = createAction(
  '[Todo Page] todos loaded failure action',
  props<{ error: string }>()
);
export const addTodoAction = createAction(
  '[Todo API] add todo to the backend',
  props<{ todo: Todo }>()
);

//timer actions

/**
 * @description will search in the store for the ref and null it or give it reference
 */
export const toggleTimerRefAction = createAction(
  '[TodoTimerRefToggling Memory] check timer for reference and wipe or clean and initialize',
  props<{ timerRef: any }>()
);

export const updateTodo = createAction(
  '[update Todo API] update todo',
  props<{ todoId: number; action: string; runningObjRef?: any }>()
);

//completed todos actions

export const moveTodayTodoToCompletedAction = createAction(
  '[completed Todo] it has to take completed todo and move it to completed',
  props<{ todo: Todo }>()
);

export const changeCurrentSelectedTodos = createAction(
  '[Todo page] change current Selection',
  props<{ todos: Todo[] }>()
);

export const clearTodosAction = createAction('[Todo Page] clear all the todos');

export const clearedTodosSuccessfully = createAction(
  '[Todo Api] successfully cleared the whole app todos',
  props<{ state: TodoState }>()
);
