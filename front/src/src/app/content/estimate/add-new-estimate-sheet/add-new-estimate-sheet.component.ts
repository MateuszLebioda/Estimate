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

  materials: Array<MaterialTemplate>;

  jobTemplates: Array<JobTemplate>;

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

  getAvailableAbstractMaterials(abstractMaterials, formArray: FormArray): Array<AbstractMaterial> {
    const availableMaterials = new Array<AbstractMaterial>()
    for(let material of abstractMaterials){
      let isChosen = false;
      for(let materialChosen of formArray.controls){
        if(material.name === materialChosen.get('name').value){
          isChosen = true;
        }
      }
      if(!isChosen){
        availableMaterials.push(material)
      }
    }
    return availableMaterials;
  }

  getAvailableJobTemplates(): Array<JobTemplate> {
    const availableJobTemplates = new Array<JobTemplate>()
    for(let jobTemplate of this.jobTemplates){
      let isChosen = false;
      for(let jobTemplateChosen of this.getJobTemplateFormArray().controls){
        if(jobTemplate.name === jobTemplateChosen.get('name').value){
          isChosen = true;
        }
      }
      if(!isChosen){
        availableJobTemplates.push(jobTemplate)
      }
    }
    return availableJobTemplates;
  }



  getAvailableMaterials(): Array<AbstractMaterial> {
    return this.getAvailableAbstractMaterials(this.materials, this.getMaterialFormArray())
  }

  getAvailableWorks(): Array<AbstractMaterial> {
    return this.getAvailableAbstractMaterials(this.works, this.getWorkFormArray())
  }


  addMaterial() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.getAvailableMaterials(),
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.estimateFormGroup.get('materials') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  addWork() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.getAvailableWorks(),
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.estimateFormGroup.get('works') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  addJobTemplate() {
    const dialogRef = this.dialog.open(AddJobTemplateDialogComponentComponent, {
      data: this.getAvailableJobTemplates(),
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emitter.subscribe(jobTemplate => {
      (this.estimateFormGroup.get('jobTemplates') as FormArray).push(this.createJobTemplateFormJobTemple(jobTemplate));
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
  }

  deleteWork(formGroup: FormGroup) {
    this.getWorkFormArray()
      .removeAt(this.getWorkFormArray().controls.findIndex(w => w.get('id').value === formGroup.get('id').value));
  }

  getAllWorks(): Array<WorkTemplate> {
    return this.works;
  }

  getAllMaterials(): Array<MaterialTemplate> {
    return  this.materials;
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

}
