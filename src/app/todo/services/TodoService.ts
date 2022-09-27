import { Injectable } from '@angular/core';
import { Todo } from '../Types';
import { Observable, of } from 'rxjs';
import { TodoState } from '../state/todo.reducers';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[];
  completedTodos: Todo[];
  tomorrowTodos: Todo[];
  upcomingTodos: Todo[];
  somedayTodos: Todo[];

  constructor() {
    this.completedTodos = [];
    this.tomorrowTodos = [];
    this.upcomingTodos = [];
    this.somedayTodos = [];
    // the todos initially has  data until we move on and make the backend
    this.todos = [
      // {
      //   id: 1,
      //   description: 'Studying C++ data structures',
      //   hasFinished: false,
      //   totalHrs: 0,
      //   createdAt: new Date(Date.now()),
      //   UpdatedAt: new Date(Date.now()),
      //   delayedToDate: null,
      //   finishedAt: null,
      // },
    ];
  }

  /**
   * @description later on this will be refactored to fetch the data from the server
   */
  getTodos(): Observable<Todo[]> {
    return of([...this.todos]);
  }

  addTodo(todo: Todo): Observable<Todo[]> {
    let oldTodos = [...this.todos];
    oldTodos.push(todo);
    this.todos = [...oldTodos];
    return of([...this.todos]);
  }

  updateTodoTimer(
    todoId: number,
    action: string,
    runningObjRef: any
  ): Observable<Todo[]> {
    let [targetTodo] = this.todos.filter((tdo) => tdo.id === todoId);
    if (action === 'run') {
      if (targetTodo.isRunning) {
        let todoModified = { ...targetTodo };
        todoModified.totalHrs!++;
        const newTodos: Todo[] = this.todos.map((tdo) =>
          tdo.id === todoModified.id ? todoModified : tdo
        );
        this.todos = [...newTodos];
        return of(this.todos);
      } else {
        let todoModified = { ...targetTodo };
        todoModified.totalHrs!++;
        todoModified.isRunning = true;
        todoModified.runningObjRef = runningObjRef;
        const newTodos: Todo[] = this.todos.map((tdo) =>
          tdo.id === todoModified.id ? todoModified : tdo
        );
        this.todos = [...newTodos];
        return of(this.todos);
      }
    } else if (action === 'stop') {
      let todoModified = { ...targetTodo };
      todoModified.isRunning = false;
      clearInterval(todoModified.runningObjRef);
      todoModified.runningObjRef = null;
      const newTodos: Todo[] = this.todos.map((tdo) =>
        tdo.id === todoModified.id ? todoModified : tdo
      );
      this.todos = [...newTodos];
      return of(this.todos);
    } else {
      return of([...this.todos]);
    }
  }

  clearTodosFromTheApp(): TodoState {
    this.todos.forEach((tdo) => {
      if (tdo.runningObjRef && tdo.isRunning) {
        clearInterval(tdo.runningObjRef);
      }
    });
    this.todos = [];
    this.completedTodos = [];
    return {
      selectedTodos: [],
      Today: [],
      Completed: [],
      Tomorrow: [],
      error: '',
      Upcoming: [],
      SomeDay: [],
      OutDatedTodos: [],
      draggedTodd: null,
    };
  }

  addTodoToCompleted(todo: Todo): Observable<{ [key: string]: Todo[] }> {
    const newCompletedTodos = [...this.completedTodos];
    newCompletedTodos.push(todo);
    if (todo.runningObjRef && todo.isRunning) {
      clearInterval(todo.runningObjRef);
    }
    this.todos = this.todos.filter((tdo) => tdo.id !== todo.id);
    this.completedTodos = newCompletedTodos;
    return of({
      todayTodos: this.todos,
      completedTodos: this.completedTodos,
    });
  }
}
