import {AbstractMaterial} from './abstract-material';
import {AbstractMaterialType} from '../abstract-material-type.enum';

export class MaterialTemplate extends AbstractMaterial {
  constructor() {
    super();
  }

  type: AbstractMaterialType.MATERIAL;
}
