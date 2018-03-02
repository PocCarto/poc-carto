import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Offre } from './../../common/interfaces/offre';
import { OffreService } from './offre.service';

@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrls: ['./offre-list.component.scss'],
  providers: [OffreService]
})
export class OffreListComponent implements OnInit {
  offres: Observable<Offre[]>;
  showGrid = true;

  constructor(
    private offreService: OffreService) { }

  ngOnInit() {
    this.offreService.setTitle();
    this.offres = this.offreService.offres;
  }

  search(term: string) {
    this.offreService.search(term);
  }
}
