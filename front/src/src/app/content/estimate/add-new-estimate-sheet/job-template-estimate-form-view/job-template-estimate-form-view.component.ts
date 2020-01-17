import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../../model/unit';
import {Material} from '../../../../model/material';
import {Work} from '../../../../model/work';
import {AddAbstractMaterialDialogComponent} from '../../../job-templates/add-abstract-material-dialog/add-abstract-material-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AbstractMaterial} from '../../../../model/abstract-material';

@Component({
  selector: 'app-job-template-estimate-form-view',
  templateUrl: './job-template-estimate-form-view.component.html',
  styleUrls: ['./job-template-estimate-form-view.component.scss']
})
export class JobTemplateEstimateFormViewComponent implements OnInit {

  @Input()
  allMaterials = new Array<Material>();
  materialsHidden = new Array<Material>();

  @Input()
  allWorks = new Array<Work>();
  worksHidden = new Array<Work>();

  @Input()
  jobTemplateFormControl: FormGroup;

  @Input()
  units: Array<Unit>;

  @Output()
  emitter = new EventEmitter<FormGroup>();

  opened = true;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    if (this.getMaterialFormArray() !== null) {
      for (const material of this.getMaterialFormArray().controls) {
        if (this.allMaterials.find(m => m.id === material.get('id').value)) {
          this.materialsHidden
            .push(this.allMaterials[this.allMaterials.findIndex(m => m.id === material.get('id').value)]);
          this.allMaterials = this.allMaterials.filter(m => m.id !== material.get('id').value);
        }
      }
    }
    if (this.getWorkFormArray() !== null) {
      for (const work of this.getWorkFormArray().controls) {
        if (this.allWorks.find(m => m.id === work.get('id').value)) {
          this.worksHidden
            .push(this.allWorks[this.allWorks.findIndex(m => m.id === work.get('id').value)]);
          this.allWorks = this.allWorks.filter(m => m.id !== work.get('id').value);
        }
      }
    }
  }

  deleteJobTemplates() {
    this.emitter.emit(this.jobTemplateFormControl);
  }

  expand() {
    this.opened = !this.opened;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  getMaterialFormArray(): FormArray {
    return (this.jobTemplateFormControl.get('materials') as FormArray);
  }

  getWorkFormArray(): FormArray {
    return (this.jobTemplateFormControl.get('allWorks') as FormArray);
  }

  addMaterial() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.allMaterials,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.jobTemplateFormControl.get('materials') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.hideMaterial(material);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  hideMaterial(material: Material) {
    this.materialsHidden.push(this.allMaterials.find(m => m.id === material.id));
    this.allMaterials = this.allMaterials.filter(m => m.id !== material.id);
  }

  createMaterialFormGroup(material: AbstractMaterial, value: number): FormGroup {
    return new FormGroup({
      id: new FormControl(material.id),
      name: new FormControl(material.name, [Validators.required]),
      price: new FormControl(material.price, [Validators.required, Validators.pattern('\\d+(\\.\\d{1,2})*')]),
      unit: new FormControl(material.unit, [Validators.required]),
      value: new FormControl(value, [Validators.required]),
      sumPrice: new FormControl(0),
      sumValue: new FormControl(0),
    });
  }

  addWork() {

  }

  unhideMaterial(id: number) {
    this.allMaterials.push(this.materialsHidden.find(m => m.id === id));
    this.materialsHidden = this.materialsHidden.filter(m => m.id !== id);
  }
}
