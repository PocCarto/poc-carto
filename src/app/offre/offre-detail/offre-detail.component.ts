import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

// https://github.com/angular/angular-cli/issues/8165
// https://github.com/ReactiveX/rxjs/issues/2988
// import { map, distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { tap } from 'rxjs/operators/tap';

import { Offre } from './../../common/interfaces/offre';
import { OffreDataService } from './../../common/core/services/offre-data.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.scss']
})
export class OffreDetailComponent implements OnInit, OnDestroy {
  offres: Observable<Offre>;

  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private offreDataService: OffreDataService) { }

  ngOnInit() {
    this.offres = this.activatedRoute.params
      .pipe(
        distinctUntilChanged(),
        mergeMap(params => this.offreDataService.offres.pipe(map(offre => offre.find(p => p.id === +params.id)))),
        tap(offre => this.title.setTitle(`${offre.name}`))
      );
  }

  ngOnDestroy() {
    this.title.setTitle('Rechercher offres');
  }

  next() {
    const paramId = +this.activatedRoute.snapshot.params.id;
    const id = paramId === 1 ? 2 : paramId - 1;
    this.router.navigateByUrl(`/offre/${id}`);
  }

  previous() {
    const paramId = +this.activatedRoute.snapshot.params.id;
    const id = paramId < 2 ? paramId + 1 : 1;
    this.router.navigateByUrl(`/offre/${id}`);
  }

  close() {
    this.router.navigateByUrl('/offres');
  }
}
