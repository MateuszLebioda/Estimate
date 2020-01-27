import {AbstractEstimateMaterial} from './abstract-estimate-material';
import {AbstractMaterialType} from './abstract-material-type.enum';

export class WorkEstimate extends AbstractEstimateMaterial {
  type = AbstractMaterialType.WORK;
}
