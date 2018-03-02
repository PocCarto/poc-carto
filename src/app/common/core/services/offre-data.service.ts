import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { map, shareReplay } from 'rxjs/operators';

import {Offre} from '../../interfaces/offre';

@Injectable()
export class OffreDataService {
  offres: Observable<Offre[]>;
  constructor(private http: HttpClient) {
    this.offres = this.http.get<Offre[]>('/api/offres.json').pipe(
      map(offres => offres.map(offre => this.setOffre(offre))),
      shareReplay(1)
    );
  }

  private setOffre(offre: Offre) {
    offre = this.upperCaseName(offre);
    return offre;
  }

  private upperCaseName(offre: Offre) {
    offre.name = offre.name.charAt(0).toUpperCase() + offre.name.slice(1);
    return offre;
  }
}
