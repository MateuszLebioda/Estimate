import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Unit} from '../../../../../model/unit';
import {MaterialTemplate} from '../../../../../model/template/material-template';
import {ServiceTemplate} from '../../../../../model/template/service-template';

@Component({
  selector: 'app-material-form-view-component',
  templateUrl: './material-form-view-component.component.html',
  styleUrls: ['./material-form-view-component.component.scss']
})
export class MaterialFormViewComponentComponent implements OnInit {

  @Output()
  deletedServiceId = new EventEmitter<number>();

  @Input()
  allMaterials = new Array<MaterialTemplate>();

  @Input()
  addService = new Array<ServiceTemplate>();

  @Input()
  opened: boolean;

  @Input()
  jobTemplateFormGroup: FormGroup;

  @Input()
  units: Array<Unit>;

  constructor() {
  }

  ngOnInit(): void {
  }


  getMaterialFormArray(): FormArray {
    return (this.jobTemplateFormGroup.get('materials') as FormArray);
  }

  getServiceFormArray(): FormArray {
    return (this.jobTemplateFormGroup.get('services') as FormArray);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  deleteService(formGroup: FormGroup) {
    this.getServiceFormArray()
      .removeAt(this.getServiceFormArray().controls.findIndex(jt => jt.get('id').value === formGroup.get('id').value));
  }

  deleteMaterial(formGroup: FormGroup) {
    this.getMaterialFormArray()
      .removeAt(this.getMaterialFormArray().controls.findIndex(jt => jt.get('id').value === formGroup.get('id').value));
  }

  getCalcValue() {
    return this.jobTemplateFormGroup.get('value').value;
  }
}
