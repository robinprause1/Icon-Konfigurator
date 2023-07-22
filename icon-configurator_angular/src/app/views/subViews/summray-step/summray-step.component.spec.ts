import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummrayStepComponent } from './summray-step.component';

describe('SummrayStepComponent', () => {
  let component: SummrayStepComponent;
  let fixture: ComponentFixture<SummrayStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummrayStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummrayStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
