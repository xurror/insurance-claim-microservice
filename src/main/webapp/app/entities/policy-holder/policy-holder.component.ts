import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPolicyHolder } from 'app/shared/model/policy-holder.model';
import { PolicyHolderService } from './policy-holder.service';
import { PolicyHolderDeleteDialogComponent } from './policy-holder-delete-dialog.component';

@Component({
  selector: 'jhi-policy-holder',
  templateUrl: './policy-holder.component.html'
})
export class PolicyHolderComponent implements OnInit, OnDestroy {
  policyHolders?: IPolicyHolder[];
  eventSubscriber?: Subscription;

  constructor(
    protected policyHolderService: PolicyHolderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.policyHolderService.query().subscribe((res: HttpResponse<IPolicyHolder[]>) => (this.policyHolders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPolicyHolders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPolicyHolder): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPolicyHolders(): void {
    this.eventSubscriber = this.eventManager.subscribe('policyHolderListModification', () => this.loadAll());
  }

  delete(policyHolder: IPolicyHolder): void {
    const modalRef = this.modalService.open(PolicyHolderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.policyHolder = policyHolder;
  }
}
