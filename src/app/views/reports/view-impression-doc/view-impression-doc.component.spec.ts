import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImpressionDocComponent } from './view-impression-doc.component';

describe('ViewImpressionDocComponent', () => {
  let component: ViewImpressionDocComponent;
  let fixture: ComponentFixture<ViewImpressionDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImpressionDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImpressionDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
