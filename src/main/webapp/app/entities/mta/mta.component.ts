import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMTA } from 'app/shared/model/mta.model';
import { MTAService } from './mta.service';
import { MTADeleteDialogComponent } from './mta-delete-dialog.component';

@Component({
  selector: 'jhi-mta',
  templateUrl: './mta.component.html'
})
export class MTAComponent implements OnInit, OnDestroy {
  mTAS?: IMTA[];
  eventSubscriber?: Subscription;

  constructor(protected mTAService: MTAService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.mTAService.query().subscribe((res: HttpResponse<IMTA[]>) => (this.mTAS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMTAS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMTA): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMTAS(): void {
    this.eventSubscriber = this.eventManager.subscribe('mTAListModification', () => this.loadAll());
  }

  delete(mTA: IMTA): void {
    const modalRef = this.modalService.open(MTADeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mTA = mTA;
  }
}
