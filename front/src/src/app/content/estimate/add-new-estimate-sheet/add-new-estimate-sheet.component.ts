import {ChangeDetectorRef, Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Estimate} from '../../../model/estimate';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MaterialService} from '../../../services/material.service';
import {WorkService} from '../../../services/work.service';
import {JobTemplateService} from '../../../services/job-template.service';
import {WorkTemplate} from '../../../model/template/work-template';
import {JobTemplate} from '../../../model/template/job-template';
import {MaterialTemplate} from '../../../model/template/material-template';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddJobTemplateDialogComponentComponent} from '../../../utils/add-job-template-dialog-component/add-job-template-dialog-component.component';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {AddAbstractMaterialDialogComponent} from '../../../utils/add-abstract-material-dialog/add-abstract-material-dialog.component';
import {AbstractMaterial} from '../../../model/template/abstract-material';
import {FormService} from '../../../services/form-service.service';
import {Client} from '../../../model/client';

@Component({
  selector: 'app-add-new-estimate-sheet',
  templateUrl: './add-new-estimate-sheet.component.html',
  styleUrls: ['./add-new-estimate-sheet.component.scss']
})
export class AddNewEstimateSheetComponent implements OnInit {

  emitter = new EventEmitter<Estimate>();

  clients: Array<Client>;

  estimateFormGroup: FormGroup;
  estimate = new Estimate();

  works: Array<WorkTemplate>;
  worksHidden = new Array<WorkTemplate>();

  materials: Array<MaterialTemplate>;
  materialsHidden = new Array<MaterialTemplate>();

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
    private cd: ChangeDetectorRef,
    private formService: FormService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
  ) {
    bottomSheetRef.disableClose = true;
  }

  private createJobTemplateFormJobTemple(jobTemplate: JobTemplate): FormGroup {
    return this.formService.createJobTemplateEstimateFormFromJobTemple(jobTemplate);
  }

  createMaterialFormGroup(material: AbstractMaterial, value: number): FormGroup {
    return this.formService.createMaterialEstimateFormGroup(material, value);
  }

  getJobTemplateFormArray(): FormArray {
    return (this.estimateFormGroup.get('jobTemplates') as FormArray);
  }

  initData() {
    if (this.data !== null) {
      this.jobTemplates = this.data.jobTemplates;
      this.works = this.data.workTemplates;
      this.materials = this.data.materialTemplates;
      this.units = this.data.units;
      this.clients = this.data.clients;
      if (this.data.estimate) {
        this.estimate = this.data.estimate;
        this.hide();
      }
    }
    this.estimateFormGroup = this.formService.createEstimateFormGroup(this.estimate);
  }

  ngOnInit() {
    this.initData();
    this.estimateFormGroup.get('materials').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });
    this.estimateFormGroup.get('works').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });
    this.estimateFormGroup.get('jobTemplates').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });
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

  hideMaterial(material: MaterialTemplate) {
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

  hideWorks(work: WorkTemplate) {
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
      (this.estimateFormGroup.get('jobTemplates') as FormArray).push(this.createJobTemplateFormJobTemple(jobTemplate));
      this.hideJobTemplates(jobTemplate);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  saveJobTemplate() {
    const estimate = this.formService.createEstimateFromEstimateFormGroup(this.estimateFormGroup);
    this.bottomSheetRef.dismiss(estimate);
  }

  deleteJobTemplateForm(formGroup: FormGroup) {
    this.getJobTemplateFormArray()
      .removeAt(this.getJobTemplateFormArray().controls.findIndex(jt => jt.get('id').value === formGroup.get('id').value));
    if (!(this.jobTemplatesHidden.find(m => m.name === formGroup.get('name').value)) === undefined) {
      this.jobTemplates.push(this.jobTemplatesHidden.find(m => m.name === formGroup.get('name').value));
    }
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

  getAllWorks(): Array<WorkTemplate> {
    const allWorks = this.works;
    for (const w of this.worksHidden) {
      allWorks.push(w);
    }
    return allWorks;
  }

  getAllMaterials(): Array<MaterialTemplate> {
    const allMaterials = this.materials;
    for (const m of this.materialsHidden) {
      allMaterials.push(m);
    }
    return allMaterials;
  }

  calcSumPriceMaterials(): number {
    let sum = 0;

    for (const material of this.getMaterialFormArray().controls) {
      sum = sum + Number(material.get('sumPrice').value);
    }
    return Number(sum.toFixed(2));
  }

  calcSumPriceWorks(): number {
    let sum = 0;
    for (const work of this.getWorkFormArray().controls) {
      sum = sum + Number(work.get('sumPrice').value);
    }
    return Number(sum.toFixed(2));
  }

  private calcSumPrice() {
    let sum = 0;
    sum = sum + this.calcSumPriceWorks();
    sum = sum + this.calcSumPriceMaterials();
    for (const work of this.getJobTemplateFormArray().controls) {
      sum = sum + Number(work.get('sumPrice').value);
    }
    this.estimateFormGroup.get('sumPrice').setValue(sum.toFixed(2));
  }


  // TODO:finish it!
  private hide() {
    for (const material of this.estimate.materials) {
      this.materialsHidden.push(this.materials.find(w => w.name === material.name));
      this.materials = this.materials.filter(m => m.name !== material.name);
    }
    for (const work of this.estimate.works) {
      this.worksHidden.push(this.works.find(w => w.name === work.name));
      this.works = this.works.filter(m => m.name !== work.name);
    }
    for (const jobTemplate of this.estimate.jobTemplates) {
      this.jobTemplatesHidden.push(this.jobTemplates.find(w => w.name === jobTemplate.name));
      this.jobTemplates = this.jobTemplates.filter(m => m.name !== jobTemplate.name);
    }
  }
}
