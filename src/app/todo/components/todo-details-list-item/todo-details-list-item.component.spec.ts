import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailsListItemComponent } from './todo-details-list-item.component';

describe('TodoDetailsListItemComponent', () => {
  let component: TodoDetailsListItemComponent;
  let fixture: ComponentFixture<TodoDetailsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailsListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
