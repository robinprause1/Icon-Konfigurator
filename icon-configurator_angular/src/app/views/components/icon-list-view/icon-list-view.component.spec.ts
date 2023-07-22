import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconListViewComponent } from './icon-list-view.component';

describe('IconListViewComponent', () => {
  let component: IconListViewComponent;
  let fixture: ComponentFixture<IconListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
