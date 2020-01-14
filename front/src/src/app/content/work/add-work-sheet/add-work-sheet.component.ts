import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Work} from '../../../model/work';

@Component({
  selector: 'app-add-work-sheet',
  templateUrl: './add-work-sheet.component.html',
  styleUrls: ['./add-work-sheet.component.scss']
})
export class AddWorkSheetComponent implements OnInit {
  work: Work;
  workForm: FormGroup;
  units: Array<Unit>;

  constructor(private unitService: UnitService, private bottomSheetRef: MatBottomSheetRef<AddWorkSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: Work) {

    bottomSheetRef.disableClose = true;
    if (data !== null) {
      this.work = data;
    } else {
      this.work = new Work();
    }

    unitService.getAllUnits().subscribe(units => {
      this.units = units.body;
    });

    this.workForm = new FormGroup({
      name: new FormControl(this.work.name, [Validators.required]),
      price: new FormControl(this.work.price, [Validators.required, Validators.pattern('[0-9]*(\\.[0-9][0-9]){0,1}')]),
      unit: new FormControl(this.work.unit, [Validators.required]),
    });
  }

  ngOnInit() {
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  saveWork() {
    this.work.name = this.workForm.get('name').value;
    this.work.price = this.workForm.get('price').value;
    this.work.unit = this.workForm.get('unit').value;
    this.bottomSheetRef.dismiss(this.work);
  }

}
