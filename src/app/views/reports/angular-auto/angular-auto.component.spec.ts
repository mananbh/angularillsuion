import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularAutoComponent } from './angular-auto.component';

describe('AngularAutoComponent', () => {
  let component: AngularAutoComponent;
  let fixture: ComponentFixture<AngularAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
