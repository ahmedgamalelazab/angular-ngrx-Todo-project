import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../Types';

@Component({
  selector: 'app-todo-task-state-item',
  templateUrl: './todo-task-state-item.component.html',
  styleUrls: ['./todo-task-state-item.component.scss'],
})
export class TodoTaskStateItemComponent implements OnInit {
  @Input() taskItemStateString?: string;
  @Input() taskItemStateNumber?: number;

  constructor() {}

  ngOnInit(): void {}
}
