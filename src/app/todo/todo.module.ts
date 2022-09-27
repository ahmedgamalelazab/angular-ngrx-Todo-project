import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { RouterModule } from '@angular/router';
import { TodoShellComponent } from './todo-shell.component';
import { TodoTaskStateItemComponent } from './components/todo-task-state-item/todo-task-state-item.component';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './state/todo.reducers';
import { TodoDetailsListComponent } from './components/todo-details-list/todo-details-list.component';
import { TodoDetailsListItemComponent } from './components/todo-details-list-item/todo-details-list-item.component';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/Todo.Effects';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';

@NgModule({
  declarations: [
    MenuComponent,
    TodoDetailsComponent,
    TodoShellComponent,
    TodoTaskStateItemComponent,
    TodoDetailsListComponent,
    TodoDetailsListItemComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TodoShellComponent },
    ]),
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodoModule {}
