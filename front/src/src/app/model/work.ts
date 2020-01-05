import {AbstractMaterial} from './abstract-material';
import {AbstractMaterialType} from './abstract-material-type.enum';

export class Work extends AbstractMaterial {
  constructor() {
    super();
  }

  type: AbstractMaterialType.WORK;
}
