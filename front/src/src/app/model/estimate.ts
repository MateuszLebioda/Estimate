import {MaterialEstimate} from './material-estimate';
import {ServiceEstimate} from './service-estimate';
import {JobTemplateEstimate} from './job-template-estimate';
import {Client} from './client';

export class Estimate {
  id: number;
  name: string;
  materials: Array<MaterialEstimate>;
  servicesEstimate: Array<ServiceEstimate>;
  jobTemplates: Array<JobTemplateEstimate>;
  client: Client;
  sumPrice: number;

  constructor() {
    this.sumPrice = 0;
  }
}
