import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Unit} from '../../../../../model/unit';
import {MaterialTemplate} from '../../../../../model/template/material-template';
import {WorkTemplate} from '../../../../../model/template/work-template';

@Component({
  selector: 'app-material-form-view-component',
  templateUrl: './material-form-view-component.component.html',
  styleUrls: ['./material-form-view-component.component.scss']
})
export class MaterialFormViewComponentComponent implements OnInit {

  @Output()
  deletedWork = new EventEmitter<number>();

  @Input()
  allMaterials = new Array<MaterialTemplate>();

  @Input()
  allWorks = new Array<WorkTemplate>();

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

  getWorkFormArray(): FormArray {
    return (this.jobTemplateFormGroup.get('works') as FormArray);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  deleteWork(formGroup: FormGroup) {
    this.getWorkFormArray()
      .removeAt(this.getWorkFormArray().controls.findIndex(jt => jt.get('id').value === formGroup.get('id').value));
  }

  deleteMaterial(formGroup: FormGroup) {
    this.getMaterialFormArray()
      .removeAt(this.getMaterialFormArray().controls.findIndex(jt => jt.get('id').value === formGroup.get('id').value));
  }

  getCalcValue() {
    return this.jobTemplateFormGroup.get('value').value;
  }
}
