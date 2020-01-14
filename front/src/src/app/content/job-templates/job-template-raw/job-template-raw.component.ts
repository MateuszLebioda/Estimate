import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {JobTemplate} from '../../../model/job-template';
import {JobTemplateMaterial} from '../../../model/job-template-material';
import {AbstractMaterialType} from '../../../model/abstract-material-type.enum';
import {JobTempleClickEmitter} from '../unit/job-temple-click-emitter.enum';

@Component({
  selector: 'app-job-template-raw',
  templateUrl: './job-template-raw.component.html',
  styleUrls: ['./job-template-raw.component.scss']
})
export class JobTemplateRawComponent implements OnInit, OnChanges {

  opened = false;

  @Input()
  jobTemplate: JobTemplate;

  @Output()
  jobTempleEmitter = new EventEmitter<JobTemplate>();

  materialTitle = 'Materiały';
  workTitle = 'Prace';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  ngOnInit() {
  }

  getMarkedWorks(): Array<JobTemplateMaterial> {
    return this.jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.WORK);
  }

  getMarkedMaterial(): Array<JobTemplateMaterial> {
    return this.jobTemplate.materials.filter(m => m.material.type === AbstractMaterialType.MATERIAL);
  }

  getElement() {
    return this.jobTemplate.materials[0];
  }

  expand() {
    this.opened = !this.opened;
  }

  openDialog() {
    this.jobTempleEmitter.emit(this.jobTemplate);
  }
}
