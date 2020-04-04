import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEndorsement } from 'app/shared/model/endorsement.model';
import { EndorsementService } from './endorsement.service';
import { EndorsementDeleteDialogComponent } from './endorsement-delete-dialog.component';

@Component({
  selector: 'jhi-endorsement',
  templateUrl: './endorsement.component.html'
})
export class EndorsementComponent implements OnInit, OnDestroy {
  endorsements?: IEndorsement[];
  eventSubscriber?: Subscription;

  constructor(
    protected endorsementService: EndorsementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.endorsementService.query().subscribe((res: HttpResponse<IEndorsement[]>) => (this.endorsements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEndorsements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEndorsement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEndorsements(): void {
    this.eventSubscriber = this.eventManager.subscribe('endorsementListModification', () => this.loadAll());
  }

  delete(endorsement: IEndorsement): void {
    const modalRef = this.modalService.open(EndorsementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.endorsement = endorsement;
  }
}
