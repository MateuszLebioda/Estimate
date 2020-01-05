import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {JobTemplate} from '../../../model/job-template';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../../services/material.service';
import {WorkService} from '../../../services/work.service';
import {Work} from '../../../model/work';
import {Material} from '../../../model/material';
import {MatDialog} from '@angular/material/dialog';
import {AddAbstractMaterialDialogComponent} from '../add-abstract-material-dialog/add-abstract-material-dialog.component';
import {AbstractMaterial} from '../../../model/abstract-material';
import {AbstractMaterialType} from '../../../model/abstract-material-type.enum';
import {JobTemplateMaterial} from '../../../model/job-template-material';
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

  works = new Array<Work>();
  materials = new Array<Material>();
  units: Array<Unit>;
  jobAbstractMaterials = new Array<JobTemplateMaterial>();

  jobTemplate: JobTemplate;
  jobTemplateForm: FormGroup;
  displayedColumns: string[] = ['material', 'value'];

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
    if (data !== null) {
      this.jobTemplate = data;
    } else {
      this.jobTemplate = new JobTemplate();
    }

    unitService.getAllUnits().subscribe(units => {
      this.units = units.body;
    });

    workService.getAllWorks().subscribe(works => {
      this.works = works.body;
    });

    materialService.getAllMaterials().subscribe(materials => {
      this.materials = materials.body;
    });

    this.jobTemplateForm = new FormGroup({
      name: new FormControl(this.jobTemplate.name, [Validators.required]),
      unit: new FormControl(this.units, [Validators.required]),
      materials: new FormArray([])
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
    this.jobTemplate.unit = this.jobTemplateForm.get('unit').value;
    this.jobTemplateService.addJobTemplate(this.jobTemplate).subscribe(response => {

      }
    );
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
    this.jobAbstractMaterials.push(jobTemplate);
    const items = this.jobTemplateForm.get('materials') as FormArray;
    items.push(this.creatFormMaterialArray(jobTemplate));
  }

  getMarkedWorks(): Array<JobTemplateMaterial> {
    return this.jobAbstractMaterials.filter(m => m.material.type === AbstractMaterialType.WORK);
  }

  getMarkedMaterial(): Array<JobTemplateMaterial> {
    return this.jobAbstractMaterials.filter(m => m.material.type === AbstractMaterialType.MATERIAL);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

  deleteElement(element: JobTemplateMaterial, index: number) {
    this.jobAbstractMaterials = this.jobAbstractMaterials.filter(m => m.material.id !== element.material.id);
    (this.jobTemplateForm.get('materials') as FormArray).removeAt(index);
  }
}
