import {Unit} from './unit';
import {AbstractEstimateMaterial} from './abstract-estimate-material';
import {WorkEstimate} from './work-estimate';
import {AbstractMaterialType} from './abstract-material-type.enum';
import {MaterialEstimate} from './material-estimate';

export class JobTemplateEstimate {
  id: number;
  name: string;
  materials: Array<AbstractEstimateMaterial>;
  unit: Unit;
  value: number;
  sumPrice: number;

  getWorks(): Array<WorkEstimate> {
    return (this.materials.filter(w => w.type === AbstractMaterialType.WORK) as Array<WorkEstimate>);
  }

  getMaterials(): Array<MaterialEstimate> {
    return (this.materials.filter(w => w.type === AbstractMaterialType.MATERIAL) as Array<MaterialEstimate>);
  }

  setMaterials(materials: Array<MaterialEstimate>, works: Array<WorkEstimate>) {
    this.materials = materials;
    for (const work of works) {
      this.materials.push(work);
    }
  }

}
