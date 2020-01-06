import { Component, OnInit } from '@angular/core';
import {JobTemplateService} from '../../services/job-template.service';

@Component({
  selector: 'app-job-templates-view',
  templateUrl: './job-templates-view.component.html',
  styleUrls: ['./job-templates-view.component.scss']
})
export class JobTemplatesViewComponent implements OnInit {

  constructor(private jobTemplateService: JobTemplateService) { }

  ngOnInit() {
    this.jobTemplateService.getJobTemplates().subscribe( response => {
      console.log(response.body);
    });
  }

}
