import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClaim } from 'app/shared/model/claim.model';

@Component({
  selector: 'jhi-claim-detail',
  templateUrl: './claim-detail.component.html'
})
export class ClaimDetailComponent implements OnInit {
  claim: IClaim | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ claim }) => (this.claim = claim));
  }

  previousState(): void {
    window.history.back();
  }
}
