import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPolicyHolder } from 'app/shared/model/policy-holder.model';

@Component({
  selector: 'jhi-policy-holder-detail',
  templateUrl: './policy-holder-detail.component.html'
})
export class PolicyHolderDetailComponent implements OnInit {
  policyHolder: IPolicyHolder | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ policyHolder }) => (this.policyHolder = policyHolder));
  }

  previousState(): void {
    window.history.back();
  }
}
