import { NgModule } from '@angular/core';

import { OffreRoutingModule } from './offre-routing.module';
import { SharedModule } from './../common/shared/shared.module';
import { OffreListComponent } from './offre-list/offre-list.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';

@NgModule({
  imports: [
    SharedModule,
    OffreRoutingModule
  ],
  declarations: [
    OffreListComponent,
    OffreDetailComponent
  ]
})
export class OffreModule { }
