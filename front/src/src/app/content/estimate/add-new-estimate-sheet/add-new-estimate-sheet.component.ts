import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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

@Component({
  selector: 'app-add-new-estimate-sheet',
  templateUrl: './add-new-estimate-sheet.component.html',
  styleUrls: ['./add-new-estimate-sheet.component.scss']
})
export class AddNewEstimateSheetComponent implements OnInit {

  estimateFormGroup: FormGroup;
  estimate: Estimate;

  works: Array<Work>;
  materials: Array<Material>;
  jobTemplates: Array<JobTemplate>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddNewEstimateSheetComponent>,
    private materialService: MaterialService,
    private workService: WorkService,
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

  private createJobTemplateForm(jobTemplate: JobTemplate): FormGroup {
    const formControl = new FormGroup({
        name: new FormControl(jobTemplate.name, [Validators.required]),
        unit: new FormControl(jobTemplate.unit, [Validators.required]),
        materials: new FormArray([]),
        works: new FormArray([]),
    });

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
      (formControl.get('materials') as FormArray).push(new FormGroup({
        name: new FormControl(material.material.name, [Validators.required]),
        price: new FormControl(material.material.price, [Validators.required, Validators.pattern('[0-9]*(\\.[0-9][0-9]){0,1}')]),
        unit: new FormControl(material.material.unit, [Validators.required]),
        value: new FormControl(material.value, [Validators.required]),
      }));
    }

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.WORK)) {
      (formControl.get('works') as FormArray).push(new FormGroup({
        name: new FormControl(material.material.name, [Validators.required]),
        price: new FormControl(material.material.price, [Validators.required, Validators.pattern('[0-9]*(\\.[0-9][0-9]){0,1}')]),
        unit: new FormControl(material.material.unit, [Validators.required]),
        value: new FormControl(material.value, [Validators.required]),
      }));
    }
    return formControl;
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
  }

  ngOnInit() {
  }

  addMaterial() {

  }

  addWork() {

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
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  saveJobTemplate() {

  }
}
