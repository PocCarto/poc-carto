import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffreListComponent } from './offre-list/offre-list.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';

const routes: Routes = [
  // { path: '', redirectTo: 'offres', pathMatch: 'full' },
  {
    path: '', component: OffreListComponent, children: [
      { path: 'offre/:id', component: OffreDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
