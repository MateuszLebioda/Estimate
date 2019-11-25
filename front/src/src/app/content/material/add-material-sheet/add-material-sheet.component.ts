import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Material} from '../../../model/material';
import {UnitService} from '../../../services/unit.service';
import {Unit} from '../../../model/unit';

@Component({
  selector: 'app-add-material-sheet',
  templateUrl: './add-material-sheet.component.html',
  styleUrls: ['./add-material-sheet.component.scss']
})
export class AddMaterialSheetComponent implements OnInit {

  material: Material;
  materialForm: FormGroup;
  units: Array<Unit>;

  constructor(private unitService: UnitService, private bottomSheetRef: MatBottomSheetRef<AddMaterialSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: Material) {

    bottomSheetRef.disableClose = true;
    if (data !== null) {
      this.material = data;
    } else {
      this.material = new Material();
    }

    unitService.getAllMaterialUnits().subscribe(units => {
      this.units = units.body;
    });

    this.materialForm = new FormGroup({
      name: new FormControl(this.material.name, [Validators.required]),
      price: new FormControl(this.material.price, [Validators.required, Validators.pattern('[0-9]*(\\.[0-9][0-9]){0,1}')]),
      unit: new FormControl(this.material.unit, [Validators.required]),
    });

    console.log(this.materialForm.get('unit').value);
  }


  ngOnInit() {
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  saveMaterial() {
    this.material.name = this.materialForm.get('name').value;
    this.material.price = this.materialForm.get('price').value;
    this.material.unit = this.materialForm.get('unit').value;
    this.bottomSheetRef.dismiss(this.material);
  }

}
