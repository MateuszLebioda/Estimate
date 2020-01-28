import {ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {JobTemplate} from '../../../model/template/job-template';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../../services/material.service';
import {ServiceService} from '../../../services/service.service';
import {ServiceTemplate} from '../../../model/template/service-template';
import {MaterialTemplate} from '../../../model/template/material-template';
import {MatDialog} from '@angular/material/dialog';
import {AddAbstractMaterialDialogComponent} from '../../../utils/add-abstract-material-dialog/add-abstract-material-dialog.component';
import {AbstractMaterial} from '../../../model/template/abstract-material';
import {AbstractMaterialType} from '../../../model/abstract-material-type.enum';
import {JobTemplateMaterial} from '../../../model/template/job-template-material';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JobTemplateService} from '../../../services/job-template.service';

@Component({
  selector: 'app-add-job-template-sheet',
  templateUrl: './add-job-template-sheet.component.html',
  styleUrls: ['./add-job-template-sheet.component.scss']
})
export class AddJobTemplateSheetComponent implements OnInit {

  @Output()
  JobTemplateEmitter = new EventEmitter<JobTemplate>();



  services = new Array<ServiceTemplate>();
  materials = new Array<MaterialTemplate>();
  units: Array<Unit>;

  jobTemplate = new JobTemplate();
  jobTemplateForm: FormGroup;

  constructor(private materialService: MaterialService,
              private serviceService: ServiceService,
              private bottomSheetRef: MatBottomSheetRef<AddJobTemplateSheetComponent>,
              private dialog: MatDialog,
              private unitService: UnitService,
              private snackBar: MatSnackBar,
              private addSheet: MatBottomSheet,
              private jobTemplateService: JobTemplateService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: JobTemplate,
              private cd: ChangeDetectorRef) {

    bottomSheetRef.disableClose = true;

    this.jobTemplateForm = new FormGroup({
      name: new FormControl(this.jobTemplate.name, [Validators.required]),
      unit: new FormControl(this.units, [Validators.required]),
      materials: new FormArray([]),
      services: new FormArray([])
    });

    if (data !== null) {
      this.jobTemplate.id = data.id;
      this.jobTemplateForm.get('name').setValue(data.name);

      for (const material of data.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
        const items = this.jobTemplateForm.get('materials') as FormArray;
        items.push(this.creatFormMaterialArray(material));
        this.materials = this.materials.filter(m => m.id !== material.material.id);
      }

      for (const material of data.materials.filter(m => m.material.type === AbstractMaterialType.SERVICE)) {
        const items = this.jobTemplateForm.get('services') as FormArray;
        items.push(this.creatFormMaterialArray(material));
        this.services = this.services.filter(m => m.id !== material.material.id);
      }
      this.jobTemplateForm.get('unit').setValue(data.unit);
    } else {
      this.jobTemplate = new JobTemplate();
    }

    unitService.getAllUnits().subscribe(units => {
      this.units = units.body;
    });

    serviceService.getAllServices().subscribe(services => {
      this.services = services.body;
      if (data !== null) {
        for (const jobTemplateMaterial of data.materials.filter(m => m.material.type === AbstractMaterialType.SERVICE)) {
          this.services = this.services.filter(m => m.id !== jobTemplateMaterial.material.id);
        }
      }
    });


    materialService.getAllMaterials().subscribe(materials => {
      this.materials = materials.body;
      if (data !== null) {
        for (const material of data.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
          this.materials = this.materials.filter(m => m.id !== material.material.id);
        }
      }
    });
  }

  private creatFormMaterialArray(jobTemplateMaterial: JobTemplateMaterial): FormGroup {
    return new FormGroup({
      material: new FormControl(jobTemplateMaterial.material),
      value: new FormControl(jobTemplateMaterial.value, [Validators.required])
    });
  }

  ngOnInit() {
  }

  saveJobTemplate() {
    this.jobTemplate.name = this.jobTemplateForm.get('name').value;
    this.jobTemplate.materials = this.jobTemplateForm.get('materials').value;
    for (const element of this.jobTemplateForm.get('services').value) {
      this.jobTemplate.materials.push(element);
    }
    this.jobTemplate.unit = this.jobTemplateForm.get('unit').value;

    this.bottomSheetRef.dismiss(this.jobTemplate);
  }

  addMaterial() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.materials,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      this.addJobAbstractMaterials(material, AbstractMaterialType.MATERIAL);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  addServices() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.services,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(service => {
      this.addJobAbstractMaterials(service, AbstractMaterialType.SERVICE);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  addJobAbstractMaterials(material: AbstractMaterial, type: AbstractMaterialType) {
    material.type = type;
    const jobTemplate = new JobTemplateMaterial();
    jobTemplate.material = material;
    jobTemplate.value = 1;
    if (material.type === AbstractMaterialType.SERVICE) {
      const items = this.jobTemplateForm.get('services') as FormArray;
      items.push(this.creatFormMaterialArray(jobTemplate));
      this.services = this.services.filter(m => m.id !== material.id);
    } else {
      const items = this.jobTemplateForm.get('materials') as FormArray;
      items.push(this.creatFormMaterialArray(jobTemplate));
      this.materials = this.materials.filter(m => m.id !== material.id);
    }
  }

  getMarkedServices(): FormArray {
    return this.jobTemplateForm.get('services') as FormArray;
  }

  getMarkedMaterial(): FormArray {
    return this.jobTemplateForm.get('materials') as FormArray;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  deleteMaterial(element: AbstractControl) {
    (this.jobTemplateForm.get('materials') as FormArray)
      .removeAt((this.jobTemplateForm.get('materials') as FormArray).value.findIndex(m => m.material.id = element.value.material.id));
    this.materials.push(element.value.material);
  }

  deleteService(element: AbstractControl) {
    (this.jobTemplateForm.get('services') as FormArray)
      .removeAt((this.jobTemplateForm.get('services') as FormArray).value.findIndex(m => m.material.id = element.value.material.id));
    this.services.push(element.value.material);
  }
}
