import {ChangeDetectorRef, Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Estimate} from '../../../model/estimate';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MaterialService} from '../../../services/material.service';
import {ServiceService} from '../../../services/service.service';
import {JobTemplateService} from '../../../services/job-template.service';
import {ServiceTemplate} from '../../../model/template/service-template';
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
import {AbstractMaterialType} from '../../../model/abstract-material-type.enum';

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

  services: Array<ServiceTemplate>;

  materials: Array<MaterialTemplate>;

  jobTemplates: Array<JobTemplate>;

  units = new Array<Unit>();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddNewEstimateSheetComponent>,
    private materialService: MaterialService,
    private serviceService: ServiceService,
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
      this.services = this.data.serviceTemplates;
      this.materials = this.data.materialTemplates;
      this.units = this.data.units;
      this.clients = this.data.clients;
      // this.clients.push(new Client());
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
    this.estimateFormGroup.get('services').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });
    this.estimateFormGroup.get('jobTemplates').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });
  }

  getAvailableAbstractMaterials(abstractMaterials, formArray: FormArray): Array<AbstractMaterial> {
    const availableMaterials = new Array<AbstractMaterial>();
    for (const material of abstractMaterials) {
      let isChosen = false;
      for (const materialChosen of formArray.controls) {
        if (material.name === materialChosen.get('name').value) {
          isChosen = true;
        }
      }
      if (!isChosen) {
        availableMaterials.push(material);
      }
    }
    return availableMaterials;
  }

  getAvailableJobTemplates(): Array<JobTemplate> {
    const availableJobTemplates = new Array<JobTemplate>();
    for (const jobTemplate of this.jobTemplates) {
      let isChosen = false;
      for (const jobTemplateChosen of this.getJobTemplateFormArray().controls) {
        if (jobTemplate.name === jobTemplateChosen.get('name').value) {
          isChosen = true;
        }
      }
      if (!isChosen) {
        availableJobTemplates.push(jobTemplate);
      }
    }
    return availableJobTemplates;
  }


  getAvailableMaterials(): Array<AbstractMaterial> {
    return this.getAvailableAbstractMaterials(this.materials, this.getMaterialFormArray());
  }

  getAvailableServices(): Array<AbstractMaterial> {
    return this.getAvailableAbstractMaterials(this.services, this.getServicesFormArray());
  }


  addMaterial() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: {materials: this.getAvailableMaterials(), returnEmptyService: true, returnType: AbstractMaterialType.MATERIAL},
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

  addService() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: {materials: this.getAvailableServices(), returnEmptyService: true, returnType: AbstractMaterialType.SERVICE},
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.estimateFormGroup.get('services') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  addJobTemplate() {
    const dialogRef = this.dialog.open(AddJobTemplateDialogComponentComponent, {
      data: this.getAvailableJobTemplates(),
      width: '80%',
      height: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container'
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

  getServicesFormArray() {
    return (this.estimateFormGroup.get('services') as FormArray);
  }

  deleteMaterial(formGroup: FormGroup) {
    this.getMaterialFormArray()
      .removeAt(this.getMaterialFormArray().controls.findIndex(m => m.get('id').value === formGroup.get('id').value));
  }

  deleteService(formGroup: FormGroup) {
    this.getServicesFormArray()
      .removeAt(this.getServicesFormArray().controls.findIndex(w => w.get('id').value === formGroup.get('id').value));
  }

  getAllServices(): Array<ServiceTemplate> {
    return this.services;
  }

  getAllMaterials(): Array<MaterialTemplate> {
    return this.materials;
  }

  calcSumPriceMaterials(): number {
    let sum = 0;

    for (const material of this.getMaterialFormArray().controls) {
      sum = sum + Number(material.get('sumPrice').value);
    }
    return Number(sum.toFixed(2));
  }

  calcSumPriceService(): number {
    let sum = 0;
    for (const service of this.getServicesFormArray().controls) {
      sum = sum + Number(service.get('sumPrice').value);
    }
    return Number(sum.toFixed(2));
  }

  private calcSumPrice() {
    let sum = 0;
    sum = sum + this.calcSumPriceService();
    sum = sum + this.calcSumPriceMaterials();
    for (const control of this.getJobTemplateFormArray().controls) {
      sum = sum + Number(control.get('sumPrice').value);
    }
    this.estimateFormGroup.get('sumPrice').setValue(sum.toFixed(2));
  }

}
