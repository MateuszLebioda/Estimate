import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Unit} from '../../../../../model/unit';

@Component({
  selector: 'app-material-form-editable-component',
  templateUrl: './material-form-editable-component.component.html',
  styleUrls: ['./material-form-editable-component.component.scss']
})
export class MaterialFormEditableComponentComponent implements OnInit, OnChanges {

  @Input()
  calcValue: number;

  @Input()
  materialFormControl: FormGroup;

  @Input()
  units: Array<Unit>;

  @Output()
  deleteEmitter = new EventEmitter<FormGroup>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getSumValue();
  }

  ngOnInit() {
    if (this.calcValue === undefined) {
      this.calcValue = 1;
    }

    this.materialFormControl.get('price').valueChanges.subscribe(() => {
      this.getSumValue();
    });

    this.materialFormControl.get('value').valueChanges.subscribe(() => {
      this.getSumValue();
    });

    this.getSumValue();
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  deleteForm(form: FormGroup) {
    this.deleteEmitter.emit(form);
  }

  getSumValue() {
    this.materialFormControl.get('sumPrice').setValue(
      (this.materialFormControl.get('price').value
        * this.materialFormControl.get('value').value
        * this.calcValue).toFixed(2));

    this.materialFormControl.get('sumValue').setValue(
      (this.materialFormControl.get('value').value
        * this.calcValue).toFixed(2));
  }
}
