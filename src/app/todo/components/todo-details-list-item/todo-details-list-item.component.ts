import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../../Types';
import { timerUtil } from '../../utils/Todo.timer';

@Component({
  selector: 'app-todo-details-list-item',
  templateUrl: './todo-details-list-item.component.html',
  styleUrls: ['./todo-details-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailsListItemComponent implements OnInit {
  @Input() todo?: Todo;
  @Output() currentTodoPlayedEvent: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  @Output() currentTodoPaused: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() handleOnCompletedEventEmitter: EventEmitter<Todo> =
    new EventEmitter<Todo>();

  constructor() {}

  get ElapsedHrsSecondsTimeFormat(): string {
    return timerUtil(this.todo?.totalHrs ?? 0);
  }

  ngOnInit(): void {}

  onPlayClicked() {
    this.currentTodoPlayedEvent.emit(this.todo);
  }
  onPauseClicked() {
    this.currentTodoPaused.emit(this.todo);
  }

  handleOnCompletedEvent() {
    this.handleOnCompletedEventEmitter.emit(this.todo);
  }
}
