import {AbstractMaterial} from './abstract-material';
import {AbstractMaterialType} from './abstract-material-type.enum';

export class Material extends AbstractMaterial {
  constructor() {
    super();
  }

  type: AbstractMaterialType.MATERIAL;
}
