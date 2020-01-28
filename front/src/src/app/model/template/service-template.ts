import {AbstractMaterial} from './abstract-material';
import {AbstractMaterialType} from '../abstract-material-type.enum';

export class ServiceTemplate extends AbstractMaterial {
  constructor() {
    super();
  }

  type: AbstractMaterialType.SERVICE;
}
