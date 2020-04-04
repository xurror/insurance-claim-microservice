import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMTA } from 'app/shared/model/mta.model';

@Component({
  selector: 'jhi-mta-detail',
  templateUrl: './mta-detail.component.html'
})
export class MTADetailComponent implements OnInit {
  mTA: IMTA | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mTA }) => (this.mTA = mTA));
  }

  previousState(): void {
    window.history.back();
  }
}
