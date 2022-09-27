import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as TodosActions from '../../todo/state/Todo.Actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  toggleSettings: boolean;

  constructor(private store: Store<State>) {
    this.toggleSettings = false;
  }

  ngOnInit(): void {}

  toggleSettingsEvent() {
    this.toggleSettings = !this.toggleSettings;
  }

  clearTodosEvent() {
    //clear todos from here
    this.store.dispatch(TodosActions.clearTodosAction());
    this.toggleSettingsEvent();
  }
}
