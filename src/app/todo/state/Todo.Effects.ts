import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/TodoService';
import * as TodosActions from './Todo.Actions';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  getTodosEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodosActions.loadTodosAction),
        mergeMap(() =>
          this.todoService.getTodos().pipe(
            map((todos) => TodosActions.loadedTodosSuccess({ todos: todos })),
            catchError((error) => of(TodosActions.loadedTodosFail(error)))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  addTodoEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodoAction),
      mergeMap((action) =>
        this.todoService.addTodo(action.todo).pipe(
          tap(() => {
            console.log(action.todo);
          }),
          map((todos) => TodosActions.loadedTodosSuccess({ todos: todos })),
          catchError((error) => of(TodosActions.loadedTodosFail(error)))
        )
      )
    )
  );

  updateTodoTimerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodo),
      mergeMap((action) =>
        this.todoService
          .updateTodoTimer(action.todoId, action.action, action.runningObjRef)
          .pipe(
            map((todos) => TodosActions.loadedTodosSuccess({ todos: todos })),
            catchError((error) => of(TodosActions.loadedTodosFail(error)))
          )
      )
    )
  );

  addTodoToCompletedEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.moveTodayTodoToCompletedAction),
      mergeMap((action) =>
        this.todoService.addTodoToCompleted(action.todo).pipe(
          map((todosContainer) =>
            TodosActions.loadedCompletedTodosSuccessfully({
              todayTodos: todosContainer['todayTodos'],
              completedTodos: todosContainer['completedTodos'],
            })
          )
        )
      )
    )
  );

  clearTodosEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.clearTodosAction),
      concatMap((action) =>
        of(this.todoService.clearTodosFromTheApp()).pipe(
          map((result) =>
            TodosActions.clearedTodosSuccessfully({ state: result })
          )
        )
      )
    )
  );
}
