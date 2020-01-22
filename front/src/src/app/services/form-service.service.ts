import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractMaterial} from '../model/template/abstract-material';
import {JobTemplateEstimate} from '../model/job-template-estimate';
import {Estimate} from '../model/estimate';
import {JobTemplate} from '../model/template/job-template';
import {AbstractMaterialType} from '../model/abstract-material-type.enum';
import {MaterialEstimate} from '../model/material-estimate';
import {WorkEstimate} from '../model/work-estimate';
import {Client} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {
  }

  createMaterialEstimateFormGroup(material: AbstractMaterial, value: number): FormGroup {
    return this.formBuilder.group({
        id: [material.id],
        name: [material.name, [Validators.required]],
        price: [material.price, [Validators.required, Validators.pattern('\\d+(\\.\\d{1,2})*')]],
        unit: [material.unit, [Validators.required]],
        value: [value, [Validators.required]],
        sumPrice: [0],
        sumValue: [0]
      }
    );
  }

  createMaterialFromMaterialEstimateFormGroup(form: FormGroup): MaterialEstimate {
    const material = new MaterialEstimate();
    material.id = 0;
    material.unit = form.get('unit').value;
    material.name = form.get('name').value;
    material.price = form.get('price').value;
    material.sumPrice = form.get('sumPrice').value;
    material.sumValue = form.get('sumValue').value;
    return material;
  }

  createMaterialEstimateArrayFromEstimateFormGroup(form: FormGroup): Array<MaterialEstimate> {
    const materials = new Array<MaterialEstimate>();
    for (const materialForm of (form.get('materials') as FormArray).controls) {
      materials.push(this.createMaterialFromMaterialEstimateFormGroup(materialForm as FormGroup));
    }
    return materials;
  }

  createWorkFromMaterialEstimateFormGroup(form: FormGroup): WorkEstimate {
    const work = new WorkEstimate();
    work.id = 0;
    work.unit = form.get('unit').value;
    work.name = form.get('name').value;
    work.price = form.get('price').value;
    work.sumPrice = form.get('sumPrice').value;
    work.sumValue = form.get('sumValue').value;
    return work;
  }

  createWorEstimateArrayFromEstimateFormGroup(form: FormGroup): Array<WorkEstimate> {
    const works = new Array<WorkEstimate>();
    for (const workForm of (form.get('works') as FormArray).controls) {
      works.push(this.createWorkFromMaterialEstimateFormGroup(workForm as FormGroup));
    }
    return works;
  }

  createJobTemplateEstimateFormGroup(jobTemplate: JobTemplate): FormGroup {
    return this.formBuilder.group({
      id: [jobTemplate.id],
      name: [jobTemplate.name, Validators.required],
      unit: [jobTemplate.unit, [Validators.required]],
      value: [0, Validators.required],
      materials: this.formBuilder.array([]),
      works: this.formBuilder.array([]),
      sumPrice: [0]
    });
  }

  createJobTemplateEstimateFromJobTemplateEstimateFormGroup(form: FormGroup): JobTemplateEstimate {
    const jobTemplateEstimate = new JobTemplateEstimate();
    jobTemplateEstimate.id = 0;
    jobTemplateEstimate.value = form.get('value').value;
    jobTemplateEstimate.unit = form.get('unit').value;
    jobTemplateEstimate.name = form.get('name').value;
    jobTemplateEstimate.sumPrice = form.get('sumPrice').value;
    jobTemplateEstimate.setMaterials(
      this.createMaterialEstimateArrayFromEstimateFormGroup(form),
      this.createWorEstimateArrayFromEstimateFormGroup(form));
    return jobTemplateEstimate;
  }


  createJobTemplateArrayEstimateFromJobTemplateEstimateFormGroup(form: FormGroup) {
    const jobTemplates = new Array<JobTemplateEstimate>();
    for (const jobTemplateForm of (form.get('jobTemplates') as FormArray).controls) {
      jobTemplates.push(this.createJobTemplateEstimateFromJobTemplateEstimateFormGroup(jobTemplateForm as FormGroup));
    }
    return jobTemplates;
  }

  createJobTemplateEstimateFormFromJobTemple(jobTemplate: JobTemplate): FormGroup {
    const formControl = this.createJobTemplateEstimateFormGroup(jobTemplate);

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
      (formControl.get('materials') as FormArray).push(this.createMaterialEstimateFormGroup(material.material, material.value));
    }

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.WORK)) {
      (formControl.get('works') as FormArray).push(this.createMaterialEstimateFormGroup(material.material, material.value));
    }
    return formControl;
  }

  createEstimateFormGroup(estimate: Estimate): FormGroup {
    return this.formBuilder.group({
      name: [estimate.name, Validators.required],
      client: [new Client()],
      materials: this.formBuilder.array([]),
      works: this.formBuilder.array([]),
      jobTemplates: this.formBuilder.array([]),
      sumPrice: [0]
    });
  }

  createEstimateFromEstimateFormGroup(form: FormGroup): Estimate {
    const estimate = new Estimate();
    estimate.name = form.get('name').value;
    estimate.materials = this.createMaterialEstimateArrayFromEstimateFormGroup(form);
    estimate.works = this.createWorEstimateArrayFromEstimateFormGroup(form);
    estimate.jobTemplates = this.createJobTemplateArrayEstimateFromJobTemplateEstimateFormGroup(form);
    estimate.client = form.get('client').value;
    estimate.sumPrice = form.get('sumPrice').value;
    return estimate;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

}
