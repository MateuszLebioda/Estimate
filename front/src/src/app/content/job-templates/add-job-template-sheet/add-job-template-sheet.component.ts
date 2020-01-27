import {ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {JobTemplate} from '../../../model/template/job-template';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../../services/material.service';
import {WorkService} from '../../../services/work.service';
import {WorkTemplate} from '../../../model/template/work-template';
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

  works = new Array<WorkTemplate>();
  materials = new Array<MaterialTemplate>();
  units: Array<Unit>;

  jobTemplate = new JobTemplate();
  jobTemplateForm: FormGroup;

  constructor(private materialService: MaterialService,
              private workService: WorkService,
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
      works: new FormArray([])
    });

    if (data !== null) {
      this.jobTemplate.id = data.id;
      this.jobTemplateForm.get('name').setValue(data.name);

      for (const material of data.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
        const items = this.jobTemplateForm.get('materials') as FormArray;
        items.push(this.creatFormMaterialArray(material));
        this.materials = this.materials.filter(m => m.id !== material.material.id);
      }

      for (const material of data.materials.filter(m => m.material.type === AbstractMaterialType.WORK)) {
        const items = this.jobTemplateForm.get('works') as FormArray;
        items.push(this.creatFormMaterialArray(material));
        this.works = this.works.filter(m => m.id !== material.material.id);
      }
      this.jobTemplateForm.get('unit').setValue(data.unit);
    } else {
      this.jobTemplate = new JobTemplate();
    }

    unitService.getAllUnits().subscribe(units => {
      this.units = units.body;
    });

    workService.getAllWorks().subscribe(works => {
      this.works = works.body;
      if (data !== null) {
        for (const work of data.materials.filter(m => m.material.type === AbstractMaterialType.WORK)) {
          this.works = this.works.filter(m => m.id !== work.material.id);
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
    for (const element of this.jobTemplateForm.get('works').value) {
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

  addWork() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.works,
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(work => {
      this.addJobAbstractMaterials(work, AbstractMaterialType.WORK);
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  addJobAbstractMaterials(material: AbstractMaterial, type: AbstractMaterialType) {
    material.type = type;
    const jobTemplate = new JobTemplateMaterial();
    jobTemplate.material = material;
    jobTemplate.value = 1;
    if (material.type === AbstractMaterialType.WORK) {
      const items = this.jobTemplateForm.get('works') as FormArray;
      items.push(this.creatFormMaterialArray(jobTemplate));
      this.works = this.works.filter(m => m.id !== material.id);
    } else {
      const items = this.jobTemplateForm.get('materials') as FormArray;
      items.push(this.creatFormMaterialArray(jobTemplate));
      this.materials = this.materials.filter(m => m.id !== material.id);
    }
  }

  getMarkedWorks(): FormArray {
    return this.jobTemplateForm.get('works') as FormArray;
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

  deleteWork(element: AbstractControl) {
    (this.jobTemplateForm.get('works') as FormArray)
      .removeAt((this.jobTemplateForm.get('works') as FormArray).value.findIndex(m => m.material.id = element.value.material.id));
    this.works.push(element.value.material);
  }
}
