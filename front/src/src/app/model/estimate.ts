import {MaterialEstimate} from './material-estimate';
import {WorkEstimate} from './work-estimate';
import {JobTemplateEstimate} from './job-template-estimate';
import {Client} from './client';

export class Estimate {
  id: number;
  name: string;
  materials: Array<MaterialEstimate>;
  works: Array<WorkEstimate>;
  jobTemplates: Array<JobTemplateEstimate>;
  client: Client;
  sumPrice: number;

  constructor() {
    this.sumPrice = 0;
  }
}
