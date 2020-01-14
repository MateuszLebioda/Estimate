import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientsViewComponent} from './content/clients/clients-view.component';
import {EstimateViewComponent} from './content/estimate/estimate-view.component';
import {MaterialViewComponent} from './content/material/material-view.component';
import {UnitViewsComponent} from './content/units/units-view.component';
import {WorkViewComponent} from './content/work/work-view.component';
import {JobTemplatesViewComponent} from './content/job-templates/job-templates-view.component';
import {AddNewEstimateSheetComponent} from './content/estimate/add-new-estimate-sheet/add-new-estimate-sheet.component';

const routes: Routes = [
  {path: 'clients', component: ClientsViewComponent},
  {path: 'estimates', component: EstimateViewComponent},
  {path: 'materials', component: MaterialViewComponent},
  {path: 'units', component: UnitViewsComponent},
  {path: 'work', component: WorkViewComponent},
  {path: 'job-templates', component: JobTemplatesViewComponent}
];

export const routingComponents = [ClientsViewComponent,
  EstimateViewComponent,
  MaterialViewComponent,
  WorkViewComponent,
  JobTemplatesViewComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
