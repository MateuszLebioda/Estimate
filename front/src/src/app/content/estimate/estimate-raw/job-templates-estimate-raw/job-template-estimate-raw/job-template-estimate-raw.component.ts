import {Component, Input, OnInit} from '@angular/core';
import {JobTemplateEstimate} from "../../../../../model/job-template-estimate";
import {materialTitle, workTitle} from "../../../../../utils/static";
import {WorkEstimate} from "../../../../../model/work-estimate";
import {AbstractMaterialType} from "../../../../../model/abstract-material-type.enum";
import {MaterialEstimate} from "../../../../../model/material-estimate";

@Component({
  selector: 'app-job-template-estimate-raw',
  templateUrl: './job-template-estimate-raw.component.html',
  styleUrls: ['./job-template-estimate-raw.component.scss']
})
export class JobTemplateEstimateRawComponent implements OnInit {

  @Input()
  jobTemplateEstimate: JobTemplateEstimate;

  expanded = true;
  workTitle = workTitle;
  materialsTitle = materialTitle;

  constructor() { }

  ngOnInit() {
  }

  expand(){
    this.expanded = !this.expanded;
  }

  getWorks(): Array<WorkEstimate> {
    return (this.jobTemplateEstimate.materials.filter(w => w.type === AbstractMaterialType.WORK) as Array<WorkEstimate>);
  }

  getMaterials(): Array<MaterialEstimate> {
    return (this.jobTemplateEstimate.materials.filter(w => w.type === AbstractMaterialType.MATERIAL) as Array<MaterialEstimate>);
  }

}
