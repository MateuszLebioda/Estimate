import {Unit} from './unit';
import {AbstractMaterialType} from './abstract-material-type.enum';

export class AbstractMaterial {
  id: number;
  name: string;
  unit: Unit;
  price: number;
  type: AbstractMaterialType;
}
