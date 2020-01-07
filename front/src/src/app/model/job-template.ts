import {JobTemplateMaterial} from './job-template-material';
import {Unit} from './unit';

export class JobTemplate {
  id: number;
  name: string;
  materials: Array<JobTemplateMaterial>;
  unit: Unit;
}
