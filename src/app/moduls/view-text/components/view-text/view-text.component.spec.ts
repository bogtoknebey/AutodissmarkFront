import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTextComponent } from './view-text.component';

describe('RandomPoetryComponent', () => {
  let component: ViewTextComponent;
  let fixture: ComponentFixture<ViewTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTextComponent]
    });
    fixture = TestBed.createComponent(ViewTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
