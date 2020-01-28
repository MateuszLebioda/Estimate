import {Unit} from './unit';
import {AbstractEstimateMaterial} from './abstract-estimate-material';
import {ServiceEstimate} from './service-estimate';
import {MaterialEstimate} from './material-estimate';

export class JobTemplateEstimate {
  id: number;
  name: string;
  materials: Array<AbstractEstimateMaterial>;
  unit: Unit;
  value: number;
  sumPrice: number;


  setMaterials(materials: Array<MaterialEstimate>, serviceEstimates: Array<ServiceEstimate>) {
    this.materials = materials;
    for (const serviceEstimate of serviceEstimates) {
      this.materials.push(serviceEstimate);
    }
  }

}
