import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin3Component } from './admin3.component';

describe('Admin3Component', () => {
  let component: Admin3Component;
  let fixture: ComponentFixture<Admin3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
