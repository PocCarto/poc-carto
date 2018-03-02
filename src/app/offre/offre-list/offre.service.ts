import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// https://github.com/angular/angular-cli/issues/8165
// https://github.com/ReactiveX/rxjs/issues/2988
// import { switchMap, startWith, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators/switchMap';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import {Offre} from '../../common/interfaces/offre';
import {OffreDataService} from '../../common/core/services/offre-data.service';


@Injectable()
export class OffreService {
  readonly offres: Observable<Offre[]>;
  private searchTerm = new Subject<string>();

  constructor(
    private title: Title,
    private offreDataService: OffreDataService
  ) {
    this.offres = this.offreDataService.offres.pipe(
      switchMap(offre => this.searchTerm.pipe(
        map(term => this.filter(offre, term)),
        startWith(offre)
      ))
    );
  }

  setTitle() {
    this.title.setTitle('Rechercher offres');
  }

  search(term: string) {
    this.searchTerm.next(term);
  }

  private filter(offres: Offre[], value: string) {
    return offres.filter(p => value ? p.name.toLowerCase().includes(value.toLowerCase()) : offres);
  }
}
