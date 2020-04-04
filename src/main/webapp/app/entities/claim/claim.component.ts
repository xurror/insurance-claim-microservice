import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClaim } from 'app/shared/model/claim.model';
import { ClaimService } from './claim.service';
import { ClaimDeleteDialogComponent } from './claim-delete-dialog.component';

@Component({
  selector: 'jhi-claim',
  templateUrl: './claim.component.html'
})
export class ClaimComponent implements OnInit, OnDestroy {
  claims?: IClaim[];
  eventSubscriber?: Subscription;

  constructor(protected claimService: ClaimService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.claimService.query().subscribe((res: HttpResponse<IClaim[]>) => (this.claims = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClaims();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClaim): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClaims(): void {
    this.eventSubscriber = this.eventManager.subscribe('claimListModification', () => this.loadAll());
  }

  delete(claim: IClaim): void {
    const modalRef = this.modalService.open(ClaimDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.claim = claim;
  }
}
