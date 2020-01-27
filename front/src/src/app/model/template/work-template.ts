import {AbstractMaterial} from './abstract-material';
import {AbstractMaterialType} from '../abstract-material-type.enum';

export class WorkTemplate extends AbstractMaterial {
  constructor() {
    super();
  }

  type: AbstractMaterialType.WORK;
}
