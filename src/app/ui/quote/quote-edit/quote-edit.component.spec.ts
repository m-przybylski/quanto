import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEditComponent } from './quote-edit.component';

describe('QuoteEditComponent', () => {
  let component: QuoteEditComponent;
  let fixture: ComponentFixture<QuoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
