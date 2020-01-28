import {JobTemplateMaterial} from './job-template-material';
import {Unit} from '../unit';

export class JobTemplate {
  id: number;
  name: string;
  materials: Array<JobTemplateMaterial>;
  unit: Unit;
  value: number;
  constructor() {
    this.id = 0;
    this.name = '';
    this.materials = new Array<JobTemplateMaterial>()
    this.unit = new Unit();
    this.value = 0;
  }
}
