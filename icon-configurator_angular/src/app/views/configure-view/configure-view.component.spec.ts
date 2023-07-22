import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureViewComponent } from './configure-view.component';

describe('ConfigureViewComponent', () => {
  let component: ConfigureViewComponent;
  let fixture: ComponentFixture<ConfigureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
