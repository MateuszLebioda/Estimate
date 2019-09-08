import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientsViewComponent} from './content/clients/clients-view.component';
import {EstimateViewComponent} from './content/estimate/estimate-view.component';
import {MaterialViewComponent} from './content/material/material-view.component';
import {JobViewComponent} from './content/job/job-view.component';

const routes: Routes = [
  {path: 'clients', component: ClientsViewComponent},
  {path: 'estimates', component: EstimateViewComponent},
  {path: 'materials', component: MaterialViewComponent},
  {path: 'jobs', component: JobViewComponent}
];

export const routingComponents = [ClientsViewComponent, EstimateViewComponent, MaterialViewComponent, JobViewComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
