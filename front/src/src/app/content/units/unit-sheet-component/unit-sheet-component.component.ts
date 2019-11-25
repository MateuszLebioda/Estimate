import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Unit} from '../../../model/unit';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../model/role.enum';

@Component({
  selector: 'app-unit-sheet-component',
  templateUrl: './unit-sheet-component.component.html',
  styleUrls: ['./unit-sheet-component.component.scss']
})
export class UnitSheetComponentComponent implements OnInit {
  private roles  = Role;
  private unitForm: FormGroup;
  unit: Unit;

  constructor(private bottomSheetRef: MatBottomSheetRef<UnitSheetComponentComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: Unit) {

    bottomSheetRef.disableClose = true;
    if (data !== null) {
      this.unit = data;
    } else {
      this.unit = new Unit();
    }

    this.unitForm = new FormGroup({
      bottom: new FormControl(this.unit.bottom, [Validators.required]),
      top: new FormControl(this.unit.top),
      role: new FormControl(this.unit.role, [Validators.required]),
    });
  }

  ngOnInit() {
  }

  saveClient() {
    this.unit.bottom = this.unitForm.get('bottom').value;
    this.unit.top = this.unitForm.get('top').value;
    this.unit.role = this.unitForm.get('role').value;
    this.unit.actual = true;
    this.bottomSheetRef.dismiss(this.unit);
  }

}
