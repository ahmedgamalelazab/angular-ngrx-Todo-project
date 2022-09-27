import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailsListComponent } from './todo-details-list.component';

describe('TodoDetailsListComponent', () => {
  let component: TodoDetailsListComponent;
  let fixture: ComponentFixture<TodoDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
