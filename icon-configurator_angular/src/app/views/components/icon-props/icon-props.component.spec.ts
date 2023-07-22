import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPropsComponent } from './icon-props.component';

describe('IconPropsComponent', () => {
  let component: IconPropsComponent;
  let fixture: ComponentFixture<IconPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
