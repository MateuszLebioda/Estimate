import {AbstractEstimateMaterial} from './abstract-estimate-material';
import {AbstractMaterialType} from './abstract-material-type.enum';

export class MaterialEstimate extends AbstractEstimateMaterial {

  type = AbstractMaterialType.MATERIAL;
}
