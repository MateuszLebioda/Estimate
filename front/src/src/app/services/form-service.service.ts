import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractMaterial} from '../model/template/abstract-material';
import {JobTemplateEstimate} from '../model/job-template-estimate';
import {Estimate} from '../model/estimate';
import {JobTemplate} from '../model/template/job-template';
import {AbstractMaterialType} from '../model/abstract-material-type.enum';
import {MaterialEstimate} from '../model/material-estimate';
import {ServiceEstimate} from '../model/service-estimate';
import {AbstractEstimateMaterial} from '../model/abstract-estimate-material';

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

  createMaterialEstimateFormGroupFromAbstractEstimateMaterial(material: AbstractEstimateMaterial): FormGroup {
    return this.formBuilder.group({
        id: [material.id],
        name: [material.name, [Validators.required]],
        price: [material.price, [Validators.required, Validators.pattern('\\d+(\\.\\d{1,2})*')]],
        unit: [material.unit, [Validators.required]],
        value: [material.value, [Validators.required]],
        sumPrice: [material.sumPrice],
        sumValue: [material.sumValue]
      }
    );
  }

  createMaterialEstimateFormArray(materials: Array<AbstractEstimateMaterial>): FormArray {
    const formArray = this.formBuilder.array([]);
    for (const material of materials) {
      formArray.push(this.createMaterialEstimateFormGroupFromAbstractEstimateMaterial(material));
    }
    return formArray;
  }

  createMaterialFromMaterialEstimateFormGroup(form: FormGroup): MaterialEstimate {
    const material = new MaterialEstimate();
    material.id = 0;
    material.unit = form.get('unit').value;
    material.name = form.get('name').value;
    material.price = form.get('price').value;
    material.value = form.get('value').value;
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

  createServiceFromMaterialEstimateFormGroup(form: FormGroup): ServiceEstimate {
    const serviceEstimate = new ServiceEstimate();
    serviceEstimate.id = 0;
    serviceEstimate.unit = form.get('unit').value;
    serviceEstimate.name = form.get('name').value;
    serviceEstimate.price = form.get('price').value;
    serviceEstimate.value = form.get('value').value;
    serviceEstimate.sumPrice = form.get('sumPrice').value;
    serviceEstimate.sumValue = form.get('sumValue').value;
    return serviceEstimate;
  }

  createServiceEstimateArrayFromEstimateFormGroup(form: FormGroup): Array<ServiceEstimate> {
    const services = new Array<ServiceEstimate>();
    for (const serviceForm of (form.get('services') as FormArray).controls) {
      services.push(this.createServiceFromMaterialEstimateFormGroup(serviceForm as FormGroup));
    }
    return services;
  }

  createJobTemplateFormGroup(jobTemplate: JobTemplate): FormGroup {
    return this.formBuilder.group({
      id: [jobTemplate.id],
      name: [jobTemplate.name, Validators.required],
      unit: [jobTemplate.unit, [Validators.required]],
      value: [0, Validators.required],
      materials: this.formBuilder.array([]),
      services: this.formBuilder.array([]),
      sumPrice: [0]
    });
  }

  createJobTemplateEstimateFormGroup(jobTemplate: JobTemplateEstimate): FormGroup {
    return this.formBuilder.group({
      id: [jobTemplate.id],
      name: [jobTemplate.name, Validators.required],
      unit: [jobTemplate.unit, [Validators.required]],
      value: [jobTemplate.value, Validators.required],
      materials: this.createMaterialEstimateFormArray(jobTemplate.materials.filter(jt => jt.type === AbstractMaterialType.MATERIAL)),
      services: this.createMaterialEstimateFormArray(jobTemplate.materials.filter(jt => jt.type === AbstractMaterialType.SERVICE)),
      sumPrice: [jobTemplate.sumPrice]
    });
  }

  createJobTemplateEstimateFormArray(jobTemplates: Array<JobTemplateEstimate>): FormArray {
    const formArray = this.formBuilder.array([]);
    for (const jobTemplate of jobTemplates) {
      formArray.push(this.createJobTemplateEstimateFormGroup(jobTemplate));
    }
    return formArray;
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
      this.createServiceEstimateArrayFromEstimateFormGroup(form));
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
    const formControl = this.createJobTemplateFormGroup(jobTemplate);

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL)) {
      (formControl.get('materials') as FormArray).push(this.createMaterialEstimateFormGroup(material.material, material.value));
    }

    for (const material of jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.SERVICE)) {
      (formControl.get('services') as FormArray).push(this.createMaterialEstimateFormGroup(material.material, material.value));
    }
    return formControl;
  }

  createEstimateFormGroup(estimate: Estimate): FormGroup {
    return this.formBuilder.group({
      id: [estimate.id],
      name: [estimate.name, Validators.required],
      client: [estimate.client],
      materials:
        estimate.materials ?
          this.createMaterialEstimateFormArray(estimate.materials) : this.formBuilder.array([]),
      services:
        estimate.servicesEstimate ?
          this.createMaterialEstimateFormArray(estimate.servicesEstimate) : this.formBuilder.array([]),
      jobTemplates:
        estimate.jobTemplates ?
          this.createJobTemplateEstimateFormArray(estimate.jobTemplates) : this.formBuilder.array([]),
      sumPrice: [estimate.sumPrice]
    });
  }

  createEstimateFromEstimateFormGroup(form: FormGroup): Estimate {
    const estimate = new Estimate();
    estimate.id = form.get('id').value;
    estimate.name = form.get('name').value;
    estimate.materials = this.createMaterialEstimateArrayFromEstimateFormGroup(form);
    estimate.servicesEstimate = this.createServiceEstimateArrayFromEstimateFormGroup(form);
    estimate.jobTemplates = this.createJobTemplateArrayEstimateFromJobTemplateEstimateFormGroup(form);
    estimate.client = form.get('client').value === null ? null : form.get('client').value;
    estimate.sumPrice = form.get('sumPrice').value;
    console.log(estimate);
    return estimate;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return o1.id === o2.id;
  }

}
