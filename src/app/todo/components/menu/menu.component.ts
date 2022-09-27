import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../../Types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() todayTodos: Todo[];
  @Input() completedTodos: Todo[];
  menuList: { [key: string]: { [key: string]: boolean } };
  @Output() selectedMenuList: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
    this.todayTodos = [];
    this.completedTodos = [];
    this.menuList = this.initMenu();
  }

  ngOnInit(): void {}

  activateSelected(arg: string) {
    this.menuList = this.initMenu();
    this.menuList[arg]['selected'] = true;
    this.selectedMenuList.emit(arg);
  }

  todayDropEventHandler(e: any) {
    // get from the store any dragged data
  }

  tomorrowDropEventHandler(e: any) {
    // get from the store any dragged data
  }

  upcomingDropEventHandler(e: any) {
    // get from the store any dragged data
  }

  somedayDropEventHandler(e: any) {
    // get from the store any dragged data
  }

  completedDropEventHandler(e: any) {
    // get from the store any dragged data
  }

  initMenu(): { [key: string]: { [key: string]: boolean } } {
    return {
      today: {
        selected: false,
      },
      tomorrow: {
        selected: false,
      },
      upcoming: {
        selected: false,
      },
      someday: {
        selected: false,
      },
      completed: {
        selected: false,
      },
    };
  }
}
