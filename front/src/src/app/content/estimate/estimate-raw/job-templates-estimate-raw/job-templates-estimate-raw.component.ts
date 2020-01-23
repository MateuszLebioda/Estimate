import {Component, Input, OnInit} from '@angular/core';
import {JobTemplateEstimate} from '../../../../model/job-template-estimate';

@Component({
  selector: 'app-job-templates-estimate-raw',
  templateUrl: './job-templates-estimate-raw.component.html',
  styleUrls: ['./job-template-estimates-raw.component.scss']
})
export class JobTemplatesEstimateRawComponent implements OnInit {

  @Input()
  jobTemplatesEstimate: Array<JobTemplateEstimate>;

  constructor() { }

  ngOnInit() {
  }

}
