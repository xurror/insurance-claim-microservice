import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPolicy } from 'app/shared/model/policy.model';
import { PolicyService } from './policy.service';
import { PolicyDeleteDialogComponent } from './policy-delete-dialog.component';

@Component({
  selector: 'jhi-policy',
  templateUrl: './policy.component.html'
})
export class PolicyComponent implements OnInit, OnDestroy {
  policies?: IPolicy[];
  eventSubscriber?: Subscription;

  constructor(protected policyService: PolicyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.policyService.query().subscribe((res: HttpResponse<IPolicy[]>) => (this.policies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPolicies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPolicy): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPolicies(): void {
    this.eventSubscriber = this.eventManager.subscribe('policyListModification', () => this.loadAll());
  }

  delete(policy: IPolicy): void {
    const modalRef = this.modalService.open(PolicyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.policy = policy;
  }
}
