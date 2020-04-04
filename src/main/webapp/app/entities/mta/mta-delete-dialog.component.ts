import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMTA } from 'app/shared/model/mta.model';
import { MTAService } from './mta.service';

@Component({
  templateUrl: './mta-delete-dialog.component.html'
})
export class MTADeleteDialogComponent {
  mTA?: IMTA;

  constructor(protected mTAService: MTAService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mTAService.delete(id).subscribe(() => {
      this.eventManager.broadcast('mTAListModification');
      this.activeModal.close();
    });
  }
}
