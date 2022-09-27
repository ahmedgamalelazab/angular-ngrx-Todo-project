import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../state/app.state';
import { Todo } from '../../Types';

@Component({
  selector: 'app-todo-details-list',
  templateUrl: './todo-details-list.component.html',
  styleUrls: ['./todo-details-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailsListComponent implements OnInit {
  @Input() todayTodos: Todo[];
  @Output() handleRunOrderClickOnItemEvent: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  @Output() handlePauseOrderClickOnItemEvent: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  @Output() handleCompletedTaskEventEmitter: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  constructor(private store: Store<State>) {
    this.todayTodos = [];
  }

  ngOnInit(): void {
    console.log(this.todayTodos);
  }

  handleRunOrderClick(todo: Todo) {
    this.handleRunOrderClickOnItemEvent.emit(todo);
  }

  handlePauseOrderClick(todo: Todo) {
    console.log(`pause emitted`);
    this.handlePauseOrderClickOnItemEvent.emit(todo);
  }
  handleCompletedTaskEvent(todo: Todo) {
    this.handleCompletedTaskEventEmitter.emit(todo);
  }

  dragStart(todo: Todo) {
    //dispatch event to update the store with dragged todo
    console.log(todo);
  }
}
