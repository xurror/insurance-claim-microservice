import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEndorsement } from 'app/shared/model/endorsement.model';

@Component({
  selector: 'jhi-endorsement-detail',
  templateUrl: './endorsement-detail.component.html'
})
export class EndorsementDetailComponent implements OnInit {
  endorsement: IEndorsement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ endorsement }) => (this.endorsement = endorsement));
  }

  previousState(): void {
    window.history.back();
  }
}
