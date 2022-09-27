import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../../Types';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailsComponent implements OnInit {
  @Input() todayTodos: Todo[];
  @Input() completedTodos: Todo[];
  @Output() onSubmitTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() onRunOrderClickedFromItem: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  @Output() onPauseOrderClickedFromItem: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  @Output() onPauseOrderClickedFromItemEventEmitter: EventEmitter<Todo> =
    new EventEmitter<Todo>();
  formGroup: FormGroup;

  get todoDescriptionControl(): AbstractControl {
    return this.formGroup.controls['todoDescription'];
  }
  constructor(private fb: FormBuilder) {
    this.todayTodos = [];
    this.completedTodos = [];
    this.formGroup = fb.group({
      todoDescription: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.todoDescriptionControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit(): void {}

  formSubmittingHandler() {
    if (this.formGroup.valid) {
      let copiedTodos = [...this.todayTodos];
      const lastTodoId = copiedTodos.pop();
      if (lastTodoId?.id) {
        let lastTodoInTodos = +lastTodoId.id;
        lastTodoInTodos++;
        this.onSubmitTodo.emit(this.getTodoFactory(lastTodoInTodos));
        this.formGroup.reset();
      } else {
        this.onSubmitTodo.emit(this.getTodoFactory(1));
        this.formGroup.reset();
      }
    }
  }

  getTodoFactory(id: number): Todo {
    return {
      id: id,
      createdAt: new Date(Date.now()),
      UpdatedAt: new Date(Date.now()),
      delayedToDate: null,
      finishedAt: null,
      description: this.formGroup.value['todoDescription'],
      totalHrs: 0,
      hasFinished: false,
      isRunning: false,
      runningObjRef: null,
    };
  }

  parentHandleItemRunOrderClick(todo: Todo) {
    this.onRunOrderClickedFromItem.emit(todo);
  }
  parentHandleItemPauseOrderClick(todo: Todo) {
    this.onPauseOrderClickedFromItem.emit(todo);
  }

  parentHandleCompletedTaskEvent(todo: Todo) {
    this.onPauseOrderClickedFromItemEventEmitter.emit(todo);
  }
}
