import {Component, Input, OnInit} from '@angular/core';
import {JobTemplateMaterial} from '../../../model/job-template-material';

@Component({
  selector: 'app-job-template-abstract-material-raw',
  templateUrl: './job-template-abstract-material-raw.component.html',
  styleUrls: ['./job-template-abstract-material-raw.component.scss']
})
export class JobTemplateAbstractMaterialRawComponent implements OnInit {

  @Input()
  jobTemplateMaterials: Array<JobTemplateMaterial>;

  @Input()
  opened: boolean;

  @Input()
  title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
