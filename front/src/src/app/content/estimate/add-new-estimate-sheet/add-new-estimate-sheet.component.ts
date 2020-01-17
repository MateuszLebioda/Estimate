import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray,  FormGroup} from '@angular/forms';
import {Estimate} from '../../../model/estimate';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MaterialService} from '../../../services/material.service';
import {WorkService} from '../../../services/work.service';
import {JobTemplateService} from '../../../services/job-template.service';
import {WorkTemplate} from '../../../model/template/work-template';
import {JobTemplate} from '../../../model/template/job-template';
import {MaterialTemplate} from '../../../model/template/material-template';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddJobTemplateDialogComponentComponent} from '../add-job-template-dialog-component/add-job-template-dialog-component.component';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {AddAbstractMaterialDialogComponent} from '../../job-templates/add-abstract-material-dialog/add-abstract-material-dialog.component';
import {AbstractMaterial} from '../../../model/template/abstract-material';
import {FormService} from '../../../services/form-service.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {EstimateService} from '../../../services/estimate.service';

@Component({
  selector: 'app-add-new-estimate-sheet',
  templateUrl: './add-new-estimate-sheet.component.html',
  styleUrls: ['./add-new-estimate-sheet.component.scss']
})
export class AddNewEstimateSheetComponent implements OnInit {

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
    private estimateService: EstimateService
  ) {
    bottomSheetRef.disableClose = true;
    this.initData();
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

    this.estimateFormGroup = this.formService.createEstimateFormGroup(this.estimate);
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
    this.estimateService.addEstimate(estimate).subscribe(r => {
      console.log(r.body);
    });
    console.log();
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
}
