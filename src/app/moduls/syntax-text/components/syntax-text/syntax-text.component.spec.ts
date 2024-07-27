import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntaxTextComponent } from './syntax-text.component';

describe('SyntaxPoetryComponent', () => {
  let component: SyntaxTextComponent;
  let fixture: ComponentFixture<SyntaxTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyntaxTextComponent]
    });
    fixture = TestBed.createComponent(SyntaxTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
