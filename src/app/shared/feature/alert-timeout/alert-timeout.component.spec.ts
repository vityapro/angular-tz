import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTimeoutComponent } from './alert-timeout.component';

describe('AlertTimeoutComponent', () => {
  let component: AlertTimeoutComponent;
  let fixture: ComponentFixture<AlertTimeoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertTimeoutComponent]
    });
    fixture = TestBed.createComponent(AlertTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
