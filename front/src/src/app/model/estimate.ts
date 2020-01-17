import {MaterialTemplate} from './template/material-template';
import {WorkTemplate} from './template/work-template';
import {JobTemplate} from './template/job-template';
import {MaterialEstimate} from './material-estimate';
import {WorkEstimate} from './work-estimate';
import {JobTemplateEstimate} from './job-template-estimate';

export class Estimate {
  name: string;
  materials: Array<MaterialEstimate>;
  works: Array<WorkEstimate>;
  jobTemplates: Array<JobTemplateEstimate>;
}
