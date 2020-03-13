import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumntcollectionComponent } from './documntcollection.component';

describe('DocumntcollectionComponent', () => {
  let component: DocumntcollectionComponent;
  let fixture: ComponentFixture<DocumntcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumntcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumntcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
