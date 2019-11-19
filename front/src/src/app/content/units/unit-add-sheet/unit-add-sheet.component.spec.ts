import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitAddSheetComponent } from './unit-add-sheet.component';

describe('UnitAddSheetComponent', () => {
  let component: UnitAddSheetComponent;
  let fixture: ComponentFixture<UnitAddSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitAddSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
