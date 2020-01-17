import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Estimate} from '../../../model/estimate';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MaterialService} from '../../../services/material.service';
import {WorkService} from '../../../services/work.service';
import {JobTemplateService} from '../../../services/job-template.service';
import {Work} from '../../../model/work';
import {JobTemplate} from '../../../model/job-template';
import {Material} from '../../../model/material';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddJobTemplateDialogComponentComponent} from '../add-job-template-dialog-component/add-job-template-dialog-component.component';
import {AbstractMaterialType} from '../../../model/abstract-material-type.enum';
import {JobTemplateEstimate} from '../../../model/job-template-estimate';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {AddAbstractMaterialDialogComponent} from '../../job-templates/add-abstract-material-dialog/add-abstract-material-dialog.component';
import {AbstractMaterial} from '../../../model/abstract-material';

@Component({
  selector: 'app-add-new-estimate-sheet',
  templateUrl: './add-new-estimate-sheet.component.html',
  styleUrls: ['./add-new-estimate-sheet.component.scss']
})
export class AddNewEstimateSheetComponent implements OnInit {

  estimateFormGroup: FormGroup;
  estimate: Estimate;

  works: Array<Work>;
  worksHidden = new Array<Work>();

  materials: Array<Material>;
  materialsHidden = new Array<Material>();

  jobTemplates: Array<JobTemplate>;
  jobTemplatesHidden = new Array<JobTemplate>();

  units = new Array<Unit>();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddNewEstimateSheetComponent>,
    private materialService: MaterialService,
    private workService: WorkService,
    private unitService: UnitService,
    private jobTemplateService: JobTemplateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {
    bottomSheetRef.disableClose = true;
    this.estimate = new Estimate();
    this.initData();
    this.estimateFormGroup = new FormGroup({
      name: new FormControl(this.estimate.name, [Validators.required]),
      materials: new FormArray([]),
      works: new FormArray([]),
      jobTemplates: new FormArray([]),
    });
  }

  private createJobTemplateForm(jobTemplate: JobTemplateEstimate): FormGroup {
    const formControl = new FormGroup({
      id: new FormControl(jobTemplate.id),
      name: new FormControl(jobTemplate.name, [Validators.required]),
      unit: new FormControl(jobTemplate.unit, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
      materials: new FormArray([]),
      works: new FormArray([]),
    });

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
      (formControl.get('materials') as FormArray).push(this.createMaterialFormGroup(material.material, material.value));
    }

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.WORK)) {
      (formControl.get('works') as FormArray).push(this.createMaterialFormGroup(material.material, material.value));
    }
    return formControl;
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

  getJobTemplateFormArray(): FormArray {
    return (this.estimateFormGroup.get('jobTemplates') as FormArray);
  }

  initData() {
    this.jobTemplateService.getJobTemplates().subscribe(response => {
      this.jobTemplates = response.body;
    });

    this.workService.getAllWorks().subscribe(response => {
      this.works = response.body;
    });

    this.materialService.getAllMaterials().subscribe(response => {
      this.materials = response.body;
    });

    this.unitService.getAllUnits().subscribe(response => {
      this.units = response.body;
    });
  }

  ngOnInit() {
  }

  addMaterial() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.materials,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.estimateFormGroup.get('materials') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.hideMaterial(material);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  hideMaterial(material: Material) {
    this.materialsHidden.push(this.materials.find(m => m.id === material.id));
    this.materials = this.materials.filter(m => m.id !== material.id);
  }

  addWork() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.works,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.estimateFormGroup.get('works') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.hideWorks(material);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  hideWorks(work: Work) {
    this.worksHidden.push(this.works.find(w => w.id === work.id));
    this.works = this.works.filter(m => m.id !== work.id);
  }

  addJobTemplate() {
    const dialogRef = this.dialog.open(AddJobTemplateDialogComponentComponent, {
      data: this.jobTemplates,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emitter.subscribe(jobTemplate => {
      (this.estimateFormGroup.get('jobTemplates') as FormArray).push(this.createJobTemplateForm(jobTemplate));
      this.hideJobTemplates(jobTemplate);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  saveJobTemplate() {

  }

  deleteJobTemplateForm(formGroup: FormGroup) {
    this.getJobTemplateFormArray()
      .removeAt(this.getJobTemplateFormArray().controls.findIndex(jt => jt.get('id').value === formGroup.get('id').value));
    this.jobTemplates.push(this.jobTemplatesHidden.find(m => m.id === formGroup.get('id').value));
  }

  hideJobTemplates(jobTemplate: JobTemplate) {
    this.jobTemplatesHidden.push(this.jobTemplates.find(m => m.id === jobTemplate.id));
    this.jobTemplates = this.jobTemplates.filter(m => m.id !== jobTemplate.id);
  }

  getMaterialFormArray() {
    return (this.estimateFormGroup.get('materials') as FormArray);
  }

  getWorkFormArray() {
    return (this.estimateFormGroup.get('works') as FormArray);
  }

  deleteMaterial(formGroup: FormGroup) {
    this.getMaterialFormArray()
      .removeAt(this.getMaterialFormArray().controls.findIndex(m => m.get('id').value === formGroup.get('id').value));
    this.materials.push(this.materialsHidden.find(m => m.id === formGroup.get('id').value));
  }

  deleteWork(formGroup: FormGroup) {
    this.getWorkFormArray()
      .removeAt(this.getWorkFormArray().controls.findIndex(w => w.get('id').value === formGroup.get('id').value));
    this.works.push(this.worksHidden.find(w => w.id === formGroup.get('id').value));
  }

  getAllWorks(): Array<Work> {
    const allWorks = this.works;
    for (const w of this.worksHidden) {
      allWorks.push(w);
    }
    return allWorks;
  }

  getAllMaterials(): Array<Material> {
    const allMaterials = this.materials;
    for (const m of this.materialsHidden) {
      allMaterials.push(m);
    }
    return allMaterials;
  }
}
