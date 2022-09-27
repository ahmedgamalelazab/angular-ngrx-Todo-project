import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import {
  getCompletedTodos,
  getCurrentSelectedTodos,
  getTodayTodos,
} from './state/todo.reducers';
import * as TodosActions from './state/Todo.Actions';
import { Todo } from './Types';
import { toggleTimerRefAction } from './state/Todo.Actions';
import { timerUtil } from './utils/Todo.timer';

@Component({
  selector: 'app-todo-shell',
  templateUrl: './todo-shell.component.html',
  styleUrls: ['./todo-shell.component.scss'],
})
export class TodoShellComponent implements OnInit {
  todayTodos: Todo[];
  completedTodos: Todo[];
  currentSelectedTodos: Todo[];
  getFormattedTimer(seconds: number): string {
    return timerUtil(seconds);
  }
  constructor(private store: Store<State>) {
    this.todayTodos = [];
    this.completedTodos = [];
    this.currentSelectedTodos = [];
  }

  ngOnInit(): void {
    // subscribe first
    this.store.select(getTodayTodos).subscribe((state) => {
      this.todayTodos = state;
    });

    this.store.select(getCompletedTodos).subscribe((state) => {
      this.completedTodos = state;
    });

    this.store.select(getCurrentSelectedTodos).subscribe((state) => {
      this.currentSelectedTodos = state;
    });
    // dispatch the events
    this.store.dispatch(TodosActions.loadTodosAction());
  }

  /**
   *
   * @param todo
   * @description it's just a listener
   */
  handleNewTodoEntry(todo: Todo) {
    console.log(todo); // talk or dispatch an action on the store to change the data
    this.store.dispatch(TodosActions.addTodoAction({ todo }));
  }

  containerComponentHandleRunRequest(todo: Todo) {
    let t = setInterval(() => {
      this.store.dispatch(
        TodosActions.updateTodo({
          todoId: todo.id,
          action: 'run',
          runningObjRef: t,
        })
      );
    }, 1000);
  }

  containerComponentHandlePauseRequest(todo: Todo) {
    this.store.dispatch(
      TodosActions.updateTodo({
        todoId: todo.id,
        action: 'stop',
        runningObjRef: null,
      })
    );
  }

  containerHandleCompletedTaskEvent(todo: Todo) {
    // call action to delete the todo from the today todos and route it to the completed
    this.store.dispatch(
      TodosActions.moveTodayTodoToCompletedAction({ todo: todo })
    );
  }

  handleTaskMenuSelectionChange(currentSelected: string) {
    console.log(currentSelected);
    if (currentSelected === 'today') {
      this.store.dispatch(
        TodosActions.changeCurrentSelectedTodos({ todos: this.todayTodos })
      );
    } else if (currentSelected === 'completed') {
      this.store.dispatch(
        TodosActions.changeCurrentSelectedTodos({ todos: this.completedTodos })
      );
    }
  }
}
