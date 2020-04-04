import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClaim } from 'app/shared/model/claim.model';
import { ClaimService } from './claim.service';

@Component({
  templateUrl: './claim-delete-dialog.component.html'
})
export class ClaimDeleteDialogComponent {
  claim?: IClaim;

  constructor(protected claimService: ClaimService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.claimService.delete(id).subscribe(() => {
      this.eventManager.broadcast('claimListModification');
      this.activeModal.close();
    });
  }
}
