import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientsViewComponent} from './content/clients/clients-view.component';
import {EstimateViewComponent} from './content/estimate/estimate-view.component';
import {MaterialViewComponent} from './content/material/material-view.component';
import {UnitViewsComponent} from './content/units/units-view.component';
import {ServiceViewComponent} from './content/service/service-view.component';
import {JobTemplatesViewComponent} from './content/job-templates/job-templates-view.component';
import {HiddenUnitsComponent} from './content/units/hidden-units/hidden-units.component';
import {HiddenServiceComponent} from './content/service/hidden-service/hidden-service.component';

const routes: Routes = [
  {path: 'clients', component: ClientsViewComponent},
  {path: 'estimates', component: EstimateViewComponent},
  {path: 'estimates/:id', component: EstimateViewComponent},
  {path: 'materials', component: MaterialViewComponent},
  {path: 'units', component: UnitViewsComponent},
  {path: 'unitsHidden', component: HiddenUnitsComponent},
  {path: 'services', component: ServiceViewComponent},
  {path: 'servicesHidden', component: HiddenServiceComponent},
  {path: 'job-templates', component: JobTemplatesViewComponent}
];

export const routingComponents = [ClientsViewComponent,
  EstimateViewComponent,
  MaterialViewComponent,
  ServiceViewComponent,
  JobTemplatesViewComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
