import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRxFormComponent } from './pre-rx-form.component';

describe('PreRxFormComponent', () => {
  let component: PreRxFormComponent;
  let fixture: ComponentFixture<PreRxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRxFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
