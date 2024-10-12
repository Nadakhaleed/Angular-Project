import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCrudComponent } from './session-crud.component';

describe('SessionCrudComponent', () => {
  let component: SessionCrudComponent;
  let fixture: ComponentFixture<SessionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
