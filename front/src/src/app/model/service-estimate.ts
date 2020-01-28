import {AbstractEstimateMaterial} from './abstract-estimate-material';
import {AbstractMaterialType} from './abstract-material-type.enum';

export class ServiceEstimate extends AbstractEstimateMaterial {
  type = AbstractMaterialType.SERVICE;
}
