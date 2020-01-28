import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Unit} from '../../../../model/unit';
import {MaterialTemplate} from '../../../../model/template/material-template';
import {ServiceTemplate} from '../../../../model/template/service-template';
import {AddAbstractMaterialDialogComponent} from '../../../../utils/add-abstract-material-dialog/add-abstract-material-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AbstractMaterial} from '../../../../model/template/abstract-material';
import {FormService} from '../../../../services/form-service.service';

@Component({
  selector: 'app-job-template-estimate-form-view',
  templateUrl: './job-template-estimate-form-view.component.html',
  styleUrls: ['./job-template-estimate-form-view.component.scss']
})
export class JobTemplateEstimateFormViewComponent implements OnInit {

  @Input()
  allMaterials = new Array<MaterialTemplate>();

  @Input()
  allServices = new Array<ServiceTemplate>();

  @Input()
  jobTemplateFormControl: FormGroup;

  @Input()
  units: Array<Unit>;

  @Output()
  emitter = new EventEmitter<FormGroup>();

  opened = true;


  constructor(private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private formService: FormService) {

  }

  ngOnInit() {
    this.jobTemplateFormControl.get('materials').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });

    this.jobTemplateFormControl.get('services').valueChanges.subscribe(() => {
      this.calcSumPrice();
    });
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

  getServiceFormArray(): FormArray {
    return (this.jobTemplateFormControl.get('services') as FormArray);
  }

  addMaterial() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.getAvailableMaterials(),
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.jobTemplateFormControl.get('materials') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }


  createMaterialFormGroup(material: AbstractMaterial, value: number): FormGroup {
    return this.formService.createMaterialEstimateFormGroup(material, value);
  }

  addService() {
    const dialogRef = this.dialog.open(AddAbstractMaterialDialogComponent, {
      data: this.getAvailableServices(),
      width: '80%',
      height: '600px',
      disableClose: true
    });
    dialogRef.componentInstance.emmmiter.subscribe(material => {
      (this.jobTemplateFormControl.get('services') as FormArray).push(this.createMaterialFormGroup(material, 1));
      this.cd.markForCheck();
    });
    dialogRef.afterClosed().subscribe();
  }

  calcSumPrice() {
    let sum = 0;

    for (const material of this.getMaterialFormArray().controls) {
      sum = sum + Number(material.get('sumPrice').value);
    }
    for (const control of this.getServiceFormArray().controls) {
      sum = sum + Number(control.get('sumPrice').value);
    }

    this.jobTemplateFormControl.get('sumPrice').setValue(sum.toFixed(2));
  }

  getAvailableAbstractMaterials(abstractMaterials, formArray: FormArray): Array<AbstractMaterial> {
    const availableMaterials = new Array<AbstractMaterial>()
    for (const material of abstractMaterials) {
      let isChosen = false;
      for (const materialChosen of formArray.controls) {
        if (material.name === materialChosen.get('name').value) {
          isChosen = true;
        }
      }
      if (!isChosen) {
        availableMaterials.push(material)
      }
    }
    return availableMaterials;
  }


  getAvailableMaterials(): Array<AbstractMaterial> {
    return this.getAvailableAbstractMaterials(this.allMaterials, this.getMaterialFormArray())
  }

  getAvailableServices(): Array<AbstractMaterial> {
    return this.getAvailableAbstractMaterials(this.allServices, this.getServiceFormArray())
  }

}
