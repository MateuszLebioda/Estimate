import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ServiceTemplate} from '../../../model/template/service-template';

@Component({
  selector: 'app-add-service-sheet',
  templateUrl: './add-service-sheet.component.html',
  styleUrls: ['./add-service-sheet.component.scss']
})
export class AddServiceSheetComponent implements OnInit {
  serviceTemplate: ServiceTemplate;
  serviceForm: FormGroup;
  units: Array<Unit>;

  constructor(private unitService: UnitService, private bottomSheetRef: MatBottomSheetRef<AddServiceSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: ServiceTemplate) {

    bottomSheetRef.disableClose = true;
    if (data !== null) {
      this.serviceTemplate = data;
    } else {
      this.serviceTemplate = new ServiceTemplate();
    }

    unitService.getAllUnits().subscribe(units => {
      this.units = units.body;
    });

    this.serviceForm = new FormGroup({
      name: new FormControl(this.serviceTemplate.name, [Validators.required]),
      price: new FormControl(this.serviceTemplate.price, [Validators.required, Validators.pattern('[0-9]*(\\.[0-9][0-9]){0,1}')]),
      unit: new FormControl(this.serviceTemplate.unit, [Validators.required]),
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

  saveService() {
    this.serviceTemplate.name = this.serviceForm.get('name').value;
    this.serviceTemplate.price = this.serviceForm.get('price').value;
    this.serviceTemplate.unit = this.serviceForm.get('unit').value;
    this.bottomSheetRef.dismiss(this.serviceTemplate);
  }

}
