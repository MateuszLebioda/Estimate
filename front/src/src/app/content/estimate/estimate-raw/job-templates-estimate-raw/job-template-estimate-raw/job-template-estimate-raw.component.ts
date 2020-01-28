import {Component, Input, OnInit} from '@angular/core';
import {JobTemplateEstimate} from '../../../../../model/job-template-estimate';
import {materialTitle, serviceTitle} from '../../../../../utils/static';
import {ServiceEstimate} from '../../../../../model/service-estimate';
import {AbstractMaterialType} from '../../../../../model/abstract-material-type.enum';
import {MaterialEstimate} from '../../../../../model/material-estimate';

@Component({
  selector: 'app-job-template-estimate-raw',
  templateUrl: './job-template-estimate-raw.component.html',
  styleUrls: ['./job-template-estimate-raw.component.scss']
})
export class JobTemplateEstimateRawComponent implements OnInit {

  @Input()
  jobTemplateEstimate: JobTemplateEstimate;

  expanded = true;
  serviceTitle = serviceTitle;
  materialsTitle = materialTitle;

  constructor() { }

  ngOnInit() {
  }

  expand(){
    this.expanded = !this.expanded;
  }

  getServices(): Array<ServiceEstimate> {
    return (this.jobTemplateEstimate.materials.filter(w => w.type === AbstractMaterialType.SERVICE) as Array<ServiceEstimate>);
  }

  getMaterials(): Array<MaterialEstimate> {
    return (this.jobTemplateEstimate.materials.filter(w => w.type === AbstractMaterialType.MATERIAL) as Array<MaterialEstimate>);
  }

}
