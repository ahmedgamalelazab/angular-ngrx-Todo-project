import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskStateItemComponent } from './todo-task-state-item.component';

describe('TodoTaskStateItemComponent', () => {
  let component: TodoTaskStateItemComponent;
  let fixture: ComponentFixture<TodoTaskStateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoTaskStateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTaskStateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
