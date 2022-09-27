import { Todo } from '../Types';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as TodosActions from './Todo.Actions';
import { clearTodosAction } from './Todo.Actions';

/**
 * @description Todo State Slice
 */
export interface TodoState {
  Today: Todo[];
  Tomorrow: Todo[];
  Upcoming: Todo[];
  SomeDay: Todo[];
  Completed: Todo[];
  OutDatedTodos: Todo[];
  selectedTodos: Todo[];
  draggedTodd: Todo | null;
  error: string;
}

// Initial State

export const TodoInitialState: TodoState = {
  Completed: [],
  SomeDay: [],
  Today: [],
  OutDatedTodos: [],
  Upcoming: [],
  Tomorrow: [],
  selectedTodos: [],
  draggedTodd: null,
  error: '',
};

// selectors

const selectTodosFeatures = createFeatureSelector<TodoState>('todos');

export const getTodayTodos = createSelector(
  selectTodosFeatures,
  (state) => state.Today
);

export const getCompletedTodos = createSelector(
  selectTodosFeatures,
  (state) => state.Completed
);

export const getCurrentSelectedTodos = createSelector(
  selectTodosFeatures,
  (state) => state.selectedTodos
);

// reducers

export const todoReducer = createReducer<TodoState>(
  TodoInitialState,
  on(TodosActions.loadedTodosSuccess, (state, payload) => {
    return {
      ...state,
      Today: payload.todos,
    };
  }),
  on(TodosActions.loadedTodosFail, (state, payload) => {
    return {
      ...state,
      error: payload.error,
    };
  }),
  on(TodosActions.loadedCompletedTodosSuccessfully, (state, payload) => {
    return {
      ...state,
      Today: payload['todayTodos'],
      Completed: payload['completedTodos'],
    };
  }),
  on(TodosActions.changeCurrentSelectedTodos, (state, payload) => {
    return {
      ...state,
      selectedTodos: payload.todos,
    };
  }),
  on(TodosActions.clearedTodosSuccessfully, (state, payload) => {
    state = payload.state;
    return {
      ...state,
    };
  })
);
